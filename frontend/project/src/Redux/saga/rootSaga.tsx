import { all } from "redux-saga/effects";
import RegisterUsersSaga from "./UserSaga/fetchRegisterUserSaga";
import LoginUsersSaga from "./UserSaga/fetchLoginUser";
import verificationSaga from "./UserSaga/fetchVerificatioCode";
import UsersSaga from "./UserSaga/fetchAllUser";

export default function* RootSaga() {
  yield all([
    UsersSaga(),

    RegisterUsersSaga(),
    LoginUsersSaga(),
    verificationSaga(),
  ]);
}
