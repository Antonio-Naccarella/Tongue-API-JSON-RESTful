const Post = require("../model/postModel")
const mongoose = require("mongoose")

// create a new post

async function createPost(req, res) {
  const { title, user } = req.body
  try {
    const post = await (await Post.create({ title, user })).populate("user")
    res.status(201).json(post)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// get all post

async function getPosts(req, res) {
  const { date } = req.query
  try {
    let posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate("user")
      .populate("interactions", ["_id", "user", "type"])

    // get by date
    if (date) {
      posts = await Post.findByDate(date)
    }
    if (posts.length === 0) {
      return res.status(200).json({ mssg: "No posts in the db" })
    }
    res.status(200).json(posts)
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
}

// get a single post

async function getPost(req, res) {
  const { id } = req.params
  if (!mongoose.isValidObjectId(id)) {
    return res.status(404).json("Please enter a valid id.")
  }
  const post = await Post.findById(id).populate("user")
  if (!post) {
    return res.status(404).json({ error: "No such post." })
  }
  res.status(200).json(post)
}

// update a single post

async function updatePost(req, res) {
  const { id } = req.params
  const { title, user } = req.body
  if (!mongoose.isValidObjectId(id)) {
    return res.status(404).json("Please enter a valid id.")
  }

  const post = await Post.findById(id)

  post.title = title || post.title
  post.user = user || post.user
  await post.save()
  await post.populate("user")

  if (!post) {
    return res.status(404).json({ error: "No such post." })
  }
  res.status(200).json(post)
}

// delete a single post

async function deletePost(req, res) {
  const { id } = req.params
  if (!mongoose.isValidObjectId(id)) {
    return res.status(404).json("Please enter a valid id.")
  }

  const post = await Post.findByIdAndDelete(id)

  if (!post) {
    return res.status(404).json({ error: "No such post." })
  }
  res.status(200).json(post)
}

module.exports = {
  createPost,
  getPost,
  getPosts,
  updatePost,
  deletePost,
}
