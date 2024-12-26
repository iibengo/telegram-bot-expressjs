
import { RoleName } from "../../role/role-name";
import { GenericService } from "./generic-service-model";
import { Request, } from 'express';
export interface routeServiceConfig {
  service: GenericService<Request,object>;
  role: RoleName;
}