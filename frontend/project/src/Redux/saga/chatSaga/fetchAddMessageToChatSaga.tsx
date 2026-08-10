import { call, put, takeLatest } from "redux-saga/effects";

import type { SagaIterator } from "redux-saga";

import apiRequest from "../../../utilities/functions";

import {
  fetchLoading,
  fetchClearLoading,
  fetchError,
} from "../../slices/loadAndErrorSlice/loadAndErrorSlice";

import { setAddMessageToChat } from "../../slices/chatSlice/ChatSlice";

import type { ChatAIType, ChatType } from "../../../utilities/Interfaces";

// =====================================================
// RESPONSE
// =====================================================

interface AddMessageResponse {
  message: string[];

  chatId: string;

  question: string;

  answer: string;

  chat: ChatType;

  savedMessage: unknown;

  chatAI: ChatAIType;
}

// =====================================================
// ACTION
// =====================================================

interface AddMessageRequestAction {
  type: string;

  payload: {
    userId: string;

    chatId?: string | null;

    question: string;
  };
}

// =====================================================
// API
// =====================================================

const addMessageApi = async (
  userId: string,
  question: string,
  chatId?: string | null,
): Promise<AddMessageResponse> => {
  const token = localStorage.getItem("token") ?? "";

  // -----------------------------------------------
  // If chatId exists
  // -----------------------------------------------

  const endpoint = chatId
    ? `/add-message-chat/${userId}/${chatId}`
    : `/add-message-chat/${userId}`;

  return await apiRequest({
    endpoint,
    method: "POST",
    token,
    data: {
      question,
    },
  });
};

// =====================================================
// WORKER
// =====================================================

function* addMessageSaga(action: AddMessageRequestAction): SagaIterator {
  try {
    yield put(fetchLoading());

    const { userId, chatId, question } = action.payload;

    console.log("====================================");

    console.log("ADD MESSAGE SAGA");

    console.log("userId:", userId);

    console.log("chatId:", chatId);

    console.log("question:", question);

    console.log("====================================");

    // =================================================
    // VALIDATION
    // =================================================

    if (!userId) {
      throw new Error("User ID is required");
    }

    if (!question.trim()) {
      throw new Error("Question is required");
    }

    // =================================================
    // CALL BACKEND
    // =================================================

    const response: AddMessageResponse = yield call(
      addMessageApi,
      userId,
      question.trim(),
      chatId,
    );

    console.log("ADD MESSAGE RESPONSE:", response);

    // =================================================
    // CHECK CHAT
    // =================================================

    if (!response.chat) {
      throw new Error("Backend did not return chat");
    }

    // =================================================
    // UPDATE REDUX
    // =================================================

    yield put(setAddMessageToChat(response.chat));

    // =================================================
    // DONE
    // =================================================

    yield put(fetchClearLoading());
  } catch (error: unknown) {
    console.error("ADD MESSAGE SAGA ERROR:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Failed to add message";

    yield put(fetchError([errorMessage]));
  }
}

// =====================================================
// WATCHER
// =====================================================

export default function* watchAddMessageToChatSaga(): SagaIterator {
  yield takeLatest("ADD_MESSAGE_REQUEST", addMessageSaga);
}
