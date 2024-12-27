import { bs58 } from "@project-serum/anchor/dist/cjs/utils/bytes";
import { createJupiterApiClient, QuoteResponse } from "../../jup-ag";
import { tokenContext } from "../token-context";
import { Wallet } from "@project-serum/anchor";
import { Connection, Keypair, VersionedTransaction } from "@solana/web3.js";
import { config } from "../../../config/config";
const connection = new Connection(
  config.SOLANA_RPC_URL_MAINNET || "https://api.mainnet-beta.solana.com"
);
const jupiterQuoteApi = createJupiterApiClient();

export const swapTokensForTokens = async (
  inputMint: any,
  amount: any,
  outputMint: any
) => {
  const inputInfo = await tokenContext.getTokenInfo(inputMint);
  const amountInLamports = Number(amount) * Math.pow(10, inputInfo.decimals);
  const params = {
    inputMint: String(inputMint),
    outputMint: String(outputMint),
    amount: amountInLamports,
  };

  const quote: QuoteResponse = await jupiterQuoteApi.quoteGet(params);

  if (!quote) {
    throw new Error("No se pudo obtener la cotización");
  }
  const privateKey = config.WALLET_PRIVATE_KEY;
  const wallet = new Wallet(Keypair.fromSecretKey(bs58.decode(privateKey)));

  const swapObj = await jupiterQuoteApi.swapPost({
    swapRequest: {
      quoteResponse: quote,
      userPublicKey: wallet.publicKey.toBase58(),
      dynamicComputeUnitLimit: true,
      dynamicSlippage: {
        maxBps: 300, // Límite de deslizamiento
      },
      prioritizationFeeLamports: {
        priorityLevelWithMaxLamports: {
          maxLamports: 10000000,
          priorityLevel: "veryHigh", // Prioridad alta
        },
      },
    },
  });
  if (!swapObj.swapTransaction) {
    throw new Error("No se pudo crear la transacción de swap");
  }
  const swapTransactionBuf = Buffer.from(swapObj.swapTransaction, "base64");
  const transaction = VersionedTransaction.deserialize(swapTransactionBuf);
  transaction.sign([wallet.payer]);
  const { value: simulatedTransactionResponse } =
    await connection.simulateTransaction(transaction, {
      replaceRecentBlockhash: true,
      commitment: "processed",
    });

  const { err, logs } = simulatedTransactionResponse;

  if (err) {
    console.error("Error en la simulación de la transacción:", {
      err,
      logs,
    });
    throw new Error("Error en la simulación de la transacción");
  }
  const serializedTransaction = Buffer.from(transaction.serialize());
  const blockhash = transaction.message.recentBlockhash;

  const transactionResponse = await connection.sendRawTransaction(
    serializedTransaction,
    {
      preflightCommitment: "processed",
      skipPreflight: false,
    }
  );
  await connection.confirmTransaction(
    {
      signature: transactionResponse,
      blockhash,
      lastValidBlockHeight: swapObj.lastValidBlockHeight,
    },
    "confirmed"
  );

  return { ...swapObj, signature: transactionResponse };
};
