const mongoose = require('mongoose');

//Schema
const ridesSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      unique: true,
    },
    offerid: {
      type: String,
      required: [true, 'Required field'],
      default: "a1",
    },
    name: {
      type: String,
      required: [true, 'Required field'],
      default: "a1",
    },
    car: {
      type: String,
      required: [true, 'Required field'],
    },
    seatsLeft: {
      type: Number,
      required: [true, 'Required field'],
    },
    pickUp: {
      type: String,
      required: [true, 'Required field'],
    },
    destination: {
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
const ridesModel = mongoose.model('ridesSchema', ridesSchema);
module.exports = ridesModel;