import express from "express";
import UserTwo from "../../Mongoo/schemas/User.js";

const router = express.Router();

router.get("/users", async (req, res) => {
  try {
    const users = await UserTwo.find();

    return res.status(200).json({
      message: ["Get all users successfully"],
      users: users,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

export default router;
