const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    id: {
        type:Number,
        required: [true, 'Required field'],
        unique: true,
    },
    rideid: {
      type: Number,
      required: [true, 'Required field'],
    },
    uname: {
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
const bookingModel = mongoose.model('bookingSchema', bookingSchema);
module.exports = bookingModel;