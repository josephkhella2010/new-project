/* import express from "express";
import ChatAI from "../../Mongoo/schemas/ChatAi.js";
import UserTwo from "../../Mongoo/schemas/User.js";
import verifyToken from "../../token/middleware/verifyToken.js"

const router = express.Router();
const token = verifyToken;

router.get("/chatsAi-user/:userId",token ,async (req, res) => {
  try {
    const { userId } = req.params;

    const chatsAI = await ChatAI.find({
      userId: userId,
    });

    return res.status(200).json({
      message: ["Get user chat AI successfully"],
      chatsAI,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

export default router;
 */

import express from "express";
import mongoose from "mongoose";
import ChatAI from "../../Mongoo/schemas/ChatAi.js";
import verifyToken from "../../token/middleware/verifyToken.js";

const router = express.Router();

router.get("/chatsAi-user/:userId",verifyToken ,async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate userId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        message: ["Invalid user ID"],
      });
    }

    // Get ChatAI document for this user
    const chatAI = await ChatAI.findOne({
      userId: userId,
    });

    if (!chatAI) {
      return res.status(200).json({
        message: ["No chat AI found for this user"],
        chatAI: null,
      });
    }

    return res.status(200).json({
      message: ["Get user chat AI successfully"],
      chatAI,
    });
  } catch (error) {
    console.error("Get user chats error:", error);

    return res.status(500).json({
      message: ["Failed to get user chat AI"],
      error: error.message,
    });
  }
});

export default router;
