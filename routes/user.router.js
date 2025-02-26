import express from "express";
import { deleteUser, getUserById, getUsers, updateUser } from "../controller/user.controller";
import { authorize } from "../middlewares/auth.middleware";

const userRouter = express.Router();

userRouter.get("/", authorize, getUsers);
userRouter.get("/:id", authorize, getUserById);
userRouter.put("/:id", authorize, updateUser);
userRouter.delete("/:id", authorize, deleteUser);

export default userRouter;
