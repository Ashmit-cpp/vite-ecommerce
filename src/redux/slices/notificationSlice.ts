// notificationSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NotificationState {
  notificationCount: number;
}

const initialState: NotificationState = {
  notificationCount: 0,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    incrementNotification: (state) => {
      state.notificationCount += 1;
    },
    decrementNotification: (state) => {
      if (state.notificationCount > 0) {
        state.notificationCount -= 1;
      }
    },
  },
});

export const { incrementNotification, decrementNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
