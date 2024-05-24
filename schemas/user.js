import { z } from "zod";
import { rolesSchema } from "./roles.js";
import { userPhoneSchema } from "./userPhone.js";
import { addressSchema } from "./address.js";

const userSchema = z.object({
  email: z.string().email(),
  password: z.string().optional(),
  fullName: z.string({
    invalid_type_error: "Debe ser una cadena de caracteres",
    required_error: "El campo nombre completo es obligatorio",
  }),
  age: z.number().int().min(0).optional(),
  documentTypeId: z.number().int(),
  documentNumber: z.string({
    invalid_type_error: "Debe ser una cadena de caracteres",
    required_error: "El campo es obligatorio",
  }),
  avatarUrl: z.string().optional(),
});

const detailUserSchema = z.object({
  userData: userSchema,
  rolesData: rolesSchema,
  phonesData: userPhoneSchema,
  addressesData: addressSchema,
});

export function validateUser(object) {
  return userSchema.safeParse(object);
}

export function validatePartialUser(object) {
  return userSchema.partial().safeParse(object);
}

export function validateDetailUser(object) {
  return detailUserSchema.safeParse(object);
}

export function validatePartialDetailUser(object) {
  return detailUserSchema.deepPartial().safeParse(object);
}
