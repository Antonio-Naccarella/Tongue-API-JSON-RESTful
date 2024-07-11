const mongoose = require("mongoose")
const { formatISO, startOfDay, endOfDay } = require("date-fns")

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    interactions: {
      type: [mongoose.SchemaTypes.ObjectId],
      ref: "Interaction",
    },
  },
  { timestamps: true }
)

postSchema.statics.findByDate = async function (searchDate) {
  const startDate = startOfDay(formatISO(new Date(searchDate)))
  const endDate = endOfDay(startDate)

  try {
    const posts = await Post.find({
      createdAt: {
        $gte: startDate,
        $lt: endDate,
      },
    })
    return posts
  } catch (error) {
    return error
  }
}
const Post = mongoose.model("Post", postSchema)

module.exports = Post
