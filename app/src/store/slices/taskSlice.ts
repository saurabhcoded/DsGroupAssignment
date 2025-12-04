import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

interface Task {
  _id: string;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
  priority: "low" | "medium" | "high";
  assignee: { _id: string; name: string; email: string };
  createdBy: { _id: string; name: string; email: string };
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}

interface TaskFilters {
  status?: string;
  priority?: string;
  search?: string;
  sortBy?: string;
  order?: string;
}

interface TaskState {
  tasks: Task[];
  currentTask: Task | null;
  loading: boolean;
  error: string | null;
  filters: TaskFilters;
}

const initialState: TaskState = {
  tasks: [],
  currentTask: null,
  loading: false,
  error: null,
  filters: {},
};

export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (filters: TaskFilters = {}, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
      const response = await api.get(`/tasks?${params.toString()}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch tasks");
    }
  }
);

export const fetchTaskById = createAsyncThunk(
  "tasks/fetchTaskById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/tasks/${id}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch task");
    }
  }
);

export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (data: Partial<Task>, { rejectWithValue }) => {
    try {
      const response = await api.post("/tasks", data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to create task");
    }
  }
);

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ id, data }: { id: string; data: Partial<Task> }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/tasks/${id}`, data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to update task");
    }
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (id: string, { rejectWithValue }) => {
    try {
      await api.delete(`/tasks/${id}`);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete task");
    }
  }
);

export const fetchDashboard = createAsyncThunk(
  "tasks/fetchDashboard",
  async (filters: TaskFilters = {}, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
      const response = await api.get(`/dashboard?${params.toString()}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch dashboard");
    }
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {};
    },
    clearCurrentTask: (state) => {
      state.currentTask = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload.tasks;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchTaskById.fulfilled, (state, action) => {
        state.currentTask = action.payload.task;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.unshift(action.payload.task);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex((t) => t._id === action.payload.task._id);
        if (index !== -1) {
          state.tasks[index] = action.payload.task;
        }
        state.currentTask = action.payload.task;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((t) => t._id !== action.payload);
      })
      .addCase(fetchDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload.tasks;
      })
      .addCase(fetchDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setFilters, clearFilters, clearCurrentTask, clearError } = taskSlice.actions;
export default taskSlice.reducer;

