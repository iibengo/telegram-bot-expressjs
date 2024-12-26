
import { routeServiceConfig } from "../../model/service";
import { RoleName } from "../../role/role-name";
import { getQuoteOperationService } from "../../service/v1/getQuoteOperationService/getQuoteOperationService";
import { swapOperationService } from "../../service/v1/swapOperationService/swapOperationService";

export const serviceRouteConfigList: routeServiceConfig[] = [
  { service: getQuoteOperationService, role: RoleName.USER },
  { service: swapOperationService, role: RoleName.USER }
];
