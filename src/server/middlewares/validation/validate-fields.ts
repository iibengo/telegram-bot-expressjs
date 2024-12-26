import { validationResult } from "express-validator";
import { Request } from "express-validator/lib/base";
import { ExpressValidatorErrorHandler } from "../../cross/error/express-validation-error";

export const validateFields = (req: Request, res: any, next: Function) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(ExpressValidatorErrorHandler.error(errors.array()));
  }
  next();
};
