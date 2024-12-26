import { Request, Response, NextFunction } from "express";
import { AppErrorService } from "../../../cross/error/app-error";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let errors = err;
  try {
    if (err?.status) {
      if (err?.errors?.length) {
        errors = err.errors.map((item: Error) =>
          AppErrorService.getErrorByMessage(item.message || "service error")
        );
      } else {
        errors = AppErrorService.getServiceError();
      }
    }
  } catch {
    errors = AppErrorService.getServiceError();
  }
  res.status(500).json({
    errors,
  });
  next();
};
