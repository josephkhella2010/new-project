import { call, put, takeLatest } from "redux-saga/effects";
import type { SagaIterator } from "redux-saga";

import {
  fetchLoading,
  fetchClearLoading,
  fetchError,
} from "../../slices/loadAndErrorSlice/loadAndErrorSlice";

import apiRequest from "../../../utilities/functions";
import { getUsers } from "../../slices/User/UserSlice";
import type { UsersType } from "../../../utilities/Interfaces";

// ===============================
// Response
// ===============================

interface UsersResponse {
  message: string;
  users: UsersType[];
}

// ===============================
// API
// ===============================

const fetchUsersRequest = async (): Promise<UsersResponse> => {
  return await apiRequest<UsersResponse>({
    endpoint: "/users",
    method: "GET",
  });
};

// ===============================
// Saga
// ===============================

function* fetchUsersSaga(): SagaIterator {
  try {
    yield put(fetchLoading());

    const response: UsersResponse = yield call(fetchUsersRequest);

    yield put(getUsers(response.users));

    yield put(fetchClearLoading());
  } catch (error: unknown) {
    let errorMessage = "Something went wrong";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    yield put(fetchError([errorMessage]));
  }
}

// ===============================
// Root Saga
// ===============================

export default function* UsersSaga(): SagaIterator {
  yield takeLatest("USERS_REQUEST", fetchUsersSaga);
}
