import { Schema, model } from "mongoose";

const RoleSchema = new Schema({
  name: {
    type: String,
    required: [true, "El rol es obligatorio"],
  },
});
const roleSchema = model("roleDbModel", RoleSchema, "roleDbModel");
export { roleSchema };
