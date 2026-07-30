import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../saga/rootSaga";
import UserSliceReducer from "../slices/User/UserSlice";
import LoadAndErrorSliceReducer from "../slices/loadAndErrorSlice/loadAndErrorSlice";
import ShowEmailSectionReducer from "../slices/Common/showEmailSection";
import ShowPasswordSectionReducer from "../slices/Common/ShowChangePassword";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    userSlice: UserSliceReducer,
    loadingSlice: LoadAndErrorSliceReducer,
    ShowEmailSectionSlice: ShowEmailSectionReducer,
    ShowPasswordSectionSlice: ShowPasswordSectionReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
