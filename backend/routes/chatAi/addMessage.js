import express from "express";
import mongoose from "mongoose";
import OpenAI from "openai";

import ChatAI from "../../Mongoo/schemas/ChatAi.js";
import verifyToken from "../../token/middleware/verifyToken.js";

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// =====================================================
// COMMON FUNCTION
// =====================================================

const addMessage = async (req, res, chatId = null) => {
  try {
    const { userId } = req.params;
    const { question } = req.body;

    console.log("====================================");
    console.log("ADD MESSAGE");
    console.log("userId:", userId);
    console.log("chatId:", chatId);
    console.log("question:", question);
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
    // VALIDATE QUESTION
    // =================================================

    if (
      typeof question !== "string" ||
      !question.trim()
    ) {
      return res.status(400).json({
        message: ["Question is required"],
      });
    }

    // =================================================
    // FIND CHATAI
    // =================================================

    let chatAI = await ChatAI.findOne({
      userId,
    });

    // =================================================
    // CREATE CHATAI IF NOT EXISTS
    // =================================================

    if (!chatAI) {
      chatAI = await ChatAI.create({
        userId,
        chats: [],
      });
    }

    // =================================================
    // FIND CHAT
    // =================================================

    let chat = null;

    // =================================================
    // CHAT ID WAS PROVIDED
    // =================================================

    if (chatId) {
      console.log("USING CHAT ID:", chatId);

      if (
        !mongoose.Types.ObjectId.isValid(chatId)
      ) {
        return res.status(400).json({
          message: ["Invalid chat ID"],
          chatId,
        });
      }

      chat = chatAI.chats.id(chatId);

      // IMPORTANT:
      // If chatId exists but chat doesn't exist,
      // don't create another chat.
      if (!chat) {
        return res.status(404).json({
          message: ["Chat not found"],
          chatId,
        });
      }
    }

    // =================================================
    // NO CHAT ID
    // =================================================

    if (!chatId) {
      console.log("NO CHAT ID PROVIDED");

      // -----------------------------------------------
      // Use existing chat
      // -----------------------------------------------

      if (chatAI.chats.length > 0) {
        chat =
          chatAI.chats[
            chatAI.chats.length - 1
          ];

        console.log(
          "USING EXISTING CHAT:",
          String(chat._id),
        );
      }
    }

    // =================================================
    // NO CHAT EXISTS
    // CREATE FIRST CHAT
    // =================================================

    if (!chat) {
      console.log(
        "NO CHAT EXISTS -> CREATE FIRST CHAT",
      );

      chat = chatAI.chats.create({
        messages: [],
      });

      chatAI.chats.push(chat);

      console.log(
        "NEW CHAT CREATED:",
        String(chat._id),
      );
    }

    // =================================================
    // OPENAI
    // =================================================

    const response =
      await openai.responses.create({
        model: "gpt-5.4-mini",
        input: question.trim(),
      });

    const answer = response.output_text;

    // =================================================
    // VALIDATE ANSWER
    // =================================================

    if (
      typeof answer !== "string" ||
      !answer.trim()
    ) {
      return res.status(500).json({
        message: [
          "OpenAI returned an empty answer",
        ],
      });
    }

    // =================================================
    // ADD MESSAGE
    // =================================================

    chat.messages.push({
      question: question.trim(),
      answer: answer.trim(),
    });

    // =================================================
    // SAVE
    // =================================================

    await chatAI.save();

    // =================================================
    // SAVED MESSAGE
    // =================================================

    const savedMessage =
      chat.messages[
        chat.messages.length - 1
      ];

    // =================================================
    // RESPONSE
    // =================================================

    return res.status(200).json({
      message: [
        "Message added successfully",
      ],

      chatId: String(chat._id),

      question: question.trim(),

      answer: answer.trim(),

      chat,

      savedMessage,

      chatAI,
    });
  } catch (error) {
    console.error(
      "ADD MESSAGE ERROR:",
      error,
    );

    return res.status(500).json({
      message: [
        "Failed to add message",
      ],

      error:
        error instanceof Error
          ? error.message
          : "Unknown error",
    });
  }
};

// =====================================================
// 1. ADD MESSAGE TO EXISTING CHAT
// =====================================================

router.post(
  "/add-message-chat/:userId/:chatId",
  verifyToken,
  async (req, res) => {
    const { chatId } = req.params;

    return addMessage(req, res, chatId);
  },
);

// =====================================================
// 2. ADD MESSAGE WITHOUT CHAT ID
// =====================================================
//
// If user already has a chat:
//   -> use latest chat
//
// If user has no chat:
//   -> create first chat
//
// =====================================================

router.post(
  "/add-message-chat/:userId",
  verifyToken,
  async (req, res) => {
    return addMessage(req, res);
  },
);

export default router;