const express = require("express");
const path = require("path");
const cors = require("cors");
const helmet = require("helmet");
const userRoutes = require("./routes/user");

const app = express();

app.use(helmet());

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/user/", userRoutes);

module.exports = app;
