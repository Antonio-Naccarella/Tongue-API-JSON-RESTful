const express = require("express")
const router = express.Router()
const {
  createUser,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
} = require("../controllers/userController")

router.post("/", createUser)
router.get("/", getUsers)
router.get("/:id", getUser)
router.patch("/:id", updateUser)
router.delete("/:id", deleteUser)

module.exports = router
