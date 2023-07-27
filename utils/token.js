import jwt from "jsonwebtoken";

export const createJWT = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};

export const verifyToken = (token) => {
  console.log(token);
  const decodeData = jwt.verify(token, process.env.JWT_SECRET);
  return decodeData;
};
