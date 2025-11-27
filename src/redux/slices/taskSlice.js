import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "@/baseurl";
import { toast } from "react-toastify";

const initialState = {
  tasks: [],
  task: null,
  stats: null,
  pending: false,
  error: null,
  totalPages: 0,
  total: 0,
  page: 1,
};

export const createTask = createAsyncThunk(
  "task/createTask",
  async ({ body, token }, thunkAPI) => {
    try {
      const res = await axios.post(`${baseUrl}/tasks/create`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || "Error");
    }
  }
);

export const getAllTasks = createAsyncThunk(
  "task/getAllTasks",
  async ({ query, token }, thunkAPI) => {
    try {
      const res = await axios.get(`${baseUrl}/tasks/getAll`, {
        params: query,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || "Error");
    }
  }
);

export const getTaskById = createAsyncThunk(
  "task/getTaskById",
  async ({ id, token }, thunkAPI) => {
    try {
      const res = await axios.get(`${baseUrl}/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || "Error");
    }
  }
);

export const updateTask = createAsyncThunk(
  "task/updateTask",
  async ({ id, body, token }, thunkAPI) => {
    console.log(id, body, token, "id, body, token dfigojdfkgdgd");
    try {
      const res = await axios.patch(`${baseUrl}/tasks/update/${id}`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || "Error");
    }
  }
);

export const deleteTask = createAsyncThunk(
  "task/deleteTask",
  async ({ id, token }, thunkAPI) => {
    try {
      const res = await axios.delete(`${baseUrl}/tasks/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || "Error");
    }
  }
);

export const getTaskStats = createAsyncThunk(
  "task/getTaskStats",
  async (token, thunkAPI) => {
    try {
      const res = await axios.get(`${baseUrl}/tasks/stats`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || "Error");
    }
  }
);

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(createTask.pending, (s) => {
        s.pending = true;
      })
      .addCase(createTask.fulfilled, (s, a) => {
        s.pending = false;
        s.tasks.push(a.payload.data);
      })
      .addCase(createTask.rejected, (s, a) => {
        s.pending = false;
        s.error = a.payload;
      })

      .addCase(getAllTasks.pending, (s) => {
        s.pending = true;
      })
      .addCase(getAllTasks.fulfilled, (s, a) => {
        s.pending = false;
        s.tasks = a.payload.data;
        s.total = a.payload.total;
        s.page = a.payload.page;
        s.totalPages = a.payload.totalPages;
      })
      .addCase(getAllTasks.rejected, (s, a) => {
        s.pending = false;
        s.error = a.payload;
      })

      .addCase(getTaskById.fulfilled, (s, a) => {
        s.task = a.payload;
      })

      .addCase(updateTask.fulfilled, (s, a) => {
        s.tasks = s.tasks.map((t) => (t._id === a.payload._id ? a.payload : t));
      })

      .addCase(deleteTask.fulfilled, (s, a) => {
        s.tasks = s.tasks.filter((t) => t._id !== a.payload);
      })

      .addCase(getTaskStats.fulfilled, (s, a) => {
        s.stats = a.payload;
      });
  },
});

export default taskSlice.reducer;
