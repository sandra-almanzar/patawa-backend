import { z } from "zod";
const role = z.object({
  roleId: z.number().int(),
});
export const rolesSchema = z.array(role);
