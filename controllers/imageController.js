const Image = require("../models/Image");
const User = require("../models/User");

class imageController {
  async addImage(req, res) {
    try {
      const userId = req.params.id;
      const { imageUrl, tags } = req.body;

      const user = await User.findOne({ _id: userId });

      const image = new Image({
        userId,
        imageUrl,
        tags,
        photographer: user.username,
      });
      await image.save();
      res.json(image);
    } catch (e) {
      console.log(e);
      res.status(400).json({
        message: "Не удалось загрузить картинку. Попробуйте еще раз!",
      });
    }
  }

  async getImage(req, res) {
    try {
      const sort = req.query.sort;
      const images = await Image.find().sort({ _id: sort });
      res.json({ images });
    } catch (e) {
      console.log(e);
      res.status(400).json({
        message: "SERVER ERROR!",
      });
    }
  }

  async getImageById(req, res) {
    try {
      const userId = req.params.id;
      const images = await Image.find({ userId }).sort({ _id: -1 });
      res.json({ images });
    } catch (e) {
      console.log(e);
      res.status(400).json({
        message: "SERVER ERROR!",
      });
    }
  }
}

module.exports = new imageController();
