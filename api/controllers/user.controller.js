import { userService } from "../services/user.service.js";
import {
  validateUser,
  validatePartialUser,
  validateDetailUser,
  validatePartialDetailUser,
} from "../../schemas/user.js";

export const userController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await userService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createUser: async (req, res) => {
    try {
      const result = validateUser(req.body.userData);
      if (!result.success) {
        return res
          .status(400)
          .json({ error: JSON.parse(result.error.message) });
      }

      const { rolesData, userData } = req.body;
      const user = await userService.createUser(userData, rolesData);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  getUserById: async (req, res) => {
    try {
      const user = await userService.getUserById(parseInt(req.params.id));
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateUser: async (req, res) => {
    try {
      const result = validatePartialUser(req.body);

      if (!result.success) {
        return res
          .status(400)
          .json({ error: JSON.parse(result.error.message) });
      }
      const user = await userService.updateUser(
        parseInt(req.params.id),
        req.body
      );
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const userInfo = await userService.deleteUser(parseInt(req.params.id));
      res.status(200).json(userInfo);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getUsersByRole: async (req, res) => {
    try {
      const { roleName } = req.params;
      const users = await userService.getUsersByRole(roleName);
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createUserWithDetails: async (req, res) => {
    try {
      const result = validateDetailUser(req.body);

      if (!result.success) {
        return res
          .status(400)
          .json({ error: JSON.parse(result.error.message) });
      }

      const { userData, addressesData, phonesData, rolesData } = req.body;
      const user = await userService.createUserWithDetails(
        userData,
        addressesData,
        phonesData,
        rolesData
      );
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateUserWithDetails: async (req, res) => {
    try {
      const result = validatePartialDetailUser(req.body);

      if (!result.success) {
        return res
          .status(400)
          .json({ error: JSON.parse(result.error.message) });
      }
      const id = parseInt(req.params.id);
      const { userData, addressesData, phonesData, rolesData } = req.body;

      const user = await userService.updateUserWithDetails(
        id,
        userData,
        addressesData,
        phonesData,
        rolesData
      );
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
