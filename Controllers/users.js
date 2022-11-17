const ridesModel = require('../Model/usersSchema');
const validators = require('../Utilities/validator');
exports.getNotes = async (req, res) => {
  try {
    const notes = await ridesModel.find({});
    if (notes.length > 0) {
      res.status(200).json(notes);
    } else {
      res.status(400).json({
        status: 'success',
        data: {
          message: 'No rides available in the repo',
        },
      });
    }
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
exports.updateNotes = async (req, res) => {
  try {
    const notes = await ridesModel.findOneAndUpdate(
      { notesID: req.params.id },
      req.body,
      {
        new: true, //to return new doc back
        runValidators: true, //to run the validators which specified in the model
      }
    );
    if (notes != null) {
      res.status(200).json({
        status: 'success',
        data: {
          notes,
        },
      });
    } else {
      res.status(400).json({
        status: 'success',
        data: {
          message: `No notes available with ID ${req.params.id} `,
        },
      });
    }
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
exports.newNotes = async (req, res) => {
    try {
        const newNotes = await ridesModel.create(req.body);
        res.status(201).json(newNotes);

    } catch (err) {
      res.status(404).json({
        status: 'fail',
        message: err.errmsg,
      });
    }
  };
exports.deleteNotes = async (req, res) => {
  const delDet = await ridesModel.deleteOne({ notesID: req.params.id });
  if (delDet.deletedCount === 0) {
    res.status(404).json({
      status: 'fail',
      message: 'No notes available for this ID',
    });
  } else {
    res.status(200).json({
      status: 'success',
      message: `Notes with ${req.params.id} ID deleted`,
    });
  }
};
exports.invalid = async (req, res) => {
  res.status(404).json({
    status: 'fail',
    message: 'Invalid path',
  });
};