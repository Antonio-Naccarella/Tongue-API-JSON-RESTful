const mongoose = require("mongoose")
const Post = require("../model/postModel")
const { startOfDay, formatISO, endOfDay } = require("date-fns")

const interactionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      validate: {
        validator: (value) => value === "like" || value === "comment",
        message: () => "Type must be 'like' or  'comment'.",
      },
    },
    post: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Post",
      required: true,
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
)

interactionSchema.methods.addInteraction = async function (
  postId,
  interactionId
) {
  try {
    const post = await Post.findById(postId)
    post.interactions.push(interactionId)
    post.save()
  } catch (error) {
    console.log(error)
    return error
  }
}

interactionSchema.methods.removeInteraction = async function (
  postId,
  interactionId
) {
  try {
    const post = await Post.findById(postId)
    const index = post.interactions.indexOf(interactionId)
    if (index > -1) {
      post.interactions.splice(index, 1)
    }
    post.save()
  } catch (error) {
    console.log(error)
    return error
  }
}

interactionSchema.statics.findByDate = async function (searchDate) {
  const startDate = startOfDay(formatISO(new Date(searchDate)))
  const endDate = endOfDay(startDate)
  try {
    const interactions = await Interaction.find({
      createdAt: {
        $gte: startDate,
        $lt: endDate,
      },
    })
    return interactions
  } catch (error) {
    return error
  }
}

interactionSchema.statics.findByCity = async function (searchCity) {
  const city = searchCity.toLowerCase()
  try {
    let interactions = await Interaction.find().populate("user")

    let interactionFiltered = interactions.filter(
      (elem) => elem.user.city === city
    )

    return interactionFiltered
  } catch (error) {
    return error
  }
}

const Interaction = mongoose.model("Interaction", interactionSchema)

module.exports = Interaction
