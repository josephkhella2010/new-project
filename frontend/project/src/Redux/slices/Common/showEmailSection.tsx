import { createSlice } from "@reduxjs/toolkit";

interface initialStateType {
  showEmailSection: boolean;
}

const initialState: initialStateType = {
  showEmailSection: false,
};

const ShowEmailSection = createSlice({
  name: "ShowEmailSection",
  initialState,
  reducers: {
    setShowEmailSection: (state) => {
      state.showEmailSection = true;
    },
    setHideEmailSection: (state) => {
      state.showEmailSection = false;
    },
  },
});

export const { setShowEmailSection, setHideEmailSection } =
  ShowEmailSection.actions;

export default ShowEmailSection.reducer;
