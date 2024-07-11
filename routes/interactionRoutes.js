const express = require("express")
const router = express.Router()
const {
  createInteraction,
  getInteractions,
  updateInteraction,
  deleteInteraction,
} = require("../controllers/interactionController")

router.post("/", createInteraction)
router.get("/", getInteractions)
router.patch("/:id", updateInteraction)
router.delete("/:id", deleteInteraction)

module.exports = router
