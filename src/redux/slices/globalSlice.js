import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  userInfo: null,
};

const GlobalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setGlobalData: (state, action) => {
      state.token = action.payload;
      state.userInfo = action.payload;
    },
  },
});

export const { setGlobalData } = GlobalSlice.actions;
export default GlobalSlice.reducer;
