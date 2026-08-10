/* import express from "express";
import ChatAI from "../../Mongoo/schemas/ChatAi.js";

const router = express.Router();

router.get("/chatsAi", async (req, res) => {
  try {
    const chatsAI = await ChatAI.find();

    return res.status(200).json({
      message: ["Get all chat AIs successfully"],
      chatsAI: chatsAI,
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
import ChatAI from "../../Mongoo/schemas/ChatAi.js";

const router = express.Router();

// Get all ChatAI documents
router.get("/chatsAi", async (req, res) => {
  try {
    const chatsAI = await ChatAI.find().sort({ updatedAt: -1 });

    return res.status(200).json({
      message: ["Get all chat AIs successfully"],
      chatsAI,
    });
  } catch (error) {
    console.error("Get chats AI error:", error);

    return res.status(500).json({
      message: ["Failed to get chat AIs"],
      error: error.message,
    });
  }
});

export default router;
