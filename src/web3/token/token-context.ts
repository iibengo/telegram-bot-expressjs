import { Connection } from "@solana/web3.js";
import { TokenInfoModel } from "../model";
import { getTokenDetailsFromRegistry } from "./token-info";
import { getTokenDecimals } from "./token-info/get-token-decimals";
import { swapTokensForTokens } from "./swap/swap-tokens-for-tokens";
import { isContract } from "../functions";

class TokenContext {
  private solanaMainnetUrl = "https://api.mainnet-beta.solana.com";
  public async getTokenInfo(query: string): Promise<TokenInfoModel> {
    const connection = new Connection(this.solanaMainnetUrl, "confirmed");
    let tokenInfo: TokenInfoModel = { symbol: "", decimals: 0 ,address:""};

    const tokenInfoResponse = await getTokenDetailsFromRegistry(query);
    if (tokenInfoResponse.name !== "Unknown Token") {
      tokenInfo = {
        symbol: tokenInfoResponse.symbol || "",
        decimals: tokenInfoResponse.decimals || 0,
        address: tokenInfoResponse.address || "",
      };
    }
    if (isContract(query)) {
      tokenInfo.decimals = await getTokenDecimals(connection, query);
    } else {
      if (isContract(tokenInfo.address)) {
        tokenInfo.decimals = await getTokenDecimals(connection, tokenInfo.address);
      }
    }
    console.dir(tokenInfo)
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
