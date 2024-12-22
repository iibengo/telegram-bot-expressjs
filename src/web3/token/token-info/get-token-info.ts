import { Connection, PublicKey } from "@solana/web3.js";
import { TokenInfoModel } from "../../model";
import { TokenListProvider, TokenInfo } from "@solana/spl-token-registry";

// Conexión a Solana
const connection = new Connection(
  "https://api.mainnet-beta.solana.com",
  "confirmed"
);

const getTokenDetailsFromRegistry = async (mintAddress: string) => {
  try {
    const tokenList = await new TokenListProvider().resolve();
    const tokens = tokenList.filterByChainId(101).getList(); // 101 es el ID de la Mainnet

    const tokenInfo = tokens.find((token) => token.address === mintAddress);

    if (tokenInfo) {
      return {
        name: tokenInfo.name,
        symbol: tokenInfo.symbol,
        decimals: tokenInfo.decimals,
      };
    } else {
      return {
        name: undefined,
      };
    }
  } catch (error) {
    return {
      name: undefined,
    };
  }
};

export const getTokenInfo = async (
  mintAddress: string
): Promise<TokenInfoModel> => {
  const mintPublicKey = new PublicKey(mintAddress);

  // Obtener la información de la cuenta del token
  let tokenInfo = { name: "", decimals: 0 };

  const tokenInfoName = await getTokenDetailsFromRegistry(mintAddress);
  if (tokenInfoName.name !== "Unknown Token") {
    tokenInfo = {
      name: tokenInfoName.symbol || "",
      decimals: tokenInfoName.decimals || 0,
    };
  }
  const tokenInfoData = await connection.getParsedAccountInfo(mintPublicKey);
  if (tokenInfoData.value && tokenInfoData.value.data) {
    if ("parsed" in tokenInfoData.value.data) {
      const parsedData = tokenInfoData.value.data.parsed.info;

      // Extraer los decimales y el nombre (si existe)
      const decimals = parsedData.decimals;
      //const name = parsedData.name || "Unknown Token"; // Asegúrate de que el nombre exista
      tokenInfo.decimals=decimals
    } else {
      throw new Error("Los datos no están parseados correctamente.");
    }
  } else {
    throw new Error(
      "No se pudo obtener la información del token o la cuenta está vacía."
    );
  }

  // Verificar si la cuenta tiene datos y si están parseados

  return tokenInfo;
};
