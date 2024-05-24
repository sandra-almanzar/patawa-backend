import { z } from "zod";

const walkDetailSchema = z.object({
  walkId: z.number().int({
    required_error: "El campo es obligatorio",
  }),
  dogId: z.number().int({
    required_error: "El campo es obligatorio",
  }),
  comments: z.string().optional(),
});

export function validateWalkDetail(object) {
  return walkDetailSchema.safeParse(object);
}

export function validatePartialWalkDetail(object) {
  return walkDetailSchema.partial().safeParse(object);
}
