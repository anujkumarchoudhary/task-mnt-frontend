import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import taskReducer from "./slices/taskSlice";

import globalReducer from "./slices/globalSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    task: taskReducer,
    global: globalReducer,
  },
});
