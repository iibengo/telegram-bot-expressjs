import { Request } from "express";
import { UserSchemaModel } from "../../../database/mongo/schema/user-schema";

export interface CustomRequest<T> extends Request<any, any, T> {
  user?: UserSchemaModel;
}
