import { TokenListProvider } from "@solana/spl-token-registry";

export const getTokenDetailsFromRegistry = async (mintAddress: string) => {
  try {
    const tokenList = await new TokenListProvider().resolve();
    const tokens = tokenList.filterByChainId(101).getList(); // 101 Mainnet

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

