import { UnauthenticatedError } from "../errors/customError.js";
import { verifyToken } from "../utils/token.js";

export const authenticateUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) throw new UnauthenticatedError("Authentication fails! ");

  try {
    const { userId, role } = verifyToken(token);
    req.user = { userId, role };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Invalid token!");
  }
};
