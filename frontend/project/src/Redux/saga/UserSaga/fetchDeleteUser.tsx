import { call, put, takeLatest } from "redux-saga/effects";
import type { SagaIterator } from "redux-saga";

import {
  fetchLoading,
  fetchClearLoading,
  fetchError,
} from "../../slices/loadAndErrorSlice/loadAndErrorSlice";

import apiRequest from "../../../utilities/functions";
import { deleteUser } from "../../slices/User/UserSlice";

interface ActionPayload {
  userId: string;
}

const ApiUrl = async (userId: string) => {
  const token = localStorage.getItem("token") ?? "";
  console.log("token", token);

  await apiRequest({
    endpoint: `/delete-user/${userId}`,
    method: "DELETE",
    token,
  });
};

function* fetchDeleteUser(action: {
  type: string;
  payload: ActionPayload;
}): SagaIterator {
  try {
    yield put(fetchLoading());

    yield call(ApiUrl, action.payload.userId);

    yield put(
      deleteUser({
        userId: action.payload.userId,
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

export default function* DeleteUserSaga(): SagaIterator {
  yield takeLatest("DELETE_USER_REQUEST", fetchDeleteUser);
}
