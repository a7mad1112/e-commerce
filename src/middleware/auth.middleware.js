import jwt from "jsonwebtoken";
export const auth = () => {
  return (req, res, next) => {
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
    if(decoded.role === "User"){
      return res.status(403).json("Not auth user");
    }
    next();
  }
}