import { call, put, takeLatest } from "redux-saga/effects";
import type { SagaIterator } from "redux-saga";

import {
  fetchLoading,
  fetchClearLoading,
  fetchError,
} from "../../slices/loadAndErrorSlice/loadAndErrorSlice";

import apiRequest from "../../../utilities/functions";
import { addUsers } from "../../slices/User/UserSlice";
import type { UsersType } from "../../../utilities/Interfaces";

interface RegisterResponse {
  message: string[];
  user: UsersType;
}

const registerUser = async (data: UsersType): Promise<RegisterResponse> => {
  return await apiRequest<RegisterResponse>({
    endpoint: "/register-user",
    method: "POST",
    data,
  });
};

function* fetchRegisterUsersSaga(action: {
  type: string;
  payload: UsersType;
}): SagaIterator {
  try {
    yield put(fetchLoading());

    const response: RegisterResponse = yield call(registerUser, action.payload);
    yield put(
      addUsers({
        _id: response.user._id,
        ...action.payload,
      }),
    );
    console.log(response);

    yield put(fetchClearLoading());

    // success action here if needed
    // yield put(registerSuccess(response));
  } catch (error: unknown) {
    let errorMessage = "Something went wrong";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    yield put(fetchError([errorMessage]));
  }
}

export default function* RegisterUsersSaga(): SagaIterator {
  yield takeLatest("REGISTER_USERS_REQUEST", fetchRegisterUsersSaga);
}
