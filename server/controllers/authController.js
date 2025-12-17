const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const generateAccessToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.ACCESS_EXPIRES || "15m",
  });
};

const generateRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.REFRESH_EXPIRES || "7d",
  });
};

// @route POST /api/auth/register
const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Missing fields");
    }

    const exists = await User.findOne({ email });
    if (exists) {
      res.status(400);
      throw new Error("User already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    const user = await User.create({ name, email, password: hashed });

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    user.refreshToken = refreshToken;
    await user.save();

    res.json({
      accessToken,
      refreshToken,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    next(err);
  }
};

// @route POST /api/auth/login
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401);
      throw new Error("Invalid credentials");
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      res.status(401);
      throw new Error("Invalid credentials");
    }

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    user.refreshToken = refreshToken;
    await user.save();

    res.json({
      accessToken,
      refreshToken,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    next(err);
  }
};

// @route POST /api/auth/refresh
const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      res.status(400);
      throw new Error("No refresh token provided");
    }

    let decoded;
    try {
      decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
    } catch (err) {
      res.status(401);
      throw new Error("Invalid refresh token");
    }

    const user = await User.findById(decoded.id);
    if (!user || user.refreshToken !== refreshToken) {
      res.status(401);
      throw new Error("Invalid refresh token");
    }

    const accessToken = generateAccessToken(user._id);
    const newRefresh = generateRefreshToken(user._id);
    user.refreshToken = newRefresh;
    await user.save();

    res.json({ accessToken, refreshToken: newRefresh });
  } catch (err) {
    next(err);
  }
};

// @route POST /api/auth/logout
const logoutUser = async (req, res, next) => {
  try {
    const userId = req.user;
    const user = await User.findById(userId);
    if (user) {
      user.refreshToken = null;
      await user.save();
    }
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

// @route GET /api/auth/me
const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user).select(
      "-password -refreshToken"
    );
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }
    res.json({ user });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  registerUser,
  loginUser,
  refreshToken,
  logoutUser,
  getProfile,
};
