import { Connection } from "@solana/web3.js";
import { TokenInfoModel } from "../model";
import { getTokenMetadata } from "./token-info";
import { getTokenDecimals } from "./token-info/get-token-decimals";
import { swapTokensForTokens } from "./swap/swap-tokens-for-tokens";
import { isContractFormatString } from "../functions";

class TokenContext {
  private solanaMainnetUrl = "https://api.mainnet-beta.solana.com";
  public async getTokenInfo(query: string): Promise<TokenInfoModel> {
    const connection = new Connection(this.solanaMainnetUrl, "confirmed");
    let tokenInfo: TokenInfoModel = { symbol: "", decimals: 0, address: "" };
    const tokenInfoResponse = await getTokenMetadata(query);
    if (
      tokenInfoResponse.name !== "Unknown Token" &&
      tokenInfoResponse.name !== ""
    ) {
      tokenInfo = {
        symbol: tokenInfoResponse.symbol || "",
        name: tokenInfoResponse.name || "",
        decimals: tokenInfoResponse.decimals || 0,
        address: tokenInfoResponse.address || "",
      };
    }

    if (isContractFormatString(query)) {
      tokenInfo.decimals = (await getTokenDecimals(
        connection,
        query
      )) as number;
    } else {
      if (isContractFormatString(tokenInfo.address)) {
        tokenInfo.decimals = (await getTokenDecimals(
          connection,
          tokenInfo.address
        )) as number;
      }
    }
    if (!tokenInfo.address) {
      throw new Error("No se han encontrado los tokens");
    }
    if (tokenInfo.decimals === 0) {
      throw new Error("No se han encontrado los decimales del token");
    }
    return tokenInfo;
  }
  public async swapTokensForTokens(
    inputMint: string,
    amount: string,
    outputMint: string
  ) {
    return swapTokensForTokens(inputMint, amount, outputMint);
  }
}
const tokenContext = new TokenContext();
export { tokenContext };
