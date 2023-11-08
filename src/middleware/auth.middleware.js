import jwt from "jsonwebtoken";
import userModel from './../../db/models/user.model.js';
export const auth = async (accessRoles = []) => {
  return async (req, res, next) => {
    const { BEARAR_KEY, LOGIN_SECRET_KEY } = process.env;
    const { authorization } = req.headers;
    if (!authorization.startsWith(BEARAR_KEY)) {
      return res.status(400).json({ msg: "Invalid authorization" });
    }
    const token = authorization.split(BEARAR_KEY)[1];
    const decoded = jwt.verify(token, LOGIN_SECRET_KEY);
    if (!decoded) {
      return res.status(400).json({ msg: "Invalid authorization" });
    }
    const user = await userModel.findById(decoded.id)
    if (!accessRoles.includes(decoded.role)) {
      return res.status(403).json({ msg: "Not auth user" });
    }
    req.user = user;
    next();
  }
}