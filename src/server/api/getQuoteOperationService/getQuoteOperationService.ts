import { Connection } from "@solana/web3.js";
import * as dotenv from "dotenv";
import { createJupiterApiClient, QuoteGetRequest } from "../../../web3/jup-ag";
import { config } from "../../../config/config";
dotenv.config();

const connection = new Connection(config.SOLANA_RPC_URL_MAINNET);
const jupiterQuoteApi = createJupiterApiClient();

export class GetQuoteOperationService {
  async price() {
    const params: QuoteGetRequest = {
      inputMint: "So11111111111111111111111111111111111111112",
      outputMint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v", // USDC
      amount: 1e9, // 1 SOL in lamports
    };

    try {
      const quote = await jupiterQuoteApi.quoteGet(params);

      if (!quote || !quote.outAmount) {
        throw new Error("Unable to fetch quote");
      }

      // Calcula el precio por 1 SOL en USDC
      const solPrice = Number(quote.outAmount) / 1e6; // Convertir de micro USDC a USDC
      return { solPrice };
    } catch (error) {
      console.error("Error fetching SOL price:", error);
      throw error;
    }
  }
}

export const getQuoteOperationService = new GetQuoteOperationService();
