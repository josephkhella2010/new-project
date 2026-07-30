import { call, put, takeLatest } from "redux-saga/effects";
import type { SagaIterator } from "redux-saga";

import {
  fetchLoading,
  fetchClearLoading,
  fetchError,
} from "../../slices/loadAndErrorSlice/loadAndErrorSlice";

import apiRequest, { startTokenTimer } from "../../../utilities/functions";
import { setUser } from "../../slices/User/UserSlice";
import type { UsersType } from "../../../utilities/Interfaces";

interface LoginPayload {
  username: string;
  password: string;
}

interface LoginResponse {
  message: string[];
  user: UsersType;
  token: string | "";
}

const registerUser = async (data: LoginPayload): Promise<LoginResponse> => {
  return await apiRequest<LoginResponse>({
    endpoint: "/login-user",
    method: "POST",
    data,
  });
};

function* fetchLoginUsersSaga(action: {
  type: string;
  payload: LoginPayload;
}): SagaIterator {
  try {
    yield put(fetchLoading());

    const response: LoginResponse = yield call(registerUser, action.payload);
    yield put(
      setUser({
        user: response.user,
        token: response.token,
      }),
    );
    localStorage.setItem("user", JSON.stringify(response.user));
    localStorage.setItem("token", response.token);
    // start automatic logout
    startTokenTimer(response.token);

    console.log(response);

    yield put(fetchClearLoading());
  } catch (error: unknown) {
    let errorMessage = "Something went wrong";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    yield put(fetchError([errorMessage]));
  }
}

export default function* LoginUsersSaga(): SagaIterator {
  yield takeLatest("LOGIN_USERS_REQUEST", fetchLoginUsersSaga);
}
