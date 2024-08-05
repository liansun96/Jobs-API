const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Please provide name"],
    maxLength: 50,
    minLength: 3,
  },
  email: {
    type: String,
    require: [true, "Please provide email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide valid email",
    ],
    unique: true,
  },
  password: {
    type: String,
    require: [true, "Please provide pasword"],
    minLength: 3,
  },
});

UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  console.log(salt);
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log(hashedPassword);
});

module.exports = mongoose.model("User", UserSchema);
