import jwt from "jsonwebtoken";

const generateToken =  (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET,{
    expiresIn: process.env.JWT_EXPIRES_IN || "1d",
  });
  return token;
}


export default generateToken