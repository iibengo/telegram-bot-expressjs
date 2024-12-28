import { roleSchema } from "../schema/role-schema";

export const isValidRole = async (name = "") => {
  const existeRol = await roleSchema.findOne({ name });
  if (!existeRol) {
    throw new Error(`El rol ${name} no está registrado en la BD`);
  }
};

