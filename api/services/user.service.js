import { PrismaClient } from "@prisma/client";
import { userSelectData } from "../utils/user.utils.js";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const userService = {
  createUser: async (userData, rolesData) => {
    const saltRounds = 10;
    userData.password = await bcrypt.hash(userData.password, saltRounds);

    return await prisma.user.create({
      data: {
        ...userData,
        UserRoles: {
          create: rolesData.map((roleId) => ({
            Role: { connect: { roleId } },
          })),
        },
      },
      select: userSelectData(),
    });
  },

  getAllUsers: async () => {
    return await prisma.user.findMany({
      where: {
        enabled: true,
      },
      select: userSelectData(),
    });
  },

  getUserById: async (id) => {
    return await prisma.user.findUnique({
      select: userSelectData(),
      where: { userId: id, enabled: true },
    });
  },

  updateUser: async (id, userData) => {
    const enabledUser = await userService.checkUser(id);
    if (enabledUser) {
      delete enabledUser.password;
      return await prisma.user.update({
        where: { userId: id, enabled: true },
        data: userData,
        select: userSelectData(),
      });
    }
    return { message: "El usuario no existe o está inactivo" };
  },

  deleteUser: async (id) => {
    const user = await prisma.user.update({
      where: { userId: id },
      data: { enabled: false },
      select: userSelectData(),
    });

    return { userId: user.userId, enabled: user.enabled };
  },

  getUsersByRole: async (roleName) => {
    return await prisma.user.findMany({
      where: {
        enabled: true,
        UserRoles: {
          some: {
            Role: {
              roleName,
            },
          },
        },
      },
      select: userSelectData(),
    });
  },

  createUserWithDetails: async (
    userData,
    addressesData,
    phonesData,
    rolesData
  ) => {
    const user = await prisma.user.create({
      data: {
        ...userData,
        Addresses: {
          // Asegúrate de usar el nombre exacto del campo definido en tu modelo Prisma
          create: addressesData, // 'addressesData' es un array de objetos de direcciones
        },
        Phones: {
          // Asegúrate de usar el nombre exacto del campo definido en tu modelo Prisma
          create: phonesData, // 'phonesData' es un array de objetos de teléfonos
        },
        UserRoles: {
          // Aquí es donde necesitas ajustar para usar la tabla intermedia 'UserRole'
          create: rolesData.map((role) => ({
            Role: {
              connect: { roleId: role.roleId },
            },
          })),
        },
      },

      select: userSelectData(),
    });
    return user;
  },

  updateUserWithDetails: async (
    id,
    userData,
    addressesData = [],
    phonesData = [],
    rolesData = []
  ) => {
    const enabledUser = await userService.checkUser(id);
    if (enabledUser) {
      // Actualizar Direcciones
      const addressIds = addressesData
        .map((address) => address.addressId)
        .filter(Boolean);
      if (addressIds) {
        // Eliminar direcciones que no están en la lista de entrada
        await prisma.address.deleteMany({
          where: {
            userId: id,
            addressId: { notIn: addressIds },
          },
        });
      }

      // Actualizar o añadir nuevas direcciones
      for (const address of addressesData) {
        if (address.addressId) {
          // Actualiza la dirección existente
          await prisma.address.update({
            where: { addressId: address.addressId },
            data: address,
          });
        } else {
          // Añade una nueva dirección
          await prisma.address.create({
            data: { ...address, userId: id },
          });
        }
      }

      // Actualizar Teléfonos
      const phoneIds = phonesData.map((phone) => phone.phoneId).filter(Boolean);

      // Eliminar teléfonos que no están en la lista de entrada
      if (phoneIds) {
        await prisma.userPhone.deleteMany({
          where: {
            userId: id,
            phoneId: { notIn: phoneIds },
          },
        });
      }

      // Actualizar o añadir nuevos teléfonos
      for (const phone of phonesData) {
        if (phone.phoneId) {
          // Actualiza el teléfono existente
          await prisma.userPhone.update({
            where: { phoneId: phone.phoneId },
            data: phone,
          });
        } else {
          // Añade un nuevo teléfono
          await prisma.userPhone.create({
            data: { ...phone, userId: id },
          });
        }
      }

      // Actualizar Roles
      await prisma.userRole.deleteMany({
        where: {
          userId: id,
          roleId: { notIn: rolesData.map((role) => role.roleId) },
        },
      });

      // Añadir las nuevas relaciones de roles
      for (const role of rolesData) {
        await prisma.userRole.upsert({
          where: {
            userId_roleId: { userId: id, roleId: role.roleId },
          },
          update: {}, // Solo asegura que la relación existe
          create: { userId: id, roleId: role.roleId },
        });
      } // Actualizamos el usuario principal
      delete userData.password;
      const updatedUser = await prisma.user.update({
        where: { userId: id },
        data: { ...userData },
        select: userSelectData(),
      });

      return updatedUser;
    }
    return { message: "El usuario no existe o está inactivo" };
  },

  checkUser: async (id) => {
    const enabledUser = await prisma.user.findUnique({
      where: {
        userId: id,
        enabled: true,
      },
    });

    return enabledUser ? true : false;
  },
};
