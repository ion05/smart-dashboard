const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const reqString = { type: String, required: true };
const moment = require("moment");
const now = new Date();
const dateStringWithTime = moment(now).format("YYYY-MM-DD HH:MM:SS");

const userSchema = new mongoose.Schema({
  email: reqString,
  username: reqString,
  password: reqString,
  date: {
    type: String,
    default: dateStringWithTime,
  },
  emergencyContact: reqString,
  modelNumber: reqString,
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
