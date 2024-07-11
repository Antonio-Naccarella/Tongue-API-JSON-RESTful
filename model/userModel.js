const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  nickname: {
    type: String,
    required: true,
  },
  age: { type: Number, required: true },
  city: { type: String, required: true, lowercase: true },
})

const User = mongoose.model("User", userSchema)

module.exports = User
