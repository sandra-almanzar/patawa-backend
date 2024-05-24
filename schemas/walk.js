import { z } from "zod";

const walkSchema = z.object({
  dateTime: z
    .string()
    .datetime({ message: "Fecha y hora no válida. Debe estar en UTC" }),
  duration: z.number().positive().int(),
  location: z.string({
    invalid_type_error: "Debe ser una cadena de caracteres",
    required_error: "El campo es obligatorio",
  }),
  walkerUserId: z.number().int(),
});

export function validateWalk(object) {
  return walkSchema.safeParse(object);
}

export function validatePartialWalk(object) {
  return walkSchema.partial().safeParse(object);
}
