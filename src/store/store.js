import { configureStore } from "@reduxjs/toolkit";
import { uiSlice } from "./ui/uiSlice";
import { calendarSlice } from './calendar/calendarSlice';
import { AuthSlice } from './auth/authSlice';

export const store = configureStore({
  reducer:{
    ui: uiSlice.reducer,
    calendar: calendarSlice.reducer,
    auth: AuthSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
})