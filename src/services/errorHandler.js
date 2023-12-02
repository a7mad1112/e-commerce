export const asyncHandler = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(err => {
      return res.status(500).json({ msg: "Catch Error", error: err.stack });
    });
  }
};