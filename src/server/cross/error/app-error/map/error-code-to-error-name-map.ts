import { ErrorCode } from "../../../../model/error/";
export interface CustomError{
  name:string,
  message?:string
}
const errorCodeToErrorNameMap = new Map<ErrorCode, CustomError>([
  [ErrorCode.PARAM_VALIDATION_ERROR, {name:"PARAM_VALIDATION_ERROR"}],
  [ErrorCode.TOKEN_VALIDATION_ERROR, {name:"TOKEN_VALIDATION_ERROR"}],
  [ErrorCode.TOKEN_USER_VALIDATION_ERROR, {name:"TOKEN_USER_VALIDATION_ERROR"}],
  [ErrorCode.PERMISSION_VALIDATION_ERROR, {name:"PERMISSION_VALIDATION_ERROR"}],
  [ErrorCode.SERVICE_ERROR, {name:"SERVICE_ERROR"}],
  [ErrorCode.USER_LOGIN_ERROR ,{name:"USER_LOGIN_ERROR",message:"Usuario / Password no son correctos"}]
]);
export const getErrorName = (code: ErrorCode): CustomError => {
  return errorCodeToErrorNameMap.get(code) || {name:"UNEXPECTEC ERROR"};
};
