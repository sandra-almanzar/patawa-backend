import { z } from "zod";
const phone = z.object({
  phoneNumber: z.string({
    invalid_type_error: "Debe ser una cadena de caracteres",
    required_error: "El campo es obligatorio",
  }),
});
export const userPhoneSchema = z.array(phone);
