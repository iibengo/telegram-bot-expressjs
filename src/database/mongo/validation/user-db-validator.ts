import { userSchema } from "../schema/user-schema";


export const existEmail = async (email = "") => {
  const existeEmail = await userSchema.findOne({ email });
  if (existeEmail) {
    throw new Error(`El correo: ${email}, ya está registrado`);
  }
};

export const existUserById = async (id: string) => {
  const existeUsuario = await userSchema.findById(id);
  if (!existeUsuario) {
    throw new Error(`El id no existe ${id}`);
  }
};