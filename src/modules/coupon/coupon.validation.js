import joi from 'joi';
export const createCoupon = joi.object({
  name: joi.string().min(3).max(25).required(),
  amount: joi.number().positive(),
  expireData: joi.date().greater('now').required(),
});