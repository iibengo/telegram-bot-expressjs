import { TokenListProvider } from "@solana/spl-token-registry";

export const getTokenDetailsFromRegistry = async (query: string) => {
  try {
    const tokenList = await new TokenListProvider().resolve();
    const tokens = tokenList.filterByChainId(101).getList(); 
    const tokenInfo = tokens.find((token) => 
      token.address === query || 
      token.symbol.toLowerCase() === query.toLowerCase()
    );
    if (tokenInfo) {
      return {
        name: tokenInfo.name,
        symbol: tokenInfo.symbol,
        decimals: tokenInfo.decimals,
        address: tokenInfo.address
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

