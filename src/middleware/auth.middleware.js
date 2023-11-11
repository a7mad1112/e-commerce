import jwt from "jsonwebtoken";
import userModel from './../../db/models/user.model.js';

export const auth = (accessRoles = []) => {
  return async (req, res, next) => {
    try {
      const { BEARAR_KEY, LOGIN_SECRET_KEY } = process.env;
      const { authorization } = req.headers;

      if (!authorization || !authorization.startsWith(BEARAR_KEY)) {
        return res.status(400).json({ msg: "Invalid or missing authorization header" });
      }

      const token = authorization.split(BEARAR_KEY)[1];
      if (!token) {
        return res.status(400).json({ msg: "Invalid token" });
      }

      const decoded = jwt.verify(token, LOGIN_SECRET_KEY);
      if (!decoded) {
        return res.status(400).json({ msg: "Invalid authorization token" });
      }

      const user = await userModel.findById(decoded.id);
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }

      if (!accessRoles.includes(decoded.role)) {
        return res.status(403).json({ msg: "Not authorized to access this resource" });
      }

      req.user = user;
      next();
    } catch (error) {
      console.error("Authentication error:", error);
      return res.status(500).json({ msg: "Internal server error during authentication" });
    }
  };
};
