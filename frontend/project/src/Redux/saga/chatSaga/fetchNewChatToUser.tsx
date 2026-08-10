import { call, put, takeLatest } from "redux-saga/effects";
import type { SagaIterator } from "redux-saga";

import apiRequest from "../../../utilities/functions";

import {
  fetchLoading,
  fetchClearLoading,
  fetchError,
} from "../../slices/loadAndErrorSlice/loadAndErrorSlice";

import { setChatUser, setActiveChatId } from "../../slices/chatSlice/ChatSlice";

import type { ChatAIType, ChatType } from "../../../utilities/Interfaces";

// =====================================================
// RESPONSE
// =====================================================

interface AddChatResponse {
  message: string[];
  chatId: string;
  chat: ChatType;
  chatAI: ChatAIType;
}

// =====================================================
// ACTION
// =====================================================

interface AddChatRequestAction {
  type: string;
  payload: string; // userId
}

// =====================================================
// API
// =====================================================

const createNewChatApi = async (userId: string): Promise<AddChatResponse> => {
  const token = localStorage.getItem("token") ?? "";

  return await apiRequest({
    endpoint: `/newChat/${userId}`,
    method: "POST",
    token,
  });
};

// =====================================================
// SAGA
// =====================================================

function* addNewChatSaga(action: AddChatRequestAction): SagaIterator {
  try {
    yield put(fetchLoading());

    const userId = action.payload;

    console.log("=================================");
    console.log("CREATE NEW CHAT");
    console.log("USER ID:", userId);
    console.log("=================================");

    // =================================================
    // CALL BACKEND
    // =================================================

    const response: AddChatResponse = yield call(createNewChatApi, userId);

    console.log("NEW CHAT RESPONSE:", response);

    // =================================================
    // CHECK RESPONSE
    // =================================================

    if (!response.chat) {
      throw new Error("Backend did not return a chat");
    }

    // =================================================
    // GET ALL USER CHATS
    // =================================================

    const userChats = response.chatAI?.chats ?? [];

    // =================================================
    // STORE USER CHATS
    // =================================================

    yield put(setChatUser(userChats));

    // =================================================
    // GET CURRENT CHAT ID
    // =================================================

    const newChatId = String(response.chatId ?? response.chat._id);

    console.log("NEW / ACTIVE CHAT ID:", newChatId);

    // =================================================
    // STORE CURRENT CHAT ID
    // =================================================

    yield put(setActiveChatId(newChatId));

    // =================================================
    // FINISH
    // =================================================

    yield put(fetchClearLoading());
  } catch (error: unknown) {
    console.error("CREATE NEW CHAT ERROR:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Failed to create new chat";

    yield put(fetchError([errorMessage]));
  }
}

// =====================================================
// WATCHER
// =====================================================

export default function* watchAddNewChatSaga(): SagaIterator {
  yield takeLatest("ADD_CHAT_REQUEST", addNewChatSaga);
}
