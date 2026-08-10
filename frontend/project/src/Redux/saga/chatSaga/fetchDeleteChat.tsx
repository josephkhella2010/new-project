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
  deleteChat,
} from "../../slices/chatSlice/ChatSlice";

import type {
  ChatAIType,
} from "../../../utilities/Interfaces";

// =====================================================
// RESPONSE
// =====================================================

interface DeleteChatResponse {
  message: string[];

  deletedChatId: string;

  chatAI: ChatAIType;
}

// =====================================================
// ACTION
// =====================================================

interface DeleteChatRequestAction {
  type: string;

  payload: {
    userId: string;
    chatId: string;
  };
}

// =====================================================
// API
// =====================================================

const deleteChatApi = async (
  userId: string,
  chatId: string,
): Promise<DeleteChatResponse> => {
  const token =
    localStorage.getItem("token") ?? "";

  return await apiRequest({
    endpoint: `/delete-chat/${userId}/${chatId}`,
    method: "DELETE",
    token,
  });
};

// =====================================================
// SAGA
// =====================================================

function* deleteChatSaga(
  action: DeleteChatRequestAction,
): SagaIterator {
  try {
    yield put(fetchLoading());

    const {
      userId,
      chatId,
    } = action.payload;

    console.log(
      "=================================",
    );

    console.log("DELETE CHAT");

    console.log("USER ID:", userId);

    console.log("CHAT ID:", chatId);

    console.log(
      "=================================",
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

    // ==========================================
    // CALL BACKEND
    // ==========================================

    const response: DeleteChatResponse =
      yield call(
        deleteChatApi,
        userId,
        chatId,
      );

    console.log(
      "DELETE CHAT RESPONSE:",
      response,
    );

    // ==========================================
    // UPDATE REDUX
    // ==========================================

    yield put(
      deleteChat({
        chatId:
          response.deletedChatId,
      }),
    );

    // ==========================================
    // CLEAR LOADING
    // ==========================================

    yield put(fetchClearLoading());

  } catch (error: unknown) {
    console.error(
      "DELETE CHAT ERROR:",
      error,
    );

    const errorMessage =
      error instanceof Error
        ? error.message
        : "Failed to delete chat";

    yield put(
      fetchError([errorMessage]),
    );
  }
}

// =====================================================
// WATCHER
// =====================================================

export default function* watchDeleteChatSaga(): SagaIterator {
  yield takeLatest(
    "DELETE-CHAT_REQUEST",
    deleteChatSaga,
  );
}