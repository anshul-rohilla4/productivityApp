const express = require("express");
const mongoose = require("mongoose");

const ActivityRouter = require("./routes/activity.route");
const AuthRouter = require("./routes/auth.route"); // Import AuthRouter
require("dotenv").config();

const app = express();

const cors = require("cors");
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/todoapiDB";

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use("/api", ActivityRouter);
app.use("/api/auth", AuthRouter); // Add AuthRouter

mongoose
    .connect(MONGODB_URI)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Failed to connect to MongoDB:", err);
    });