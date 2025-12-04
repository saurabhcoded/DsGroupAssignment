import { useEffect, useState } from "react";
import {
  Box, Typography, Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, IconButton, Chip, TextField, MenuItem, Button,
  CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions
} from "@mui/material";
import { Edit, Delete, Add } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchTasks, deleteTask, createTask, updateTask, setFilters } from "../../store/slices/taskSlice";
import { fetchUsers } from "../../store/slices/userSlice";

const Tasks = () => {
  const dispatch = useAppDispatch();
  const { tasks, loading, filters } = useAppSelector((state) => state.tasks);
  const { users } = useAppSelector((state) => state.users);
  const { user } = useAppSelector((state) => state.auth);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingTask, setEditingTask] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: "", description: "", status: "pending", priority: "medium", dueDate: "", assignee: ""
  });

  useEffect(() => {
    dispatch(fetchTasks(filters));
    if (user?.role === "admin") {
      dispatch(fetchUsers());
    }
  }, [dispatch, filters, user?.role]);

  const handleFilterChange = (key: string, value: string) => {
    dispatch(setFilters({ [key]: value }));
  };

  const handleOpenDialog = (task?: any) => {
    if (task) {
      setEditingTask(task);
      setFormData({
        title: task.title,
        description: task.description || "",
        status: task.status,
        priority: task.priority,
        dueDate: task.dueDate ? task.dueDate.split("T")[0] : "",
        assignee: task.assignee?._id || ""
      });
    } else {
      setEditingTask(null);
      setFormData({ title: "", description: "", status: "pending", priority: "medium", dueDate: "", assignee: "" });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingTask(null);
  };

  const handleSubmit = async () => {
    const submitData: any = { ...formData };
    if (!submitData.assignee || user?.role !== "admin") {
      delete submitData.assignee;
    }
    if (editingTask) {
      await dispatch(updateTask({ id: editingTask._id, data: submitData }));
    } else {
      await dispatch(createTask(submitData));
    }
    handleCloseDialog();
    dispatch(fetchTasks(filters));
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      await dispatch(deleteTask(id));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "success";
      case "in-progress": return "info";
      default: return "warning";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "error";
      case "medium": return "warning";
      default: return "success";
    }
  };

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" className="heading">Tasks</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={() => handleOpenDialog()}>
          Add Task
        </Button>
      </Box>

      <Box display="flex" gap={2} mb={3} flexWrap="wrap">
        <TextField
          size="small"
          placeholder="Search..."
          value={filters.search || ""}
          onChange={(e) => handleFilterChange("search", e.target.value)}
        />
        <TextField
          size="small"
          select
          label="Status"
          value={filters.status || ""}
          onChange={(e) => handleFilterChange("status", e.target.value)}
          sx={{ minWidth: 120 }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="in-progress">In Progress</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
        </TextField>
        <TextField
          size="small"
          select
          label="Priority"
          value={filters.priority || ""}
          onChange={(e) => handleFilterChange("priority", e.target.value)}
          sx={{ minWidth: 120 }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="low">Low</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="high">High</MenuItem>
        </TextField>
        <TextField
          size="small"
          select
          label="Sort By"
          value={filters.sortBy || ""}
          onChange={(e) => handleFilterChange("sortBy", e.target.value)}
          sx={{ minWidth: 120 }}
        >
          <MenuItem value="">Default</MenuItem>
          <MenuItem value="dueDate">Due Date</MenuItem>
          <MenuItem value="priority">Priority</MenuItem>
        </TextField>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" py={4}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Priority</TableCell>
                <TableCell>Due Date</TableCell>
                {user?.role === "admin" && <TableCell>Assignee</TableCell>}
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task._id}>
                  <TableCell>{task.title}</TableCell>
                  <TableCell>
                    <Chip size="small" label={task.status} color={getStatusColor(task.status)} />
                  </TableCell>
                  <TableCell>
                    <Chip size="small" label={task.priority} color={getPriorityColor(task.priority)} />
                  </TableCell>
                  <TableCell>
                    {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "-"}
                  </TableCell>
                  {user?.role === "admin" && <TableCell>{task.assignee?.name || "-"}</TableCell>}
                  <TableCell align="right">
                    <IconButton size="small" onClick={() => handleOpenDialog(task)}>
                      <Edit />
                    </IconButton>
                    <IconButton size="small" color="error" onClick={() => handleDelete(task._id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {tasks.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center">No tasks found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{editingTask ? "Edit Task" : "Create Task"}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            margin="normal"
            multiline
            rows={3}
          />
          <TextField
            fullWidth
            select
            label="Status"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            margin="normal"
          >
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="in-progress">In Progress</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
          </TextField>
          <TextField
            fullWidth
            select
            label="Priority"
            value={formData.priority}
            onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
            margin="normal"
          >
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </TextField>
          {user?.role === "admin" && (
            <TextField
              fullWidth
              select
              label="Assign To"
              value={formData.assignee}
              onChange={(e) => setFormData({ ...formData, assignee: e.target.value })}
              margin="normal"
            >
              <MenuItem value="">Self</MenuItem>
              {users.map((u) => (
                <MenuItem key={u._id} value={u._id}>{u.name} ({u.email})</MenuItem>
              ))}
            </TextField>
          )}
          <TextField
            fullWidth
            label="Due Date"
            type="date"
            value={formData.dueDate}
            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
            margin="normal"
            slotProps={{ inputLabel: { shrink: true } }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>{editingTask ? "Update" : "Create"}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Tasks;
