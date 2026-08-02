import { call, put, takeLatest } from "redux-saga/effects";
import type { SagaIterator } from "redux-saga";

import {
  fetchLoading,
  fetchClearLoading,
  fetchError,
} from "../../slices/loadAndErrorSlice/loadAndErrorSlice";

import apiRequest from "../../../utilities/functions";
import { updateUser } from "../../slices/User/UserSlice";
import type { UsersType } from "../../../utilities/Interfaces";

interface UpdateUserPayload {
  userId: string;
  user: Partial<UsersType>;
}

interface Action {
  type: string;
  payload: UpdateUserPayload;
}

const ApiUrl = async (userId: string, user: Partial<UsersType>) => {
  const token = localStorage.getItem("token") ?? "";

  const response = await apiRequest({
    endpoint: `/update-user/${userId}`,
    method: "PUT",
    token,
    data: user,
  });

  return response;
};

function* fetchUpdateUser(action: Action): SagaIterator {
  try {
    yield put(fetchLoading());

    const { userId, user } = action.payload;

    const response = yield call(ApiUrl, userId, user);

    yield put(
      updateUser({
        userId,
        user: response.user || response.data || user,
      }),
    );

    yield put(fetchClearLoading());
  } catch (error: unknown) {
    let errorMessage = "Something went wrong";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    yield put(fetchError([errorMessage]));
  }
}

export default function* UpdateUserSaga(): SagaIterator {
  yield takeLatest("UPDATE_USER_REQUEST", fetchUpdateUser);
}
