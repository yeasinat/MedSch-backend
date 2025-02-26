import express from "express";
import { authorize } from "../middlewares/auth.middleware";
import { createMed, getMedById, getMeds } from "../controller/med.controller";

const medRouter = express.Router();

medRouter.post("/", authorize, createMed);
medRouter.get("/", authorize, getMeds);
medRouter.get("/:id", authorize, getMedById);

export default medRouter;
