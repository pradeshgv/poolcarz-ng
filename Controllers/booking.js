const bookingModel = require('../Model/bookingSchema');
exports.getNotes = async (req, res) => {
    try {
      const notes = await bookingModel.find({});
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
  exports.newNotes = async (req, res) => {
    try {
        console.log(req.body);
        const newNotes = await bookingModel.create(req.body);
        res.status(201).json(newNotes);
    } catch (err) {
      res.status(404).json({
        status: 'fail',
        message: err.errmsg,
      });
    }
  };
  exports.deleteNotes = async (req, res) => {
    const delDet = await bookingModel.deleteOne({ notesID: req.params.id });
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