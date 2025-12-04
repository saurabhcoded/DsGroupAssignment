const request = require("supertest");
const express = require("express");
const authRouter = require("../routes/v1/authRouter");
const User = require("../models/User");

process.env.JWT_SECRET = "test_secret";
process.env.JWT_EXPIRATION = "1h";

const app = express();
app.use(express.json());
app.use("/api/v1/auth", authRouter);

describe("Auth API", () => {
  describe("POST /api/v1/auth/register", () => {
    it("should register a new user", async () => {
      const res = await request(app).post("/api/v1/auth/register").send({
        name: "Test User",
        email: "test@example.com",
        password: "password123",
      });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("token");
      expect(res.body.user).toHaveProperty("email", "test@example.com");
      expect(res.body.user).not.toHaveProperty("password");
    });

    it("should not register user with existing email", async () => {
      await User.create({
        name: "Existing User",
        email: "test@example.com",
        password: "password123",
      });

      const res = await request(app).post("/api/v1/auth/register").send({
        name: "Test User",
        email: "test@example.com",
        password: "password123",
      });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("message", "Email already registered");
    });

    it("should register user with admin role", async () => {
      const res = await request(app).post("/api/v1/auth/register").send({
        name: "Admin User",
        email: "admin@example.com",
        password: "password123",
        role: "admin",
      });

      expect(res.statusCode).toBe(201);
      expect(res.body.user).toHaveProperty("role", "admin");
    });
  });

  describe("POST /api/v1/auth/login", () => {
    beforeEach(async () => {
      await User.create({
        name: "Test User",
        email: "test@example.com",
        password: "password123",
      });
    });

    it("should login with valid credentials", async () => {
      const res = await request(app).post("/api/v1/auth/login").send({
        email: "test@example.com",
        password: "password123",
      });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("token");
      expect(res.body.user).toHaveProperty("email", "test@example.com");
    });

    it("should not login with wrong password", async () => {
      const res = await request(app).post("/api/v1/auth/login").send({
        email: "test@example.com",
        password: "wrongpassword",
      });

      expect(res.statusCode).toBe(401);
      expect(res.body).toHaveProperty("message", "Invalid credentials");
    });

    it("should not login with non-existent email", async () => {
      const res = await request(app).post("/api/v1/auth/login").send({
        email: "nonexistent@example.com",
        password: "password123",
      });

      expect(res.statusCode).toBe(401);
      expect(res.body).toHaveProperty("message", "Invalid credentials");
    });
  });

  describe("GET /api/v1/auth/profile", () => {
    it("should get profile with valid token", async () => {
      const registerRes = await request(app).post("/api/v1/auth/register").send({
        name: "Test User",
        email: "test@example.com",
        password: "password123",
      });

      const token = registerRes.body.token;

      const res = await request(app)
        .get("/api/v1/auth/profile")
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.user).toHaveProperty("email", "test@example.com");
    });

    it("should reject request without token", async () => {
      const res = await request(app).get("/api/v1/auth/profile");

      expect(res.statusCode).toBe(401);
      expect(res.body).toHaveProperty("message", "Access denied. No token provided");
    });

    it("should reject request with invalid token", async () => {
      const res = await request(app)
        .get("/api/v1/auth/profile")
        .set("Authorization", "Bearer invalidtoken");

      expect(res.statusCode).toBe(401);
      expect(res.body).toHaveProperty("message", "Invalid token");
    });
  });
});

