import { StatusCodes } from "http-status-codes";

export class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFoundError";
    this.status = false;
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}
export class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = "BadRequestError";
    this.status = false;
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}
export class UnauthenticatedError extends Error {
  constructor(message) {
    super(message);
    this.name = "UnauthenticatedError";
    this.status = false;
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}
export class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = "UnauthorizedError";
    this.status = false;
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}
