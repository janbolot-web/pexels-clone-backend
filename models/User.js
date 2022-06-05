const { Schema, Types, model } = require("mongoose");

const User = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  images: [{ type: Types.ObjectId, ref: "Image" }],
  role: { type: String, ref: "Role" },
});

module.exports = model("User", User);
