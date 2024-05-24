import { loginService } from "../services/login.service.js";

export const loginController = {
  authenticateUser: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await loginService.authenticateUser(email, password);
      if (user) {
        res.status(201).json(user);
      } else {
        res.status(401).json({
          error: "invalid user or password",
        });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  changePassword: async (req, res) => {
    try {
      const { password, newPassword } = req.body;
      const userId = parseInt(req.params.userId);

      const response = await loginService.changePassword(
        userId,
        password,
        newPassword
      );

      if (response.message) {
        res.status(201).json(response.message);
      } else {
        res.status(401).json(response.error);
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};
