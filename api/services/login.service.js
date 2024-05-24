import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const loginService = {
  authenticateUser: async (email, password) => {
    const user = await prisma.user.findUnique({
      where: { email, enabled: true },
    });

    const passwordCorrect =
      user === null ? false : await bcrypt.compare(password, user.password);

    if (!(user && passwordCorrect)) {
      return false;
    }

    const tokenUser = {
      userId: user.userId,
      email: user.email,
    };

    const token = jwt.sign(tokenUser, process.env.SECRET, {
      expiresIn: 60 * 60 * 24 * 7,
    });

    return { tokenUser, token };
  },

  changePassword: async (userId, password, newPassword) => {
    const user = await prisma.user.findUnique({
      where: { userId, enabled: true },
    });

    const passwordCorrect =
      user === null ? false : await bcrypt.compare(password, user.password);
    if (!(user && passwordCorrect)) {
      return {
        error: "El usuario no existe o los datos ingresados son incorrectos",
      };
    }
    const saltRounds = 10;
    newPassword = await bcrypt.hash(newPassword, saltRounds);
    await prisma.user.update({
      where: { userId, enabled: true },
      data: { password: newPassword },
    });
    return { message: "La contraseña se actualizó correctamente" };
  },
};
