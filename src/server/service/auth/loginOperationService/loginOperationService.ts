import { NextFunction, Response } from "express";
import bcryptjs from "bcryptjs";
import { CustomRequest } from "../../../model/express";
import { AppErrorService } from "../../../cross/error/app-error";
import { userSchema } from "../../../../database/mongo/schema/user-schema";
import { generateJWTToken } from "../../../auth";
import { PublicGenericService } from "../../../model/service/public-service-model";

class LoginOperationService implements PublicGenericService<any,any> {
  public path!: string;

  constructor(path: string) {
    this.path = path;
  }

  public serviceValidation() {
    return [];
  }

  public async service(req: CustomRequest<any>, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    try {
      const user = await userSchema.findOne({ email });
      if (!user) {
        return next(AppErrorService.userLoginError());
      }
      if (user?.estado === false) {
        next(AppErrorService.userLoginError());
      }
      const validPassword = bcryptjs.compareSync(
        password,
        user?.password as string
      );
      console.log("validPassword",validPassword)
      if (!validPassword) {
        return next(AppErrorService.userLoginError());
      }
      console.log("llega")
      const token = await generateJWTToken(user?.id);
      res.json({
        user,
        token,
      });
    } catch (error) {
      console.log("entraError")
      return  next(AppErrorService.serviceError());
    }
  }
}

const loginOperationService = new LoginOperationService("/auth/loginOperation");

export { loginOperationService };
