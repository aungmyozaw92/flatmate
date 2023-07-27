import User from "../../models/User.js";
import { StatusCodes } from "http-status-codes";
import { comparePassword, hashPassword } from "../../utils/password.js";
import { UnauthenticatedError } from "../../errors/customError.js";
import { createJWT } from "../../utils/token.js";

const register = async (req, res) => {
  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;

  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: "user created" });
};

const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  const isUser =
    user && (await comparePassword(req.body.password, user.password));

  if (!isUser) throw new UnauthenticatedError("Invalid credentials");

  const token = createJWT({ userId: user._id, role: user.role });

  const oneDay = 1000 * 60 * 60 * 24;
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
  });

  res
    .status(StatusCodes.OK)
    .json({ status: true, msg: "User logged in successful" });
};

const logout = async (req, res) => {
  // res.cookie("token", "logout", {
  //   httpOnly: true,
  //   expires: new Date(Date.now()),
  // });
  res.clearCookie("token");
  res
    .status(StatusCodes.OK)
    .json({ status: true, msg: "User logout successful" });
};

export { register, login, logout };
