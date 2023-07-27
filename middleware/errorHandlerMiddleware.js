import { StatusCodes } from "http-status-codes";

const errorHandlerMiddleware = (err, req, res, nex) => {
  console.log("err", err);
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const status = err.status || false;
  const msg = err.message || "something went wrong, try again later";
  res.status(statusCode).json({ status: status, msg: msg });
};

export default errorHandlerMiddleware;
