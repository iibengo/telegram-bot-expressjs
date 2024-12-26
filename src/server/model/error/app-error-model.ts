import { ErrorCode } from "./error-code";

export interface AppError extends Error {
  code: ErrorCode;
  level?: number;
  type?: string;
  status?: number;
}
