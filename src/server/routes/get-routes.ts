import { Router, Request, Response, NextFunction } from "express";
import { validateFields } from "../middlewares/validation/validate-fields";
import { serviceRouteConfigList } from "./service-route/service-route-list";
import { RoleName } from "../role/role-name";
import { AppErrorService } from "../cross/error/app-error";

const getRoutesByRole = (role: RoleName): Router[] => {
  return serviceRouteConfigList
    .filter((serviceConfig) => serviceConfig.role === role)
    .map((serviceConfig) => {
      const router = Router();
      router.post(
        serviceConfig.service.path,
        [...serviceConfig.service.serviceValidation(), validateFields],
        async (req: Request, res: Response, next: NextFunction) => {
          try {
            const result = await serviceConfig.service.service(req);
            res.json(result);
          } catch (err) {
            next([AppErrorService.getServiceError()]);
          }
        }
      );
      return router;
    });
};
export const adminRouteList = () => getRoutesByRole(RoleName.ADMIN);
export const userRouteList = () => getRoutesByRole(RoleName.USER);


