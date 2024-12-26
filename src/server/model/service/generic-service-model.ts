import { ValidationChain } from "express-validator";

export interface GenericService<Req, Res> {
    path: string;
    serviceValidation: () => ValidationChain[];
    service: (req: Req) => Promise<Res>;
  }