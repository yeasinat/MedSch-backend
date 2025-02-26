import express from "express";
import { authorize } from "../middlewares/auth.middleware";
import {
  createMed,
  deleteMed,
  getMedById,
  getMeds,
  updateMed,
} from "../controller/med.controller";

const medRouter = express.Router();

medRouter.get("/", authorize, getMeds);
medRouter.post("/", authorize, createMed);
medRouter.get("/:id", authorize, getMedById);
medRouter.put("/:id", authorize, updateMed);
medRouter.delete("/:id", authorize, deleteMed);

export default medRouter;
