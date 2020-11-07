import { NotAuthorizedError } from "./../errors/not-authorized-error";
import { Request, Response, NextFunction } from "express";

//Requires current user middleware to run before this middleware
export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.currentUser) {
    throw new NotAuthorizedError();
  }
  next();
};
