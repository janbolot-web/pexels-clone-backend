const express = require("express");
const config = require("config");
const { mongoose } = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const app = express();
const PORT = process.env.PORT ||config.get("port");
app.use(cors());

app.use(express.json());
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/images", require("./routes/image.routes"));

const start = async () => {
  try {
    await mongoose.connect(config.get("mongodb"));
    app.listen(PORT, () => {
      console.log(`Server started on ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
