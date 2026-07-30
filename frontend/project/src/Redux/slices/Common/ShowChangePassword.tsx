import { createSlice } from "@reduxjs/toolkit";

interface initialStateType {
  showPasswordSection: boolean;
}

const initialState: initialStateType = {
  showPasswordSection: false,
};

const ShowPasswordSection = createSlice({
  name: "ShowPasswordSection",
  initialState,
  reducers: {
    setShowPasswordSection: (state) => {
      state.showPasswordSection = true;
    },
    setHidePasswordSection: (state) => {
      state.showPasswordSection = false;
    },
  },
});

export const { setShowPasswordSection, setHidePasswordSection } =
  ShowPasswordSection.actions;

export default ShowPasswordSection.reducer;
