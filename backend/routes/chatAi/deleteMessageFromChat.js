import express from "express";
import mongoose from "mongoose";

import ChatAI from "../../Mongoo/schemas/ChatAi.js";
import verifyToken from "../../token/middleware/verifyToken.js";

const router = express.Router();

// =====================================================
// DELETE MESSAGE
//
// 1. Find user
// 2. Find chat
// 3. Find message
// 4. Delete message
// 5. If chat has 0 messages -> delete chat
// =====================================================

router.delete(
  "/delete-message/:userId/:chatId/:messageId",
  verifyToken,
  async (req, res) => {
    try {
      const { userId, chatId, messageId } = req.params;

      console.log("====================================");
      console.log("DELETE MESSAGE");
      console.log("userId:", userId);
      console.log("chatId:", chatId);
      console.log("messageId:", messageId);
      console.log("====================================");

      // =================================================
      // VALIDATE IDS
      // =================================================

      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({
          message: ["Invalid user ID"],
        });
      }

      if (!mongoose.Types.ObjectId.isValid(chatId)) {
        return res.status(400).json({
          message: ["Invalid chat ID"],
        });
      }

      if (!mongoose.Types.ObjectId.isValid(messageId)) {
        return res.status(400).json({
          message: ["Invalid message ID"],
        });
      }

      // =================================================
      // FIND USER CHAT AI
      // =================================================

      const chatAI = await ChatAI.findOne({
        userId,
      });

      if (!chatAI) {
        return res.status(404).json({
          message: ["ChatAI not found"],
        });
      }

      // =================================================
      // FIND CHAT
      // =================================================

      const chat = chatAI.chats.id(chatId);

      if (!chat) {
        return res.status(404).json({
          message: ["Chat not found"],
          chatId,
        });
      }

      // =================================================
      // FIND MESSAGE
      // =================================================

      const message = chat.messages.id(messageId);

      if (!message) {
        return res.status(404).json({
          message: ["Message not found"],
          messageId,
        });
      }

      // Save deleted message before removing it
      const deletedMessage = message.toObject();

      // =================================================
      // DELETE MESSAGE
      // =================================================

      chat.messages.pull(messageId);

      console.log("MESSAGE DELETED:", messageId);

      // =================================================
      // CHECK IF CHAT IS EMPTY
      // =================================================

      let chatDeleted = false;

      if (chat.messages.length === 0) {
        chatAI.chats.pull(chatId);

        chatDeleted = true;

        console.log("CHAT IS EMPTY -> CHAT DELETED:", chatId);
      }

      // =================================================
      // SAVE
      // =================================================

      await chatAI.save();

      // =================================================
      // RESPONSE
      // =================================================

      return res.status(200).json({
        message: [
          chatDeleted
            ? "Message deleted and empty chat deleted"
            : "Message deleted successfully",
        ],

        deletedMessage,

        userId,

        chatId,

        messageId,

        chatDeleted,

        // If chat was deleted, return null
        chat: chatDeleted ? null : chat,

        // Return remaining chats
        chats: chatAI.chats,
      });
    } catch (error) {
      console.error("DELETE MESSAGE ERROR:", error);

      return res.status(500).json({
        message: ["Failed to delete message"],

        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },
);

export default router;
