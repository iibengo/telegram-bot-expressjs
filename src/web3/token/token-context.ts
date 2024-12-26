import { Connection } from "@solana/web3.js";
import { TokenInfoModel } from "../model";
import { getTokenDetailsFromRegistry } from "./token-info";
import { getTokenDecimals } from "./token-info/get-token-decimals";
import { swapTokensForTokens } from "./swap/swap-tokens-for-tokens";

class TokenContext {
  private solanaMainnetUrl = "https://api.mainnet-beta.solana.com";
  public async getTokenInfo(mintAddress: string): Promise<TokenInfoModel> {
    const connection = new Connection(this.solanaMainnetUrl, "confirmed");
    let tokenInfo = { name: "", decimals: 0 };

    const tokenInfoName = await getTokenDetailsFromRegistry(mintAddress);
    if (tokenInfoName.name !== "Unknown Token") {
      tokenInfo = {
        name: tokenInfoName.symbol || "",
        decimals: tokenInfoName.decimals || 0,
      };
    }
    tokenInfo.decimals = await getTokenDecimals(connection, mintAddress);
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
