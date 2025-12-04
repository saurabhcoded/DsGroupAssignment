import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

interface User {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  createdAt: string;
}

interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/users");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch users");
    }
  }
);

export const createUser = createAsyncThunk(
  "users/createUser",
  async (data: { name: string; email: string; password: string; role: string }, { rejectWithValue }) => {
    try {
      const response = await api.post("/users", data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to create user");
    }
  }
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ id, data }: { id: string; data: Partial<User> }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/users/${id}`, data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to update user");
    }
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id: string, { rejectWithValue }) => {
    try {
      await api.delete(`/users/${id}`);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete user");
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.users.unshift(action.payload.user);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex((u) => u._id === action.payload.user._id);
        if (index !== -1) {
          state.users[index] = action.payload.user;
        }
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((u) => u._id !== action.payload);
      });
  },
});

export const { clearError } = userSlice.actions;
export default userSlice.reducer;

