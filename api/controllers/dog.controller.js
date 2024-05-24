import { dogService } from "../services/dog.service.js";
import { validateDog, validatePartialDog } from "../../schemas/dog.js";

export const dogController = {
  getAllDogs: async (req, res) => {
    try {
      const dogs = await dogService.getAllDogs();
      res.status(200).json(dogs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createDog: async (req, res) => {
    try {
      const result = validateDog(req.body);
      if (!result.success) {
        return res
          .status(400)
          .json({ error: JSON.parse(result.error.message) });
      }
      const dog = await dogService.createDog(req.body);
      res.status(201).json(dog);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getDogById: async (req, res) => {
    try {
      const dog = await dogService.getDogById(parseInt(req.params.id));
      if (dog) {
        res.status(200).json(dog);
      } else {
        res.status(404).json({ message: "Dog not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateDog: async (req, res) => {
    try {
      const result = validatePartialDog(req.body);

      if (!result.success) {
        return res
          .status(400)
          .json({ error: JSON.parse(result.error.message) });
      }
      const dog = await dogService.updateDog(parseInt(req.params.id), req.body);
      res.status(200).json(dog);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  deleteDog: async (req, res) => {
    try {
      const dogInfo = await dogService.deleteDog(parseInt(req.params.id));
      res.status(200).json(dogInfo);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
