import express, { Request, Response } from "express";
import { body } from "express-validator";
import { validateRequest } from "../middlewares/validate-request";

const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email invalid"),
    body("password").trim().notEmpty().withMessage("Password invalid"),
  ],
  validateRequest,
  (req: Request, res: Response) => {}
);

export { router as signinRouter };
