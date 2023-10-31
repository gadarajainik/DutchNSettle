const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  email: { type: String, require: true, unique: true },
  firstName: { type: String, require: true },
  lastName: String,
  picture: String,
  createdDate: { type: Date, default: Date.now },
  modifiedDate: { type: Date, default: Date.now },
  Phone: Schema.Types.Number
});

module.exports = model("User", userSchema);