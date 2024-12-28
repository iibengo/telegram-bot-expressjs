
import { routeServiceConfig } from "../../model/service";
import { RoleName } from "../../role/role-name";
import { getQuoteOperationService } from "../../service/quote/getQuoteOperationService/getQuoteOperationService";
import { swapOperationService } from "../../service/swap/swapOperationService/swapOperationService";
import { createUserOperationService } from "../../service/user/createUserOperationService/createUserOperationService";

export const userServiceList: routeServiceConfig[] = [
  { service: getQuoteOperationService, role: RoleName.USER },
  { service: swapOperationService, role: RoleName.USER },
];
