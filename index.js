const express = require("express");
const config = require("config");
const { mongoose } = require("mongoose");

const app = express();
const PORT = config.get("port");

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
