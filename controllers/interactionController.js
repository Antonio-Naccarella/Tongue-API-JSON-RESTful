const Interaction = require("../model/interactionModel")
const mongoose = require("mongoose")

// create a new interaction
async function createInteraction(req, res) {
  const { type, post, user } = req.body

  try {
    const interaction = await Interaction.create({ type, post, user })
    await interaction.addInteraction(post, interaction._id)
    await interaction.populate(["post", "user"])
    res.status(201).json(interaction)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// get interactions
async function getInteractions(req, res) {
  const { date } = req.query
  const { city } = req.query
  try {
    let interactions = await Interaction.find()
      .sort({ createdAt: -1 })
      .populate(["post", "user"])

    if (date) {
      interactions = await Interaction.findByDate(date)
    }
    if (city) {
      interactions = await Interaction.findByCity(city)
    }

    if (interactions.length === 0) {
      return res.status(404).json("No interactions in the db.")
    }

    res.status(200).json(interactions)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// update a single interaction
async function updateInteraction(req, res) {
  const { id } = req.params
  const { type, post, user } = req.body

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: "Please enter a valid id." })
  }
  try {
    const interaction = await Interaction.findById(id)
    interaction.type = type || interaction.type
    interaction.post = post || interaction.post
    interaction.user = user || interaction.user
    await interaction.save()
    await interaction.populate(["post", "user"])

    if (!interaction) {
      return res.status(404).json({ error: "No such interaction in the db." })
    }
    res.status(200).json(interaction)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete a single interaction
async function deleteInteraction(req, res) {
  const { id } = req.params

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: "Please enter a valid id." })
  }
  try {
    const interaction = await Interaction.findByIdAndDelete(id)
    const postId = interaction.post
    await interaction.removeInteraction(postId, id)

    if (!interaction) {
      return res.status(404).json({ error: "No such interaction in the db." })
    }
    res.status(200).json(interaction)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

module.exports = {
  createInteraction,
  getInteractions,
  updateInteraction,
  deleteInteraction,
}
