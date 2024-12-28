import jwt, { JwtPayload } from "jsonwebtoken";
import { Response, Request, NextFunction } from "express";
import { CustomRequest } from "../../model/express/express-request";
import {
  userSchema,
  UserSchemaModel,
} from "../../../database/mongo/schema/user-schema";
import { AppErrorService } from "../../cross/error/app-error";

export const validateJWT = async (
  req: Request,
  __res: Response,
  next: NextFunction
) => {
  const token = req.headers.xtoken as string;
  if (!token) {
    next(AppErrorService.tokenValidationError());
  }
  try {
    const payload = jwt.verify(
      token,
      process.env.SECRET_JWT_PRIVATE_KEY as string
    ) as JwtPayload;
    const uid = payload.uid as string;
    const user = (await userSchema.findById(uid)) as UserSchemaModel;
    if (!user) {
      next(AppErrorService.tokenValidationError());
    }
    if (!user?.estado) {
      next(AppErrorService.tokenValidationError());
    }
    addUserToReq(req, user);
    next();
  } catch (err) {
    next(AppErrorService.tokenValidationError());
  }
};
const addUserToReq = (
  req: any & CustomRequest<object>,
  userRes: UserSchemaModel
) => {
  const { userName, role, email, estado, google, _id } = userRes;
  req.user = {};
  req.user.userName = userName;
  req.user.role = role;
  req.user.email = email;
  req.user.estado = estado;
  req.user.google = google;
  req.user.uid = _id?.valueOf();
};
