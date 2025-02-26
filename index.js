import express from "express";
import { PrismaClient } from "@prisma/client";
import { PORT } from "./config/env";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.router";
import medRouter from "./routes/med.router";
import authRouter from "./routes/auth.router";

const prisma = new PrismaClient();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/meds", medRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the MedSch API");
});

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await prisma.$connect();
  console.log("Database connected");
});
