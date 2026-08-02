import express from "express";
import UserTwo from "../../Mongoo/schemas/User.js";
import verifyToken from "../../token/middleware/verifyToken.js";
import mongoose from "mongoose";

const router = express.Router();
const token = verifyToken;

router.delete("/delete-user/:id", token, async (req, res) => {
  try {
    const { id: userId } = req.params;
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

    const userDeleted = await UserTwo.findByIdAndDelete(userId);
    if (!userDeleted) {
      return res.status(404).json({
        message: ["User not found"],
      });
    }

    const allUsers = await UserTwo.find();

    const filteredUsers = allUsers.filter(
      (user) => user._id.toString() !== userId,
    );

    return res.status(200).json({
      message: ["User deleted successfully"],
      user: userDeleted,
      users: filteredUsers,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

export default router;
