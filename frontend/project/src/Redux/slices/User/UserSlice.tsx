import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState = { users: [] };

const UserSlice = createSlice({
  name: "UserSlice",
  initialState,
  reducers: {
    getUsers: (state, actions: PayloadAction<[]>) => {
      state.users = actions.payload;
    },
  },
});

export const { getUsers } = UserSlice.actions;

export default UserSlice.reducer;
