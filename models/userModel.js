import mongoose from "mongoose";
import hashPassword from "../utiles/hashPassword.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
      maxLength: 100,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxLength: 500,
    },
    password: {
      type: String,
      minLength: 6,
      maxLength: 32,
      trim: true,
    },
    phone: String,
    birthDate: Date,
    role: {
      type: String,
      enum: ["user", "admin", "author"],
      default: "user",
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  try {
    user.password = await hashPassword(user.password);
  } catch (error) {
    next(error);
  }
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
