import { ErrorCode ,AppError} from "../../../model/error/";
import { getErrorName } from "./map/error-code-to-error-name-map";

export class AppErrorService {
  public static getServiceError(): AppError {
    return AppErrorService.getError(
      ErrorCode.SERVICE_ERROR,
      "Error in service"
    );
  }
  public static tokenValidationError(): AppError[] {
    return [this.getError(ErrorCode.TOKEN_USER_VALIDATION_ERROR)];
  }
  public static userLoginError(): AppError[] {
    return [this.getError(ErrorCode.USER_LOGIN_ERROR)];
  }
  public static serviceError(): AppError[] {
    return [this.getError(ErrorCode.SERVICE_ERROR)];
  }

  public static getErrorByMessage(msg:string): AppError {
    return this.getError(ErrorCode.SERVICE_ERROR,msg);
  }
  public static getError(
    code: ErrorCode,
    message?: string,
    level?: number,
    name?: string
  ): AppError {
    return {
      code,
      message: message || getErrorName(code).message || "",
      level,
      name: name || getErrorName(code).name
    };
  }
  public static getErrorList(
    code: ErrorCode,
    message: string = "",
    level?: number,
    name?: string
  ): AppError[] {
    return [this.getError(code, message, level, name)];
  }
}
