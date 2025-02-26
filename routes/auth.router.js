import express from "express";
import { signIn, signOut, signUp } from "../controller/auth.controller";

const authRouter = express.Router();

authRouter.post("/sign-up", signUp);
authRouter.post("/sign-in", signIn);
authRouter.get("sign-out", signOut);

export default authRouter;
