import { PrismaClient } from "@prisma/client";
import { calculateTotalDosage } from "../utils/medication.utils";
const prisma = new PrismaClient();

export const createMed = async (req, res, next) => {
  try {
    const { medStartDate, medEndDate, dosagePerDay } = req.body;

    const neededMed = calculateTotalDosage(
      medStartDate,
      medEndDate,
      dosagePerDay
    );

    const med = await prisma.medication.create({
      data: {
        ...req.body,
        neededMed,
        user: {
          connect: {
            id: req.user.id,
          },
        },
      },
    });

    return res.json(med);
  } catch (error) {
    next(error);
  }
};

export const getMeds = async (req, res, next) => {
  try {
    const meds = await prisma.medication.findMany({
      where: {
        user: {
          id: req.user.id,
        },
      },
    });

    return res.json(meds);
  } catch (error) {
    next(error);
  }
};

export const getMedById = async (req, res, next) => {
  try {
    const med = await prisma.medication.findUnique({
      where: { id: req.params.id, userId: req.user.id },
    });
    return res.json(med);
  } catch (error) {
    next(error);
  }
};
