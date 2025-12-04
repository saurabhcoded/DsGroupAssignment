import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { login, clearError } from "../../store/slices/authSlice";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: LoginFormData) => {
    const result = await dispatch(login(data));
    if (login.fulfilled.match(result)) {
      navigate("/dashboard");
    }
  };

  return (
    <Box
      sx={{ width: "100%", maxWidth: 400 }}
    >
      <Typography variant="h4" mb={3} className="heading">
        Sign In
      </Typography>

      {error && (
        <Alert
          severity="error"
          onClose={() => dispatch(clearError())}
          sx={{ mb: 2 }}
        >
          {error}
        </Alert>
      )}

      <TextField
        fullWidth
        label="Email"
        type="email"
        margin="normal"
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email?.message}
      />

      <TextField
        fullWidth
        label="Password"
        type="password"
        margin="normal"
        {...register("password")}
        error={!!errors.password}
        helperText={errors.password?.message}
      />

      <Button
        fullWidth
        variant="contained"
        disabled={loading || !isValid}
        sx={{ mt: 3, mb: 2 }}
        onClick={handleSubmit(onSubmit)}
      >
        {loading ? <CircularProgress size={24} /> : "Sign In"}
      </Button>

      <Typography variant="body2" align="center">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </Typography>
    </Box>
  );
};

export default Login;
