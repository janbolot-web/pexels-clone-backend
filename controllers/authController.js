const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const Role = require("../models/Role");

class authController {
  async registration(req, res) {
    try {
      const { email, password, username } = req.body;
      const candidate = await User.findOne({ email });
      if (candidate) {
        return res
          .status(400)
          .json({ message: "Пользователь с таким email уже существует" });
      }
      const hashPassword = bcrypt.hashSync(password, 7);
      const userRole = await Role.findOne({ value: "User" });
      const user = new User({
        email,
        username,
        password: hashPassword,
        role: userRole.value,
      });
      await user.save();
      res.json({ message: "Пользователь успешно зарегистрирован" });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Ошибка при регистрации" });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: "Пользователь не найден" });
      }

      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) {
        return res
          .status(400)
          .json({ message: "Неверный пароль, попробуйте снова!" });
      }

      const token = jwt.sign(
        { userId: user._id, role: user.role },
        config.get("jwtSecret"),
        { expiresIn: "24h" }
      );
      res.json({ token, userId: user._id, role: user.role });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Ошибка при регистрации" });
    }
  }

  // async getUser(req, res) {
  //   try {
  //     const userId = req.params.id;
  //     const user = await User.findOne({ _id: userId });
  //     const userData = { username: user.username, email: user.email };
  //     res.json(userData);
  //   } catch (e) {
  //     res.status(400).json({ message: "Ошибка сервера" });
  //   }
  // }

  async getUserById(req, res) {
    try {
      const userId = req.params.id;
      const user = await User.findOne({ _id: userId });
      res.json({ id: user._id, username: user.username });
    } catch (e) {
      console.log(e);
      res.status(400).json({
        message: "SERVER ERROR!",
      });
    }
  }
}

module.exports = new authController();
