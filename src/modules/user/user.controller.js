import userModel from '../../../db/models/user.model.js';
import XLSX from 'xlsx';

export const getProfile = async (req, res) => {
  const user = await userModel.findById(req.user._id);
  return res.status(200).json({ msg: 'Success', user });
};

export const uploadUserExcel = async (req, res, next) => {
  const woorkBook = XLSX.readFile(req.file.path);
  const woorkSheet = woorkBook.Sheets[woorkBook.SheetNames[0]];
  const users = XLSX.utils.sheet_add_json(woorkSheet);
  if (!(await userModel.insertMany(users))) {
    return next(new Error('invalid'));
  }
  return res.status(201).json({ msg: 'success' });
};
