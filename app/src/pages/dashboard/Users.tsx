import { useEffect, useState } from "react";
import {
  Box, Typography, Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, IconButton, Chip, Button, CircularProgress,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem
} from "@mui/material";
import { Edit, Delete, Add } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchUsers, createUser, updateUser, deleteUser } from "../../store/slices/userSlice";

const Users = () => {
  const dispatch = useAppDispatch();
  const { users, loading } = useAppSelector((state) => state.users);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "", email: "", password: "", role: "user"
  });

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleOpenDialog = (user?: any) => {
    if (user) {
      setEditingUser(user);
      setFormData({
        name: user.name,
        email: user.email,
        password: "",
        role: user.role
      });
    } else {
      setEditingUser(null);
      setFormData({ name: "", email: "", password: "", role: "user" });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingUser(null);
  };

  const handleSubmit = async () => {
    if (editingUser) {
      const updateData: any = { name: formData.name, email: formData.email, role: formData.role };
      await dispatch(updateUser({ id: editingUser._id, data: updateData }));
    } else {
      await dispatch(createUser(formData));
    }
    handleCloseDialog();
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await dispatch(deleteUser(id));
    }
  };

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" className="heading">Manage Users</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={() => handleOpenDialog()}>
          Add User
        </Button>
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
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Created</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Chip
                      size="small"
                      label={user.role}
                      color={user.role === "admin" ? "primary" : "default"}
                    />
                  </TableCell>
                  <TableCell>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton size="small" onClick={() => handleOpenDialog(user)}>
                      <Edit />
                    </IconButton>
                    <IconButton size="small" color="error" onClick={() => handleDelete(user._id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {users.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} align="center">No users found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{editingUser ? "Edit User" : "Create User"}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            margin="normal"
            required
          />
          {!editingUser && (
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              margin="normal"
              required
            />
          )}
          <TextField
            fullWidth
            select
            label="Role"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            margin="normal"
          >
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            {editingUser ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Users;

