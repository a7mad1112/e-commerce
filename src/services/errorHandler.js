export const asyncHandler = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(err => {
      return res.status(500).json({ msg: "Catch Error", error: err.stack });
      return next(new Error("Catch Error", { error: err.stack }));
    });
  }
};

export const globalErrorHandler = (err, req, res, next) => {
  return res.status(err.cause || 500).json({ msg: err.message });
};