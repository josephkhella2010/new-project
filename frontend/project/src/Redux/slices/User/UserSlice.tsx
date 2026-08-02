import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UsersType } from "../../../utilities/Interfaces";
interface initialStateType {
  users: UsersType[];
  user: UsersType | null;
  token: string | "";
  resetToken: string | null;
  verificationCode: number | null;
  codeExpire: string | null;
}
const userStorage = localStorage.getItem("user");
const parsedUserStorage = userStorage ? JSON.parse(userStorage) : "";

const initialState: initialStateType = {
  users: [],
  user: parsedUserStorage,
  token: localStorage.getItem("token") ?? "",
  resetToken: localStorage.getItem("id") ?? "",
  verificationCode: null,
  codeExpire: null,
};

const UserSlice = createSlice({
  name: "UserSlice",
  initialState,
  reducers: {
    getUsers: (state, action: PayloadAction<UsersType[]>) => {
      state.users = action.payload;
    },
    addUsers: (state, action: PayloadAction<UsersType>) => {
      state.users.push(action.payload);
    },
    setUser: (
      state,
      action: PayloadAction<{ user: UsersType; token: string | "" }>,
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogOut: (state) => {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      state.user = null;
      state.token = "";
    },
    setVerificationCode: (
      state,
      action: PayloadAction<{
        resetToken: string;
        verificationCode: number | null;
        codeExpire: string | null;
      }>,
    ) => {
      state.resetToken = action.payload.resetToken;
      state.verificationCode = action.payload.verificationCode;
      state.codeExpire = action.payload.codeExpire;
      localStorage.setItem("id", action.payload.resetToken);
      // update user inside users array
      const user = state.users.find((u) => u._id === action.payload.resetToken);

      // update user object if exists
      if (user) {
        user.verificationCode = action.payload.verificationCode;
        user.codeExpire = action.payload.codeExpire;
      }
    },

    clearVerification: (
      state,
      action: PayloadAction<{
        resetToken: string;
      }>,
    ) => {
      state.resetToken = null;
      state.verificationCode = null;
      state.codeExpire = null;
      localStorage.remove("id");

      // clear user reset data
      const user = state.users.find((u) => u._id === action.payload.resetToken);

      // update user object if exists
      if (user) {
        user.verificationCode = null;
        user.codeExpire = null;
      }
    },
    deleteUser: (state, action: PayloadAction<{ userId: string }>) => {
      state.users = state.users.filter(
        (u) => String(u._id) !== String(action.payload.userId),
      );
    },
    updateUser: (
      state,
      action: PayloadAction<{ userId: string; user: Partial<UsersType> }>,
    ) => {
      const { userId, user } = action.payload;
      const userIndex = state.users.findIndex((u) => u._id === userId);
      if (userIndex !== -1) {
        const updatedUser = {
          ...state.users[userIndex],
          ...user,
        };

        state.users[userIndex] = updatedUser as UsersType;
        state.user = updatedUser as UsersType;
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }
    },
  },
});

export const {
  getUsers,
  addUsers,
  setUser,
  setLogOut,
  setVerificationCode,
  clearVerification,
  deleteUser,
  updateUser,
} = UserSlice.actions;

export default UserSlice.reducer;
