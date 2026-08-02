import express from "express";
import UserTwo from "../../Mongoo/schemas/User.js";
import verifyToken from "../../token/middleware/verifyToken.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const router = express.Router();
const token = verifyToken;

router.put("/update-user/:id", token, async (req, res) => {
  try {
    const { id: userId } = req.params;
    const formatName = (name, isLower = false) => {
      if (!name) return "";
      name = name.trim();
      if (isLower) {
        name = name.toLowerCase();
      }
      return name;
    };
    const saltRounds = 10;
    const firstName = formatName(req.body.firstName, false);
    const lastName = formatName(req.body.lastName, false);
    const username = formatName(req.body.username, true);
    const email = formatName(req.body.email, true);
    const password = formatName(req.body.password, false);
    const dateOfBirth = req.body.dateOfBirth;

    req.body;
    if (!token) {
      return res.status(401).json({
        message: ["Unauthorized User Please Login First"],
      });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        message: ["Invalid user ID"],
      });
    }

    const findUser = await UserTwo.findById(userId);
    const existingUser = await UserTwo.findOne({
      $or: [{ username }, { email }],
      _id: { $ne: userId },
    });
    if (existingUser) {
      return res.status(404).json({
        message: ["Username or Email is Already exist"],
      });
    }
    if (!findUser) {
      return res.status(404).json({
        message: ["User not found"],
      });
    }
    let hashedPassword = findUser.password;

    if (req.body.password && req.body.password.trim() !== "") {
      hashedPassword = await bcrypt.hash(req.body.password.trim(), saltRounds);
    }

    const updatedUser = await UserTwo.findByIdAndUpdate(
      userId,
      {
        firstName,
        lastName,
        username,
        email,
        password: hashedPassword,
        dateOfBirth,
      },
      { new: true },
    );
    const users = await UserTwo.find();

    return res.status(200).json({
      message: ["User updated successfully"],
      user: updatedUser,
      users,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

export default router;
