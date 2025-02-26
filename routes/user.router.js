import express from "express";
import { getUserById, getUsers } from "../controller/user.controller";
import { authorize } from "../middlewares/auth.middleware";

const userRouter = express.Router();

userRouter.get("/", authorize, getUsers);
userRouter.get("/:id", authorize, getUserById);

export default userRouter;
