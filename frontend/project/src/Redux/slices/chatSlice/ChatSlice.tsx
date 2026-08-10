import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { ChatAIType, ChatType } from "../../../utilities/Interfaces";

interface DeleteMessagePayload {
  chatId: string;
  messageId: string;
  chatDeleted: boolean;
  chats: ChatType[];
}

interface InitialStateType {
  chatsAI: ChatAIType[];
  chatUser: ChatType[];
  activeChatId: string | null;
}

const initialState: InitialStateType = {
  chatsAI: [],
  chatUser: [],
  activeChatId: null,
};

const ChatSlice = createSlice({
  name: "chatsSlice",

  initialState,

  reducers: {
    // ==========================================
    // ALL CHAT AI
    // ==========================================

    setChatsAI: (state, action: PayloadAction<ChatAIType[]>) => {
      state.chatsAI = action.payload;
    },

    // ==========================================
    // USER CHATS
    // ==========================================

    setChatUser: (state, action: PayloadAction<ChatType[]>) => {
      state.chatUser = action.payload;

      // No chats
      if (action.payload.length === 0) {
        state.activeChatId = null;
        return;
      }

      // ----------------------------------------
      // Keep current active chat if it still exists
      // ----------------------------------------

      if (state.activeChatId) {
        const exists = action.payload.some(
          (chat) => String(chat._id) === String(state.activeChatId),
        );

        if (exists) {
          return;
        }
      }

      // ----------------------------------------
      // Otherwise select latest chat
      // ----------------------------------------

      const latestChat = action.payload[action.payload.length - 1];

      state.activeChatId = String(latestChat._id);
    },

    // ==========================================
    // ACTIVE CHAT
    // ==========================================

    setActiveChatId: (state, action: PayloadAction<string | null>) => {
      state.activeChatId = action.payload ? String(action.payload) : null;
    },
    setAddMessageToChat: (state, action: PayloadAction<ChatType>) => {
      const updatedChat = action.payload;

      const chatId = String(updatedChat._id);

      // ----------------------------------------
      // Find chat in chatUser
      // ----------------------------------------

      const userChatIndex = state.chatUser.findIndex(
        (chat) => String(chat._id) === chatId,
      );

      if (userChatIndex !== -1) {
        // Replace the chat with updated chat
        state.chatUser[userChatIndex] = updatedChat;
      } else {
        // This can happen when backend created
        // the first chat.
        state.chatUser.push(updatedChat);
      }

      // ----------------------------------------
      // Also update chatsAI if you use it
      // ----------------------------------------

      for (const chatAI of state.chatsAI) {
        const chatIndex = chatAI.chats.findIndex(
          (chat) => String(chat._id) === chatId,
        );

        if (chatIndex !== -1) {
          chatAI.chats[chatIndex] = updatedChat;
        }
      }

      // ----------------------------------------
      // Make sure this chat is active
      // ----------------------------------------

      state.activeChatId = chatId;
    },
    // ==========================================
    // DELETE MESSAGE
    // ==========================================

    deleteMessageFromChat: (
      state,
      action: PayloadAction<DeleteMessagePayload>,
    ) => {
      const { chatId, messageId, chatDeleted, chats } = action.payload;

      // ========================================
      // CHAT WAS DELETED
      // ========================================

      if (chatDeleted) {
        // Remove from chatUser
        state.chatUser = state.chatUser.filter(
          (chat) => String(chat._id) !== String(chatId),
        );

        // Remove from chatsAI
        state.chatsAI = state.chatsAI.map((chatAI) => ({
          ...chatAI,
          chats: chatAI.chats.filter(
            (chat) => String(chat._id) !== String(chatId),
          ),
        }));

        // ======================================
        // ACTIVE CHAT WAS DELETED
        // ======================================

        if (String(state.activeChatId) === String(chatId)) {
          if (chats.length > 0) {
            const lastChat = chats[chats.length - 1];

            state.activeChatId = String(lastChat._id);
          } else {
            state.activeChatId = null;
          }
        }

        return;
      }

      // ========================================
      // ONLY MESSAGE WAS DELETED
      // ========================================

      const userChat = state.chatUser.find(
        (chat) => String(chat._id) === String(chatId),
      );

      if (userChat) {
        userChat.messages = userChat.messages.filter(
          (message) => String(message._id) !== String(messageId),
        );
      }

      // ========================================
      // UPDATE chatsAI TOO
      // ========================================

      state.chatsAI = state.chatsAI.map((chatAI) => ({
        ...chatAI,

        chats: chatAI.chats.map((chat) => {
          if (String(chat._id) !== String(chatId)) {
            return chat;
          }

          return {
            ...chat,

            messages: chat.messages.filter(
              (message) => String(message._id) !== String(messageId),
            ),
          };
        }),
      }));
    },
    deleteChat: (
      state,
      action: PayloadAction<{
        chatId: string;
      }>,
    ) => {
      const { chatId } = action.payload;

      const id = String(chatId);

      // ----------------------------------------
      // Delete from chatUser
      // ----------------------------------------

      state.chatUser = state.chatUser.filter((chat) => String(chat._id) !== id);

      // ----------------------------------------
      // Delete from chatsAI
      //
      // chatsAI contains ChatAI objects
      // ----------------------------------------

      state.chatsAI = state.chatsAI.map((chatAI) => ({
        ...chatAI,

        chats: chatAI.chats.filter((chat) => String(chat._id) !== id),
      }));

      // ----------------------------------------
      // If deleted chat was active
      // ----------------------------------------

      if (String(state.activeChatId) === id) {
        // Select last remaining chat
        if (state.chatUser.length > 0) {
          const lastChat = state.chatUser[state.chatUser.length - 1];

          state.activeChatId = String(lastChat._id);
        } else {
          // No chats remaining
          state.activeChatId = null;
        }
      }
    },
    setClearChats: (state) => {
      state.chatsAI = [];
      state.chatUser = [];
      state.activeChatId = null;
    },
  },
});

export const {
  setChatsAI,
  setChatUser,
  setActiveChatId,
  setAddMessageToChat,
  deleteMessageFromChat,
  deleteChat,
  setClearChats,
} = ChatSlice.actions;

export default ChatSlice.reducer;
