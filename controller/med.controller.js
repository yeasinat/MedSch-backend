import { PrismaClient } from "@prisma/client";
import { calculateTotalDosage } from "../utils/medication.utils";
const prisma = new PrismaClient();

export const createMed = async (req, res, next) => {
  try {
    const { medStartDate, medEndDate, dosagePerDay, frequency } = req.body;

    const neededMed = calculateTotalDosage(
      medStartDate,
      medEndDate,
      dosagePerDay,
      frequency
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
      where: { id: parseInt(req.params.id), userId: req.user.id },
    });

    if (!med) {
      return res.status(404).json({ message: "Medication not found" });
    }

    return res.json(med);
  } catch (error) {
    next(error);
  }
};

export const updateMed = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, dosagePerDay, medStartDate, medEndDate, frequency } =
      req.body;

    // Calculate neededMed if any relevant field is provided
    let neededMed;
    if (medStartDate || medEndDate || dosagePerDay || frequency) {
      neededMed = calculateTotalDosage(
        medStartDate,
        medEndDate,
        dosagePerDay,
        frequency
      );
    }

    const updatedMed = await prisma.medication.update({
      where: { id: parseInt(id) },
      data: {
        name,
        dosagePerDay,
        medStartDate,
        medEndDate,
        frequency,
        neededMed,
      },
    });

    return res.json(updatedMed);
  } catch (error) {
    next(error);
  }
};

export const deleteMed = async (req, res, next) => {
  try {
    const { id } = req.params;
    await prisma.medication.delete({
      where: { id: parseInt(id) },
    });
    return res.json({ message: "Medication deleted successfully" });
  } catch (error) {
    next(error);
  }
};
