import { Router } from "express";
const router = Router();

import { register, login, logout } from "../controllers/v1/authController.js";
import {
  validateLoginInput,
  validateRegisterInput,
} from "../middleware/validationMiddleware.js";

import { authenticateUser } from "../middleware/authenticateMiddleware.js";

import rateLimiter from "express-rate-limit";

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: "Too many requests from this IP, please try again after 15 minutes",
});

router.post("/register", apiLimiter, validateRegisterInput, register);
router.post("/login", apiLimiter, validateLoginInput, login);
router.get("/logout", apiLimiter, authenticateUser, logout);

export default router;
