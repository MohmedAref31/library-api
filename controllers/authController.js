import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import ApiError from "../utiles/ApiError.js";
import generateToken from "../utiles/generateToken.js";

export const register = asyncHandler(async (req, res, next) => {
  const user = new User(req.body);
  await user.save();
  res.jsonSuccess(user);
});

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });
  if (!user) return next(new ApiError("email or password is incorrect", 401));
  const comparePass = bcrypt.compare(password, user.password);

  if (!comparePass)
    return next(new ApiError("email or password is incorrect", 401));
 
  const token = generateToken({_id:user._id, role:user.role})
  res.cookie("access_token",token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7
  })
  res.jsonSuccess({user, token});
});
