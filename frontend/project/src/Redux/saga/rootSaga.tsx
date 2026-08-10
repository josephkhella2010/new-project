import { all } from "redux-saga/effects";
import RegisterUsersSaga from "./UserSaga/fetchRegisterUserSaga";
import LoginUsersSaga from "./UserSaga/fetchLoginUser";
import verificationSaga from "./UserSaga/fetchVerificatioCode";
import UsersSaga from "./UserSaga/fetchAllUser";
import DeleteUserSaga from "./UserSaga/fetchDeleteUser";
import UpdateUserSaga from "./UserSaga/fetchUpdateUser";
import watchFetchChatAiSaga from "./chatSaga/fetchAllChatsSaga";
import watchFetchChatUserSaga from "./chatSaga/fetchChatUserSaga";
import watchAddNewChatSaga from "./chatSaga/fetchNewChatToUser";
import watchAddMessageToChatSaga from "./chatSaga/fetchAddMessageToChatSaga";
import watchDeleteMessageSaga from "./chatSaga/fetchDeleteMessage";
import watchDeleteChatSaga from "./chatSaga/fetchDeleteChat";

export default function* RootSaga() {
  yield all([
    UsersSaga(),
    RegisterUsersSaga(),
    LoginUsersSaga(),
    verificationSaga(),
    DeleteUserSaga(),
    UpdateUserSaga(),
    watchFetchChatAiSaga(),
    watchFetchChatUserSaga(),
    watchAddNewChatSaga(),
    watchAddMessageToChatSaga(),
    watchDeleteMessageSaga(),
    watchDeleteChatSaga(),

  ]);
}
