import userModel from "../../../db/models/user.model.js";
import bcrypt from 'bcryptjs';
import cloudinary from './../../services/cloudinary.js';
import jwt from "jsonwebtoken";
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

  const refreshToekn = jwt.jwt.sign({
    id: user._id, role: user.role, status: user.status
  },
    process.env.LOGIN_SECRET_KEY, { expiresIn: 60 * 60 * 24 * 30 });
  return res.status(200).json({ msg: "Success", token, refreshToekn });
};