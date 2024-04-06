const cors = require("cors");
const express = require("express");

const mongoose = require("mongoose");

const apiRoutes = require("./routes/apiRoutes");
const connectDB = require("./db/conn");

connectDB();
const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Welcome to the Flex Resize Hub API");
});
app.use("/api", apiRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
