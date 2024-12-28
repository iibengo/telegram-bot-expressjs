import { Router } from "express";
import { publicServiceList } from "./service-route/public-service-list";

export const getPublicRouteList = (): Router[] => {
  return publicServiceList.map((serviceConfig) => {
    const router = Router();
    router.post(serviceConfig.service.path, serviceConfig.service.service);
    return router;
  });
};

