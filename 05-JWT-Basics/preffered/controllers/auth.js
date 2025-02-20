const User = require("../models/User");
const Role = require("../models/Role");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { secret } = require("../config");

const generateAccessToken = (id, roles) => {
  const payload = { id, roles };
  return jwt.sign(payload, secret, { expiresIn: "24h" });
};

class AuthController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "registration error", errors });
      }
      const { username, password } = req.body;
      const candidate = await User.findOne({ username });
      if (candidate) {
        return res.status(400).json({ message: "user name is taken" });
      }
      const hashPassword = bcrypt.hashSync(password, 7);
      const userRole = await Role.findOne({ value: "USER" });
      if (!userRole) {
        throw new Error("Role USER not found in database");
      }
      const user = new User({
        username,
        password: hashPassword,
        roles: [userRole.value],
      });
      await user.save();
      return res.json({ message: "user is registered" });
    } catch (e) {
      console.error("Registration error:", e.message);
      res.status(400).json({ message: "Registration error", error: e.message });
    }
  }

  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
      const token = generateAccessToken(user._id, user.roles);
      return res.json({ token });
    } catch (e) {
      console.error("Login error:", e.message);
      res.status(400).json({ message: "Login error", error: e.message });
    }
  }

  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (e) {
      console.error("Get users error:", e.message);
      res
        .status(500)
        .json({ message: "Error fetching users", error: e.message });
    }
  }
}

module.exports = new AuthController();
