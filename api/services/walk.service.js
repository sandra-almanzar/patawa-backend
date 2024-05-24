import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const walkService = {
  createWalk: async (walkData) => {
    return await prisma.walk.create({
      data: walkData,
    });
  },

  getAllWalks: async () => {
    return await prisma.walk.findMany({
      where: {
        enabled: true,
      },
    });
  },

  getWalkById: async (id) => {
    return await prisma.walk.findUnique({
      where: { walkId: id, enabled: true },
    });
  },

  updateWalk: async (id, walkData) => {
    const enabledWalk = await walkService.checkWalk(id);

    if (enabledWalk) {
      return await prisma.walk.update({
        where: { walkId: id },
        data: walkData,
      });
    }
    return { message: "El paseo no existe o está inactivo" };
  },

  deleteWalk: async (id) => {
    const walk = await prisma.walk.update({
      where: { walkId: id },
      data: { enabled: false },
    });
    return { walkId: walk.walkId, enabled: walk.enabled };
  },

  createWalkDetail: async (walkDetailData) => {
    return await prisma.walkDetail.create({
      data: walkDetailData,
    });
  },

  getAllWalksDetails: async () => {
    return await prisma.walkDetail.findMany({});
  },

  getWalkDetailById: async (id) => {
    return await prisma.walkDetail.findUnique({
      where: { walkDetailId: id },
    });
  },

  updateWalkDetail: async (id, walkDetailData) => {
    return await prisma.walkDetail.update({
      where: { walkDetailId: id },
      data: walkDetailData,
    });
  },

  deleteWalkDetail: async (id) => {
    return await prisma.walkDetail.delete({
      where: { walkDetailId: id },
    });
  },

  checkWalk: async (id) => {
    const enabledWalk = await prisma.walk.findUnique({
      where: {
        walkId: id,
        enabled: true,
      },
    });
    return enabledWalk ? true : false;
  },
};
