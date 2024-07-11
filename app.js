const express = require("express")
const app = express()
const mongoose = require("mongoose")
require("dotenv").config()

const postRoutes = require("./routes/postRoutes")
const userRoutes = require("./routes/userRoutes")
const interactionRoutes = require("./routes/interactionRoutes")

// connect to db
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    // start listening to request
    app.listen(3000, () => {
      console.log("Server listening on http://localhost:3000")
    })
  })
  .catch((error) => console.log(error))

// middleware
app.use(express.json())

// routes
app.use("/post", postRoutes)

app.use("/user", userRoutes)

app.use("/interaction", interactionRoutes)
