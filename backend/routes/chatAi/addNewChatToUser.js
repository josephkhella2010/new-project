import express from "express";
import mongoose from "mongoose";

import ChatAI from "../../Mongoo/schemas/ChatAi.js";
import verifyToken from "../../token/middleware/verifyToken.js";

const router = express.Router();

// ======================================================
// CREATE NEW CHAT
// ======================================================

router.post("/newChat/:userId", verifyToken, async (req, res) => {
  try {
    const { userId } = req.params;

    // ==================================================
    // VALIDATE USER ID
    // ==================================================

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        message: ["Invalid user ID"],
      });
    }

    // ==================================================
    // FIND CHAT AI DOCUMENT
    // ==================================================

    let chatAI = await ChatAI.findOne({
      userId,
    });

    // ==================================================
    // CREATE CHAT AI DOCUMENT IF NOT EXISTS
    // ==================================================

    if (!chatAI) {
      chatAI = await ChatAI.create({
        userId,
        chats: [],
      });
    }

    // ==================================================
    // CHECK EXISTING EMPTY CHAT
    // ==================================================

    const existingChat = chatAI.chats
      .slice()
      .reverse()
      .find((chat) => !chat.messages || chat.messages.length === 0);

    // ==================================================
    // EMPTY CHAT ALREADY EXISTS
    // ==================================================

    if (existingChat) {
      return res.status(200).json({
        message: ["Empty chat already exists"],

        chatId: existingChat._id,

        chat: existingChat,

        chatAI,
      });
    }

    // ==================================================
    // CREATE NEW CHAT
    // ==================================================

    chatAI.chats.push({
      messages: [],
    });

    // ==================================================
    // SAVE
    // ==================================================

    await chatAI.save();

    // ==================================================
    // GET NEW CHAT
    // ==================================================

    const newChat = chatAI.chats[chatAI.chats.length - 1];

    // ==================================================
    // RESPONSE
    // ==================================================

    return res.status(201).json({
      message: ["New chat created successfully"],

      chatId: newChat._id,

      chat: newChat,

      chatAI,
    });
  } catch (error) {
    console.error("CREATE NEW CHAT ERROR:", error);

    return res.status(500).json({
      message: ["Failed to create new chat"],

      error: error.message,
    });
  }
});

export default router;
