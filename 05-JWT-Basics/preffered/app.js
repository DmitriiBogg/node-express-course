// app.js
require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const authRouter = require("./authRouter");
const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");
const { secret } = require("./config");
const path = require("path");

app.get("/", (req, res) => {
  res.send(
    '<h1>Welcome to Authentication API</h1><p>Use <a href="/auth/registration">/auth/registration</a> to register.</p>'
  );
});

// middleware
app.use(express.json());

// routes
app.use("/auth", authRouter);

// error handling middleware
app.use(notFoundMiddleware);
app.use(errorMiddleware);
//website (for looking whats going on)
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    app.listen(PORT, console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
