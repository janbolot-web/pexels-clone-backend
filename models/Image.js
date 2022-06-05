const { Schema, Types, model } = require("mongoose");

const Image = new Schema({
  userId: { type: String, required: true },
  photographer: { type: String, required: true },
  imageUrl: { type: String, required: true },
  tags: [{ type: String, required: true }],
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  downloads: { type: Number, default: 0 },
});

module.exports = model("Image", Image);
