import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface initialStateType {
  isLoading: boolean;
  isSuccess: boolean;
  error: null | string[];
  codeSuccess: boolean;
  codeCorrect: boolean;
}

const initialState: initialStateType = {
  isLoading: false,
  isSuccess: false,
  error: null,
  codeSuccess: false,
  codeCorrect: false,
};

const LoadAndErrorSlice = createSlice({
  name: "UserSlice",
  initialState,
  reducers: {
    fetchLoading: (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.error = null;
    },
    fetchError: (state, action: PayloadAction<string[]>) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isSuccess = false;
    },
    fetchClearLoading: (state) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.error = null;
    },
    fetchCodeSuccess: (state) => {
      state.codeSuccess = true;
    },
    fetchStopCodeSuccess: (state) => {
      state.codeSuccess = false;
    },
    fetchCodeCorrect: (state) => {
      state.codeCorrect = true;
    },
    fetchStopCodeCorrect: (state) => {
      state.codeCorrect = false;
    },
  },
});

export const {
  fetchLoading,
  fetchError,
  fetchClearLoading,
  fetchCodeSuccess,
  fetchStopCodeSuccess,
  fetchCodeCorrect,
  fetchStopCodeCorrect,
} = LoadAndErrorSlice.actions;

export default LoadAndErrorSlice.reducer;
