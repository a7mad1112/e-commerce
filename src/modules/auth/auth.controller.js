import userModel from "../../../db/models/user.model.js";
import bcrypt from 'bcryptjs';
import cloudinary from './../../services/cloudinary.js';
import jwt from "jsonwebtoken";
import { sendEmail } from "../../services/email.js";
export const signup = async (req, res) => {
  const { body: { userName, email, password }, file } = req;
  const user = await userModel.findOne({ email });
  if (user) {
    return res.status(409).json({ msg: "Email already exists" });
  }
  const hashedPassword = await bcrypt.hash(password, +process.env.SALT_ROUND);

  const { secure_url, public_id } = await cloudinary.uploader.upload(file.path, {
    folder: `${process.env.APP_NAME}/users`
  });

  const token = jwt.sign({
    email
  },
    process.env.EMAIL_SECRET_KEY, { expiresIn: '5m' });

  await sendEmail(email, "Email Confirmation", `<a href='http://localhost:${process.env.PORT}/auth/confirm-email/${token}'>Hello, confirm your email!</a>`)

  const createdUser = await userModel.create({
    userName, email, password: hashedPassword, image: { secure_url, public_id }
  });
  return res.status(201).json({ msg: "Success", user: createdUser });
};

export const signin = async (req, res) => {
  const { body: { email, password } } = req;
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(404).json({ msg: "User not found" });
  }
  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    return res.status(404).json({ msg: "User not found" });
  }

  const token = jwt.sign({
    id: user._id, role: user.role, status: user.status
  },
    process.env.LOGIN_SECRET_KEY, { expiresIn: '5m' });

  const refreshToekn = jwt.sign({
    id: user._id, role: user.role, status: user.status
  },
    process.env.LOGIN_SECRET_KEY, { expiresIn: 60 * 60 * 24 * 30 });
  return res.status(200).json({ msg: "Success", token, refreshToekn });
};

export const confirmEmail = async (req, res) => {
  const { token } = req.params;
  const decoded = jwt.verify(token, process.env.EMAIL_SECRET_KEY);
  if (!decoded) {
    return res.status(404).json({ msg: "Invalid token" })
  }
  const user = await userModel.findOneAndUpdate({ email: decoded.email, confirmEmail: false },
    { confirmEmail: true });
  if (!user) {
    return res.status(400).json({ msg: "Invalid verify your email" })
  }
  return res.status(200).json({ msg: "Your email is verified" })
}