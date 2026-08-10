/* import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },

    answer: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


const chatAISchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserTwo",
      required: true,
      unique: true,
    },

    messages: [messageSchema],
  },
  {
    timestamps: true,
  }
);


const ChatAI = mongoose.model(
  "ChatAI",
  chatAISchema,
  "ChatAI"
);


export default ChatAI; */

import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true,
    },

    answer: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const chatSchema = new mongoose.Schema(
  {
    messages: {
      type: [messageSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

const chatAISchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserTwo",
      required: true,
      unique: true,
    },

    chats: {
      type: [chatSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

const ChatAI = mongoose.model("ChatAI", chatAISchema, "ChatAI");

export default ChatAI;
