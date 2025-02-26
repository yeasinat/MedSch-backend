import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUsers = async (req, res, next) => {
  try {
    const users = await prisma.user.findMany();
    return res.json(users);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    // Another way of removing the password from the response
    // const { password, ...userWithoutPassword } = user;

    return res.json(user);
  } catch (error) {
    next(error);
  }
};
