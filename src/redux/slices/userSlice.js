import { baseUrl } from "@/baseurl";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  userInfo: null,
  token: null,
  pending: false,
  error: null,
};

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (body, thunkAPI) => {
    try {
      const res = await axios.post(`${baseUrl}/users/create`, body, {
        headers: { "Content-Type": "application/json" },
      });

      return res;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Something went wrong"
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (body, thunkAPI) => {
    try {
      const res = await axios.post(`${baseUrl}/users/login`, body, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return res.data;
    } catch (err) {
      console.log("err", err);
      return thunkAPI.rejectWithValue(err.res.data || "error");
    }
  }
);

export const getAllUsers = createAsyncThunk(
  "user/getAllUsers",
  async (token, thunkAPI) => {
    try {
      const res = await axios.get(`${baseUrl}/users/getAll`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return res;
    } catch (err) {
      console.log("err", err);
      return thunkAPI.rejectWithValue(err.res.data || "error");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userInfo = action.payload.user;
      state.token = action.payload.token;
    },
    clearUser: (state) => {
      state.userInfo = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state, action) => {
        (state.pending = true), (state.error = null);
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.pending = false;
        state.userInfo = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        (state.pending = false), (state.error = action.payload);
      })
      .addCase(loginUser.pending, (state, action) => {
        (state.pending = true), (state.error = null);
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.pending = false;
        state.userInfo = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        (state.pending = false), (state.error = action.payload);
      });
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
