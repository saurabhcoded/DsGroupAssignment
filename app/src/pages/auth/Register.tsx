import { Link, useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography, Alert, CircularProgress } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { register as registerUser, clearError } from "../../store/slices/authSlice";

const registerSchema = z.object({
  name: z.string().min(1, "Name is required").min(2, "Name must be at least 2 characters"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type RegisterFormData = z.infer<typeof registerSchema>;

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    const result = await dispatch(registerUser(data));
    if (registerUser.fulfilled.match(result)) {
      navigate("/dashboard");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: "100%", maxWidth: 400 }}>
      <Typography variant="h4" mb={3} className="heading">
        Create Account
      </Typography>

      {error && (
        <Alert severity="error" onClose={() => dispatch(clearError())} sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TextField
        fullWidth
        label="Full Name"
        margin="normal"
        {...register("name")}
        error={!!errors.name}
        helperText={errors.name?.message}
      />

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
        type="submit"
        fullWidth
        variant="contained"
        disabled={loading}
        sx={{ mt: 3, mb: 2 }}
      >
        {loading ? <CircularProgress size={24} /> : "Sign Up"}
      </Button>

      <Typography variant="body2" align="center">
        Already have an account? <Link to="/login">Sign In</Link>
      </Typography>
    </Box>
  );
};

export default Register;
