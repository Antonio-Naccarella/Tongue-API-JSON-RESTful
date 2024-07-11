const express = require("express")
const router = express.Router()
const {
  createPost,
  getPost,
  getPosts,
  updatePost,
  deletePost,
} = require("../controllers/postController")

router.post("/", createPost)
router.get("/", getPosts)
router.get("/:id", getPost)
router.patch("/:id", updatePost)
router.delete("/:id", deletePost)

module.exports = router
