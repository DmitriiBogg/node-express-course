require("dotenv").config(); // Load from .env
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000; // use Port or local port
//import routes and error-handler
const errorHandlerMiddleware = require("./error-handler");
const tasksRouter = require("./routes/tasks");
// Middleware for parsing
app.use(express.json());
//routes
app.use("/api/v1/tasks", tasksRouter);
// ways for checking API's
app.get("/", (req, res) => {
  res.send("Welcome to the Task Manager API");
});
//not founding ways (not sure i need this)
app.use((req, res) => {
  res.status(404).json({ msg: "Route does not exist" });
});
//error-handler middleware
app.use(errorHandlerMiddleware);
// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    process.exit(1);
  }
};

// start server after connect to MongoDB
const startServer = async () => {
  try {
    await connectDB(); // connect to database
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start the server", error);
  }
};

startServer();
