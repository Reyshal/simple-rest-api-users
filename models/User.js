const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  Number: Number,
  Name_of_Location: String,
  Date: String,
  Login_Hour: String,
  Name: String,
  Age: Number,
  gender: String,
  Email: String,
  No_Telp: String,
  Brand_Device: String,
  Digital_Interest: String,
  Location_Type: String,
}, {
  timestamps: true,
}, {
  collection: "users",
});

module.exports = mongoose.model("User", userSchema);
