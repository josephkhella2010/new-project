import { call, put, takeLatest } from "redux-saga/effects";

import type { SagaIterator } from "redux-saga";

import apiRequest from "../../../utilities/functions";

import {
  fetchLoading,
  fetchClearLoading,
  fetchError,
} from "../../slices/loadAndErrorSlice/loadAndErrorSlice";

import { setChatsAI } from "../../slices/chatSlice/ChatSlice";

import type { ChatAIType } from "../../../utilities/Interfaces";

// =====================================================
// RESPONSE
// =====================================================

interface GetAllChatsResponse {
  message: string[];
  chatsAI: ChatAIType[];
}

// =====================================================
// API
// =====================================================

const getAllChatsApi = async (): Promise<GetAllChatsResponse> => {
  return await apiRequest<GetAllChatsResponse>({
    endpoint: "/chatsAi",
    method: "GET",
  });
};

// =====================================================
// SAGA
// =====================================================

function* fetchChatAiSaga(): SagaIterator {
  try {
    yield put(fetchLoading());

    const response: GetAllChatsResponse = yield call(getAllChatsApi);

    console.log("GET ALL CHATS AI:", response);

    yield put(setChatsAI(response.chatsAI ?? []));

    yield put(fetchClearLoading());
  } catch (error: unknown) {
    console.error("GET CHATS AI ERROR:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Failed to get chats AI";

    yield put(fetchError([errorMessage]));
  }
}

// =====================================================
// WATCHER
// =====================================================

export default function* watchFetchChatAiSaga(): SagaIterator {
  yield takeLatest("GET_CHATS_REQUEST", fetchChatAiSaga);
}
