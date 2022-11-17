const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema(
  {
    uname: {
      type: String,
      unique: true,
    },
    pass: {
      type: String,
      required: [true, 'Required field'],
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  }
);
//Model
const usersModel = mongoose.model('usersSchema', usersSchema);
module.exports = usersModel;