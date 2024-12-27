import { Request } from "express";
import {
  createJupiterApiClient,
  QuoteGetRequest,
} from "../../../../web3/jup-ag"; // Ajusta la ruta según sea necesario
import * as dotenv from "dotenv";
import { tokenContext } from "../../../../web3/token";
import { GetQuoteOperationServiceResponse } from "./getQuoteOperationServiceSchema";
import { GenericService } from "../../../model/service";
import { TokenInfoModel } from "../../../../web3/model";
dotenv.config();

const jupiterQuoteApi = createJupiterApiClient();

export class GetQuoteOperationService implements GenericService<any, any> {
  path!: string;
  serviceValidation = () => [];

  constructor(path: string) {
    this.path = path;
  }

  async service(req: Request): Promise<GetQuoteOperationServiceResponse> {
    const { amount, inputTokenQuery, outputTokenQuery } = req.body || req.query;
    if (!amount || !inputTokenQuery || !outputTokenQuery) {
      throw new Error(
        "Faltan parámetros: 'amount', 'inputMint' y 'outputTokenQuery' son requeridos."
      );
    }

    try {
      const inputInfo = await tokenContext.getTokenInfo(inputTokenQuery);
      const outputInfo = await tokenContext.getTokenInfo(outputTokenQuery);

      const amountInLamports =
        Number(amount) * Math.pow(10, inputInfo.decimals);
      const params: QuoteGetRequest = {
        inputMint: String(inputInfo.address),
        outputMint: String(outputInfo.address),
        amount: amountInLamports,
      };

      const quote = await jupiterQuoteApi.quoteGet(params);

      if (!quote || !quote.outAmount) {
        throw new Error("Unable to fetch quote");
      }
      const outputAmount =
        Number(quote.outAmount) / Math.pow(10, outputInfo.decimals);
      const response: GetQuoteOperationServiceResponse = this.getResponse(inputInfo, outputInfo, outputAmount);
      return response;
    } catch (error) {
      console.error("Error fetching SOL price:", error);
      throw error;
    }
  }

  private getResponse(inputInfo: TokenInfoModel, outputInfo: TokenInfoModel, outputAmount: number): GetQuoteOperationServiceResponse {
    return {
      input: {
        name: inputInfo.name,
        symbol: inputInfo.symbol,
        address: inputInfo.address,
      },
      output: {
        name: outputInfo.name,
        address: outputInfo.address,
        symbol: outputInfo.symbol,
      },
      outputAmount,
    };
  }
}

export const getQuoteOperationService = new GetQuoteOperationService(
  "/quote/getQuoteOperation"
);
