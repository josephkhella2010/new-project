import express from "express";
import mongoose from "mongoose";

import ChatAI from "../../Mongoo/schemas/ChatAi.js";
import verifyToken from "../../token/middleware/verifyToken.js";

const router = express.Router();

// =====================================================
// DELETE CHAT BY CHAT ID
// =====================================================

router.delete("/delete-chat/:userId/:chatId", verifyToken, async (req, res) => {
  try {
    const { userId, chatId } = req.params;

    console.log("====================================");
    console.log("DELETE CHAT");
    console.log("userId:", userId);
    console.log("chatId:", chatId);
    console.log("====================================");

    // =================================================
    // VALIDATE USER ID
    // =================================================

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        message: ["Invalid user ID"],
      });
    }

    // =================================================
    // VALIDATE CHAT ID
    // =================================================

    if (!mongoose.Types.ObjectId.isValid(chatId)) {
      return res.status(400).json({
        message: ["Invalid chat ID"],
      });
    }

    // =================================================
    // FIND USER CHATAI
    // =================================================

    const chatAI = await ChatAI.findOne({
      userId,
    });

    if (!chatAI) {
      return res.status(404).json({
        message: ["ChatAI not found for this user"],
      });
    }

    // =================================================
    // CHECK CHAT EXISTS
    // =================================================

    const chatExists = chatAI.chats.some(
      (chat) => String(chat._id) === String(chatId),
    );

    if (!chatExists) {
      return res.status(404).json({
        message: ["Chat not found"],
        chatId,
      });
    }

    // =================================================
    // DELETE ONLY THIS CHAT
    // =================================================

    chatAI.chats = chatAI.chats.filter(
      (chat) => String(chat._id) !== String(chatId),
    );

    // =================================================
    // SAVE
    // =================================================

    await chatAI.save();

    // =================================================
    // RESPONSE
    // =================================================

    return res.status(200).json({
      message: ["Chat deleted successfully"],

      deletedChatId: String(chatId),

      chatAI,
    });
  } catch (error) {
    console.error("DELETE CHAT ERROR:", error);

    return res.status(500).json({
      message: ["Failed to delete chat"],

      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

export default router;
