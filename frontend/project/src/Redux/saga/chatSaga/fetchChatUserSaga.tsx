import { call, put, takeLatest } from "redux-saga/effects";

import type { SagaIterator } from "redux-saga";

import {
  fetchLoading,
  fetchClearLoading,
  fetchError,
} from "../../slices/loadAndErrorSlice/loadAndErrorSlice";

import apiRequest from "../../../utilities/functions";

import type { ChatAIType, ChatType } from "../../../utilities/Interfaces";

import { setChatUser } from "../../slices/chatSlice/ChatSlice";

// =====================================================
// RESPONSE
// =====================================================

interface ChatUserResponse {
  message: string[];

  chatAI: ChatAIType | null;
}

// =====================================================
// ACTION
// =====================================================

interface ChatUserRequestAction {
  type: string;
  payload: string; // logged-in userId
}

// =====================================================
// API
// =====================================================

const getUserChatsApi = async (userId: string): Promise<ChatUserResponse> => {
  const token = localStorage.getItem("token") ?? "";

  return await apiRequest<ChatUserResponse>({
    endpoint: `/chatsAi-user/${userId}`,
    method: "GET",
    token,
  });
};

// =====================================================
// SAGA
// =====================================================

function* fetchChatUserSaga(action: ChatUserRequestAction): SagaIterator {
  try {
    yield put(fetchLoading());

    const userId = action.payload;

    console.log("========== GET LOGGED USER CHATS ==========");

    console.log("USER ID:", userId);

    // -----------------------------------------------
    // API
    // -----------------------------------------------

    const response: ChatUserResponse = yield call(getUserChatsApi, userId);

    console.log("CHAT USER RESPONSE:", response);

    // -----------------------------------------------
    // NO CHATAI
    // -----------------------------------------------

    if (!response.chatAI) {
      console.log("No ChatAI found for user");

      yield put(setChatUser([]));

      yield put(fetchClearLoading());

      return;
    }

    // -----------------------------------------------
    // GET USER CHATS
    // -----------------------------------------------

    const userChats: ChatType[] = response.chatAI.chats ?? [];

    console.log("LOGGED USER CHATS:", userChats);

    // -----------------------------------------------
    // SAVE ONLY USER CHATS
    // -----------------------------------------------

    yield put(setChatUser(userChats));

    yield put(fetchClearLoading());
  } catch (error: unknown) {
    console.error("GET USER CHATS ERROR:", error);

    let errorMessage = "Failed to load user chats";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    yield put(fetchError([errorMessage]));
  }
}

// =====================================================
// WATCHER
// =====================================================

export default function* watchFetchChatUserSaga(): SagaIterator {
  yield takeLatest("CHAT-USER_REQUEST", fetchChatUserSaga);
}
