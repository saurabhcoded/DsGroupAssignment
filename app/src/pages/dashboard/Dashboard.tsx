import { useEffect } from "react";
import { Box, Typography, Grid, Paper, CircularProgress } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchDashboard } from "../../store/slices/taskSlice";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { tasks, loading } = useAppSelector((state) => state.tasks);
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchDashboard({}));
  }, [dispatch]);

  const stats = {
    total: tasks.length,
    pending: tasks.filter((t) => t.status === "pending").length,
    inProgress: tasks.filter((t) => t.status === "in-progress").length,
    completed: tasks.filter((t) => t.status === "completed").length,
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={{ xs: 2, sm: 3 }}>
      <Typography variant="h4" mb={3} className="heading" sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }}>
        Welcome, {user?.name}
      </Typography>

      <Grid container spacing={{ xs: 2, sm: 3 }} mb={4}>
        <Grid size={{ xs: 6, sm: 6, md: 3 }}>
          <Paper sx={{ p: { xs: 2, sm: 3 }, textAlign: "center" }}>
            <Typography variant="h3" color="primary" sx={{ fontSize: { xs: "1.75rem", sm: "2.5rem" } }}>
              {stats.total}
            </Typography>
            <Typography variant="body2">Total Tasks</Typography>
          </Paper>
        </Grid>
        <Grid size={{ xs: 6, sm: 6, md: 3 }}>
          <Paper sx={{ p: { xs: 2, sm: 3 }, textAlign: "center" }}>
            <Typography variant="h3" color="warning.main" sx={{ fontSize: { xs: "1.75rem", sm: "2.5rem" } }}>
              {stats.pending}
            </Typography>
            <Typography variant="body2">Pending</Typography>
          </Paper>
        </Grid>
        <Grid size={{ xs: 6, sm: 6, md: 3 }}>
          <Paper sx={{ p: { xs: 2, sm: 3 }, textAlign: "center" }}>
            <Typography variant="h3" color="info.main" sx={{ fontSize: { xs: "1.75rem", sm: "2.5rem" } }}>
              {stats.inProgress}
            </Typography>
            <Typography variant="body2">In Progress</Typography>
          </Paper>
        </Grid>
        <Grid size={{ xs: 6, sm: 6, md: 3 }}>
          <Paper sx={{ p: { xs: 2, sm: 3 }, textAlign: "center" }}>
            <Typography variant="h3" color="success.main" sx={{ fontSize: { xs: "1.75rem", sm: "2.5rem" } }}>
              {stats.completed}
            </Typography>
            <Typography variant="body2">Completed</Typography>
          </Paper>
        </Grid>
      </Grid>

      <Typography variant="h5" mb={2} className="heading" sx={{ fontSize: { xs: "1.25rem", sm: "1.5rem" } }}>
        Recent Tasks
      </Typography>

      {tasks.length === 0 ? (
        <Typography color="text.secondary">No tasks assigned yet.</Typography>
      ) : (
        <Grid container spacing={2}>
          {tasks.slice(0, 6).map((task) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={task._id}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" noWrap sx={{ fontSize: { xs: "1rem", sm: "1.1rem" } }}>
                  {task.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" noWrap>
                  {task.description}
                </Typography>
                <Box mt={1} display="flex" justifyContent="space-between">
                  <Typography
                    variant="caption"
                    color={
                      task.priority === "high" ? "error.main" :
                      task.priority === "medium" ? "warning.main" : "success.main"
                    }
                  >
                    {task.priority.toUpperCase()}
                  </Typography>
                  <Typography variant="caption">{task.status}</Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Dashboard;
