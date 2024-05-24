import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const dogService = {
  createDog: async (dogData) => {
    return await prisma.dog.create({
      data: dogData,
    });
  },

  getAllDogs: async () => {
    return await prisma.dog.findMany({
      where: {
        enabled: true,
      },
    });
  },

  getDogById: async (id) => {
    return await prisma.dog.findUnique({
      where: { dogId: id, enabled: true },
      include: {
        Breed: true,
      },
    });
  },

  updateDog: async (id, dogData) => {
    const enabledDog = await dogService.checkDog(id);

    if (enabledDog) {
      return await prisma.dog.update({
        where: { dogId: id },
        data: dogData,
      });
    }
    return { message: "El perro no existe o está inactivo" };
  },

  deleteDog: async (id) => {
    const dog = await prisma.dog.update({
      where: { dogId: id },
      data: { enabled: false },
    });
    return { dogId: dog.dogId, enabled: dog.enabled };
  },

  checkDog: async (id) => {
    const enabledDog = await prisma.dog.findUnique({
      where: {
        dogId: id,
        enabled: true,
      },
    });
    return enabledDog ? true : false;
  },
};
