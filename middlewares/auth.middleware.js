import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authorize = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = decoded;

    next();
  } catch (error) {
    next(error);
  }
};
