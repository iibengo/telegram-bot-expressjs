import { Schema, model } from "mongoose";

export interface UserSchemaModel extends Document {
  _id: any;
  userName: string;
  email: string;
  password: string;
  img?: string;
  role: "ADMIN_ROLE" | "USER_ROLE";
  estado: boolean;
  google: boolean;
  uid: string;
}

const userSchema = new Schema<UserSchemaModel>({
  userName: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },
  email: {
    type: String,
    required: [true, "El correo es obligatorio"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
  },
  img: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    emun: ["ADMIN_ROLE", "USER_ROLE"],
  },
  estado: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

userSchema.methods.toJSON = function () {
  const { __v, password, _id, ...usuario } = this.toObject();
  usuario.uid = _id;
  return usuario;
};
const mongoUser = model<UserSchemaModel>("userDbModel", userSchema);
export { mongoUser };
