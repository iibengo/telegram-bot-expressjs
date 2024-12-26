import { ValidationError } from "express-validator";
import { ErrorCode ,AppError} from "../../../model/error/";


export class ExpressValidatorErrorHandler {
  public static error(errors: ValidationError[]): AppError[] {
    return errors.map((error) => {
      return {
        code: ErrorCode.PARAM_VALIDATION_ERROR,
        message: error.msg,
        type: error.type,
        name: "PARAM_VALIDATION_ERROR",
      };
    });
  }
}
