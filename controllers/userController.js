const mongoose = require("mongoose")
const User = require("../model/userModel")

// create a new user

async function createUser(req, res) {
  const { nickname, age, city } = req.body
  try {
    const user = await User.create({ nickname, age, city })
    res.status(201).json(user)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// get all users

async function getUsers(req, res) {
  const users = await User.find().sort({ nickname: 1 })
  if (users.length === 0) {
    return res.status(200).json("No users in the db.")
  }
  res.status(200).json(users)
}

// get a single user

async function getUser(req, res) {
  const { id } = req.params
  if (!mongoose.isValidObjectId(id)) {
    return res.status(404).json({ error: "Please enter a valid id." })
  }
  const user = await User.findById(id)

  if (!user) {
    return res.status(404).json({ erro: "No such user." })
  }
  res.status(200).json(user)
}

// update a single user

async function updateUser(req, res) {
  const { id } = req.params
  const { nickname, age, city } = req.body

  if (!mongoose.isValidObjectId(id)) {
    return res.status(404).json({ error: "Please enter a valid id." })
  }

  const user = await User.findById(id)
  user.nickname = nickname || user.nickname
  user.age = age || user.age
  user.city = city || user.city
  user.save()

  if (!user) {
    return res.status(404).json({ error: "No such user." })
  }
  res.status(200).json(user)
}

// delete a single user
async function deleteUser(req, res) {
  const { id } = req.params
  if (!mongoose.isValidObjectId(id)) {
    return res.status(404).json({ error: "Please enter a valid id." })
  }
  const user = await User.findByIdAndDelete(id)
  if (!user) {
    return res.status(404).json({ error: "No such user." })
  }
  res.status(200).json(user)
}

module.exports = {
  createUser,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
}

function checkData(key, data) {
  if (data) {
    return (key = data)
  } else {
    return (key = key)
  }
}
