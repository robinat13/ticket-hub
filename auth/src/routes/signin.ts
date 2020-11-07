import jwt from "jsonwebtoken";
import { PasswordManager } from "./../services/password";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { BadRequestError } from "../errors/bad-request";
import { validateRequest } from "../middlewares/validate-request";
import { User } from "../models/user";

const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email invalid"),
    body("password").trim().notEmpty().withMessage("Password invalid"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError("Invalid Credentials");
    }
    const passwordMatch = await PasswordManager.compare(
      existingUser.password,
      password
    );
    if (!passwordMatch) {
      throw new BadRequestError("Invalid Credentials");
    }

    //Generating JWT
    const userJwt = jwt.sign(
      { id: existingUser._id, email: existingUser.email },
      process.env.JWT_KEY! // ! is to let typescript know that this condition is already checked
    );

    // Storing JWT on session
    req.session = {
      jwt: userJwt,
    };

    res.send(200).send(existingUser);
  }
);

export { router as signinRouter };
