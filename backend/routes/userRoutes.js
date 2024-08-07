import express from "express";
import {
  createUser,
  loginUser,
  logoutCurrentUser,
  getAllUsers,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  deleteUserById,
  getUserById,
  updateUserById,
} from "../controllers/userController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public routes
router.post("/", createUser);
router.post("/auth", loginUser);
router.post("/logout", logoutCurrentUser);

// Protected routes
router.use(authenticate);

router
  .route("/profile")
  .get(getCurrentUserProfile)
  .put(updateCurrentUserProfile);

// Admin routes
router.use(authorizeAdmin);

router
  .route("/")
  .get(getAllUsers);

router
  .route("/:id")
  .delete(deleteUserById)
  .get(getUserById)
  .put(updateUserById);

export default router;
