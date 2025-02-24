const express = require("express");
const mongoose = require("mongoose");

const ActivityRouter = require("./routes/activity.route");
// Load environment variables from .env file
require("dotenv").config();

const app = express();

const cors = require("cors");
// Define port and MongoDB URI
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/todoapiDB";

// Middleware to parse JSON requests
app.use(express.json());
app.use(cors());
// Root route
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.use("/api", ActivityRouter);
// Connect to MongoDB and start the server
mongoose
    .connect(MONGODB_URI) // Removed deprecated options
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Failed to connect to MongoDB:", err);
    });
