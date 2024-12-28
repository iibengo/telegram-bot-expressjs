import { NextFunction } from "express";
import { ValidationChain } from "express-validator";
import { CustomRequest } from "../express";

export interface PublicGenericService<Req, Res> {
  path: string;
  serviceValidation: () => ValidationChain[];
  service: (req: CustomRequest<any>, res: any, next: NextFunction) => Promise<void>;
}
export interface PublicServiceModel {
  service: PublicGenericService<any,any>;
}