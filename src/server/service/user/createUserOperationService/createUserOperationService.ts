import { NextFunction, Request, Response } from "express";
import { check } from "express-validator";
import bcryptjs from "bcryptjs";
import { existEmail } from "../../../../database/mongo/validation/user-db-validator";
import { isValidRole } from "../../../../database/mongo/validation/role-validator";
import { userSchema } from "../../../../database/mongo/schema/user-schema";
import { GenericService } from "../../../model/service";

class CreateUserOperationService implements GenericService<any, any> {
  public path!: string;
  constructor(path: string) {
    this.path = path;
  }
  public serviceValidation() {
    return [
      check("userName", "El nombre es obligatorio").not().isEmpty(),
      check("password", "El password debe de ser más de 6 letras").isLength({
        min: 6,
      }),
      check("email", "El correo no es válido").isEmail(),
      check("email").custom(existEmail),
      check("role").custom(isValidRole),
    ];
  }
  public async service(req: Request) {
    const { userName, email, password, role } = req.body;
    const usuario = new userSchema({ userName, email, password, role });
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);
    await usuario.save();
    return {
      usuario,
    };
  }
}
const createUserOperationService = new CreateUserOperationService(
  "/user/createUserOperation"
);
export { createUserOperationService };
