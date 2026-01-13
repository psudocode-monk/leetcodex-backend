const User = require("../models/user");
const validate = require("../utils/validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function register(req, res) {
  try {
    validate(req.body);

    const { firstName, emailId, password } = req.body;
    const existingUser = await User.findOne({ emailId });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ firstName, emailId, password: hashedPassword });
    await newUser.save();

    res.cookie("token", jwt.sign({ id: newUser._id }, process.env.JWT_SECRET), {
      httpOnly: true,
      expiresIn: new Date(Date.now() + 8 * 3600000),
    });

    return res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
}

async function login(req, res) {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    res.cookie("token", jwt.sign({ id: user._id }, process.env.JWT_SECRET), {
      httpOnly: true,
      expiresIn: new Date(Date.now() + 8 * 3600000),
    });

    return res.status(200).json({ message: "Login successful" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

async function logout(req, res) {
  res.clearCookie("token");
  return res.status(200).json({ message: "Logout successful" });
}

async function getProfile(req, res) {
  try {
  } catch (error) {}
}

module.exports = {
  register,
  login,
  logout,
  getProfile,
};
