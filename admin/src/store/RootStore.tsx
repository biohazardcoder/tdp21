import { configureStore } from "@reduxjs/toolkit";
import UserSlicer from "../toolkit/UserSlicer";
import AdminsSlicerSlicer from "../toolkit/AdminsSlicer";

export const store = configureStore({
  reducer: {
    user: UserSlicer,
    admins: AdminsSlicerSlicer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
