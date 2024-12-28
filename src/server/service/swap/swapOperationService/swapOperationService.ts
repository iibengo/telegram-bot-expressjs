import { Request } from "express";
import { SwapResponse } from "../../../../web3/jup-ag";
import { tokenContext } from "../../../../web3/token";
import { GenericService } from "../../../model/service";

export class SwapOperationService implements GenericService<any, any> {
  path!: string;
  serviceValidation = () => [];
  constructor(path: string) {
    this.path = path;
  }

  async service(req: Request): Promise<SwapResponse & { signature: string }> {
    const { amount, inputMint, outputMint } = req.body || req.query;

    if (!amount || !inputMint || !outputMint) {
      throw new Error(
        "Faltan parámetros: 'amount', 'inputMint', 'outputMint' y 'privateKey' son requeridos."
      );
    }
    try {
      const respose = await tokenContext.swapTokensForTokens(
        inputMint,
        amount,
        outputMint
      );
      return respose;
    } catch (error) {
      console.error("Error en el servicio de swap:", error);
      throw error;
    }
  }
}

export const swapOperationService = new SwapOperationService(
  "/swap/swapOperation"
);
