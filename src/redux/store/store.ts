// store.ts

import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "@/redux/slices/notificationSlice";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
