import { call, put, takeLatest } from "redux-saga/effects";
import type { SagaIterator } from "redux-saga";
import type { PayloadAction } from "@reduxjs/toolkit";

import apiRequest from "../../../utilities/functions";

import {
  fetchLoading,
  fetchClearLoading,
  fetchError,
  fetchCodeSuccess,
  fetchCodeCorrect,
} from "../../slices/loadAndErrorSlice/loadAndErrorSlice";

import {
  setVerificationCode,
  clearVerification,
} from "../../slices/User/UserSlice";

// ===============================
// Forgot Password
// ===============================

export interface ForgotPasswordPayload {
  email: string;
}

export interface ForgotPasswordResponse {
  message: string;
  resetToken: string;
  code: number;
  expire: string;
}

// ===============================
// Check Code
// ===============================

export interface CheckCodePayload {
  resetToken: string;
  code: number;
}

export interface CheckCodeResponse {
  message: string;
  resetToken: string;
}

// ===============================
// Resend Code
// ===============================

export interface ResendCodePayload {
  resetToken: string;
}

export interface ResendCodeResponse {
  message: string;
  code: number;
  expire: string;
}

// ===============================
// Change Password
// ===============================

export interface ChangePasswordPayload {
  resetToken: string;
  password: string;
}

export interface ChangePasswordResponse {
  message: string;
}

// ===============================
// API REQUESTS
// ===============================

const forgotPasswordRequest = (
  data: ForgotPasswordPayload,
): Promise<ForgotPasswordResponse> => {
  return apiRequest({
    endpoint: "/forgot-password",
    method: "POST",
    data,
  });
};

const checkCodeRequest = (
  data: CheckCodePayload,
): Promise<CheckCodeResponse> => {
  return apiRequest({
    endpoint: "/check-code",
    method: "POST",
    data,
  });
};

const resendCodeRequest = (
  data: ResendCodePayload,
): Promise<ResendCodeResponse> => {
  return apiRequest({
    endpoint: "/resend-code",
    method: "POST",
    data,
  });
};

const changePasswordRequest = (
  data: ChangePasswordPayload,
): Promise<ChangePasswordResponse> => {
  return apiRequest({
    endpoint: "/change-password",
    method: "POST",
    data,
  });
};

// ===============================
// FORGOT PASSWORD SAGA
// ===============================

function* forgotPasswordSaga(
  action: PayloadAction<ForgotPasswordPayload>,
): SagaIterator {
  try {
    yield put(fetchLoading());

    const response: ForgotPasswordResponse = yield call(
      forgotPasswordRequest,
      action.payload,
    );

    yield put(
      setVerificationCode({
        resetToken: response.resetToken,
        verificationCode: response.code,
        codeExpire: response.expire,
      }),
    );

    yield put(fetchClearLoading());
    yield put(fetchCodeSuccess());
  } catch (error: unknown) {
    let errorMessage = "Something went wrong";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    yield put(fetchError([errorMessage]));
  }
}

// ===============================
// CHECK CODE SAGA
// ===============================

function* checkCodeSaga(action: PayloadAction<CheckCodePayload>): SagaIterator {
  try {
    yield put(fetchLoading());

    const response: CheckCodeResponse = yield call(
      checkCodeRequest,
      action.payload,
    );

    console.log("SUCCESS RESPONSE:", response);

    yield put(fetchClearLoading());
    yield put(fetchCodeCorrect())
  } catch (error: unknown) {
    console.log("ERROR FROM API:", error);

    let errorMessage = "Something went wrong";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    console.log("ERROR MESSAGE:", errorMessage);

    yield put(fetchError([errorMessage]));
  }
}
// ===============================
// RESEND CODE SAGA
// ===============================

function* resendCodeSaga(
  action: PayloadAction<ResendCodePayload>,
): SagaIterator {
  try {
    yield put(fetchLoading());

    const response: ResendCodeResponse = yield call(
      resendCodeRequest,
      action.payload,
    );

    yield put(
      setVerificationCode({
        resetToken: action.payload.resetToken,
        verificationCode: response.code,
        codeExpire: response.expire,
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

// ===============================
// CHANGE PASSWORD SAGA
// ===============================
function* changePasswordSaga(
  action: PayloadAction<ChangePasswordPayload>,
): SagaIterator {
  try {
    yield put(fetchLoading());

    yield call(changePasswordRequest, action.payload);

    yield put(
      clearVerification({
        resetToken: action.payload.resetToken,
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

// ===============================
// ROOT SAGA
// ===============================

export default function* verificationSaga(): SagaIterator {
  yield takeLatest("FORGOT_PASSWORD_REQUEST", forgotPasswordSaga);

  yield takeLatest("CHECK_CODE_REQUEST", checkCodeSaga);

  yield takeLatest("RESEND_CODE_REQUEST", resendCodeSaga);

  yield takeLatest("CHANGE_PASSWORD_REQUEST", changePasswordSaga);
}
