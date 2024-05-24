import { z } from "zod";

const dogSchema = z.object({
  ownerUserId: z.number().int(),
  age: z.number().int({
    required_error: "El campo es obligatorio",
  }),
  color: z.string({
    invalid_type_error: "Debe ser una cadena de caracteres",
    required_error: "El campo es obligatorio",
  }),
  fullName: z.string({
    invalid_type_error: "Debe ser una cadena de caracteres",
    required_error: "El campo es obligatorio",
  }),
  weight: z.number().min(0).max(99.99),
  size: z.string({
    invalid_type_error: "Debe ser una cadena de caracteres",
    required_error: "El campo es obligatorio",
  }),
  breedId: z.number().int(),
  photo: z.string().optional(),
});

export function validateDog(object) {
  return dogSchema.safeParse(object);
}

export function validatePartialDog(object) {
  return dogSchema.partial().safeParse(object);
}
