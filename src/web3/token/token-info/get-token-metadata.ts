import { ENV, TokenListProvider } from "@solana/spl-token-registry";
import { createTokenInfoModel, TokenInfoModel } from "../../model";
import { isContractFormatString } from "../../functions";
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import {publicKey} from '@metaplex-foundation/umi-public-keys'
import { fetchMetadata, findMetadataPda } from '@metaplex-foundation/mpl-token-metadata';

export const getTokenMetadata = async (
  query: string
): Promise<TokenInfoModel> => {
  const umi = createUmi("https://api.mainnet-beta.solana.com");
  const tokenInfo = createTokenInfoModel();

  if (isContractFormatString(query)) {
    const mintAddress = publicKey(query);

    try {
      const metadataPda = findMetadataPda(umi, { mint: mintAddress });
      const metadata = await fetchMetadata(umi, metadataPda);
      tokenInfo.name = metadata.name;
      tokenInfo.symbol = metadata.symbol;
      tokenInfo.logoUri = metadata?.uri;
      tokenInfo.address = mintAddress.toString();
    } catch (error) {
      console.error("Error fetching metadata:", error);
    }
  } else {
    // Si el query no es una dirección válida, buscamos el symbolo la Token List
    const provider = await new TokenListProvider().resolve();
    const tokenList = provider.filterByChainId(ENV.MainnetBeta).getList();

    const tokenAddress = tokenList.find(
      (token) => token.address === query
    );
    const tokens = tokenList.filter(item => item.symbol.toLocaleLowerCase() === query.toLocaleLowerCase());
    const token = tokenAddress ? tokenAddress : tokens[0];

    tokenInfo.name = token?.name;
    tokenInfo.symbol = token?.symbol;
    tokenInfo.logoUri = token?.logoURI;
    tokenInfo.address = token?.address || "";
  }

  return tokenInfo;
};
