import {
  call,
  put,
  takeLatest,
} from "redux-saga/effects";

import type { SagaIterator } from "redux-saga";

import apiRequest from "../../../utilities/functions";

import {
  fetchLoading,
  fetchClearLoading,
  fetchError,
} from "../../slices/loadAndErrorSlice/loadAndErrorSlice";

import {
  deleteMessageFromChat,
} from "../../slices/chatSlice/ChatSlice";

import type { ChatType } from "../../../utilities/Interfaces";

// =====================================================
// RESPONSE
// =====================================================

interface DeleteMessageResponse {
  message: string[];

  deletedMessage: unknown;

  userId: string;

  chatId: string;

  messageId: string;

  chatDeleted: boolean;

  chat: ChatType | null;

  chats: ChatType[];
}

// =====================================================
// ACTION
// =====================================================

interface DeleteMessageAction {
  type: string;

  payload: {
    userId: string;
    chatId: string;
    messageId: string;
  };
}

// =====================================================
// API
// =====================================================

const deleteMessageApi = async (
  userId: string,
  chatId: string,
  messageId: string,
): Promise<DeleteMessageResponse> => {
  const token =
    localStorage.getItem("token") ?? "";

  return await apiRequest({
    endpoint:
      `/delete-message/${userId}/${chatId}/${messageId}`,

    method: "DELETE",

    token,
  });
};

// =====================================================
// WORKER
// =====================================================

function* deleteMessageSaga(
  action: DeleteMessageAction,
): SagaIterator {
  try {
    yield put(fetchLoading());

    const {
      userId,
      chatId,
      messageId,
    } = action.payload;

    console.log(
      "====================================",
    );

    console.log("DELETE MESSAGE SAGA");

    console.log("userId:", userId);

    console.log("chatId:", chatId);

    console.log("messageId:", messageId);

    console.log(
      "====================================",
    );

    // ==========================================
    // VALIDATION
    // ==========================================

    if (!userId) {
      throw new Error(
        "User ID is required",
      );
    }

    if (!chatId) {
      throw new Error(
        "Chat ID is required",
      );
    }

    if (!messageId) {
      throw new Error(
        "Message ID is required",
      );
    }

    // ==========================================
    // API
    // ==========================================

    const response: DeleteMessageResponse =
      yield call(
        deleteMessageApi,
        userId,
        chatId,
        messageId,
      );

    console.log(
      "DELETE MESSAGE RESPONSE:",
      response,
    );

    // ==========================================
    // UPDATE REDUX
    // ==========================================

    yield put(
      deleteMessageFromChat({
        chatId: response.chatId,

        messageId: response.messageId,

        chatDeleted:
          response.chatDeleted,

        chats: response.chats,
      }),
    );

    // ==========================================
    // FINISH
    // ==========================================

    yield put(
      fetchClearLoading(),
    );
  } catch (error: unknown) {
    console.error(
      "DELETE MESSAGE SAGA ERROR:",
      error,
    );

    const errorMessage =
      error instanceof Error
        ? error.message
        : "Failed to delete message";

    yield put(
      fetchError([
        errorMessage,
      ]),
    );
  }
}

// =====================================================
// WATCHER
// =====================================================

export default function* watchDeleteMessageSaga(): SagaIterator {
  yield takeLatest(
    "DELETE-MESSAGE_REQUEST",
    deleteMessageSaga,
  );
}