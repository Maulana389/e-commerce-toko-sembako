import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "./asyncHandler.js";

const authenticate = asyncHandler(async (req, res, next) => {
  let token;

  // Read JWT from the 'jwt' cookie
  token = req.cookies.jwt;
  if (token) {
    try {
      console.log("Token found:", token); // Debugging

      // Verify token using the secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded token:", decoded); // Debugging

      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      console.error("Token verification failed:", error); // Debugging
      res.status(401);
      throw new Error("Not authorized, token failed.");
    }
  } else {
    console.error("No token found"); // Debugging
    res.status(401);
    throw new Error("Not authorized, no token.");
  }
});

const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send("Not authorized as an admin.");
  }
};

export { authenticate, authorizeAdmin };
