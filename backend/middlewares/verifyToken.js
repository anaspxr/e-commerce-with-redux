import jwt from "jsonwebtoken";
import CustomError from "../utils/CustomError.js";

export const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.token;
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      jwt.verify(token, process.env.JWT_SEC, (err, user) => {
        if (err) throw new CustomError("Token is not valid", 403);
        else {
          req.user = user;
          next();
        }
      });
    } else {
      throw new CustomError("You are not authenticated", 403);
    }
  } catch (error) {
    throw new CustomError(
      error.message || "Failed to verify authentication",
      500
    );
  }
};

export const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      throw new CustomError("You are not authorized", 403);
    }
  });
};
