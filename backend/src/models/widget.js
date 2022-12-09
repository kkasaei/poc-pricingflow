const mongoose = require("mongoose");
const schema = mongoose.Schema
const { randomUUID } = require("crypto");

const widgetSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  apiKey: {
    required: true,
    type: String,
    default: randomUUID(),
  },
  body: {
    required: false,
    type: schema.Types.Mixed,
  },
  isPublished: {
    required: false,
    type: Boolean,
  },
});

module.exports = mongoose.model("Widget", widgetSchema);
