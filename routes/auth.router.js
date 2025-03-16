import express from "express";
import { signIn, signOut, signUp } from "../controller/auth.controller";

const authRouter = express.Router();

// TODO - Add router for reset password and forgot password

authRouter.post("/sign-up", signUp);
authRouter.post("/sign-in", signIn);
authRouter.get("sign-out", signOut);

export default authRouter;
