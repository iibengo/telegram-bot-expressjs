import { Connection, PublicKey } from "@solana/web3.js";
import { ENV, TokenListProvider } from "@solana/spl-token-registry";
import { Metaplex } from "@metaplex-foundation/js";
import { createTokenInfoModel, TokenInfoModel } from "../../model";
import { isContractFormatString } from "../../functions";

export const getTokenMetadata = async (
  query: string
): Promise<TokenInfoModel> => {
  const connection = new Connection("https://api.mainnet-beta.solana.com");

  const tokenInfo = createTokenInfoModel();
  const metaplex = Metaplex.make(connection);
  let metadataAccountInfo;

  if (isContractFormatString(query)) {
    const mintAddress = new PublicKey(query);

    const metadataAccount = metaplex
      .nfts()
      .pdas()
      .metadata({ mint: mintAddress });
    metadataAccountInfo = await connection.getAccountInfo(metadataAccount);
  }

  if (metadataAccountInfo) {
    const mintAddress = new PublicKey(query);
    const token = await metaplex
      .nfts()
      .findByMint({ mintAddress: mintAddress });
    tokenInfo.name = token.name;
    tokenInfo.symbol = token.symbol;
    tokenInfo.logoUri = token.json?.image;

    tokenInfo.address = token?.address?.toString() || "";
  } else {
    const provider = await new TokenListProvider().resolve();
    const tokenList = provider.filterByChainId(ENV.MainnetBeta).getList();
    const tokenAddress = tokenList.find(
      (token) =>
        token.address === query
    );
    const tokens = tokenList.filter(item=>item.symbol.toLocaleLowerCase()===query.toLocaleLowerCase()) 
    const token =tokenAddress?tokenAddress:tokens[0];
    tokenInfo.name = token?.name;
    tokenInfo.symbol = token?.symbol;
    tokenInfo.logoUri = token?.logoURI;
    tokenInfo.address = token?.address || "";
  }
  return tokenInfo;
};
