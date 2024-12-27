import { Connection, PublicKey } from "@solana/web3.js";

export const getTokenDecimals = async (
  connection: Connection,
  mintAddress: string
):Promise<number> => {
  const mintPublicKey = new PublicKey(mintAddress);
  const tokenInfoData = await connection.getParsedAccountInfo(mintPublicKey);

  if (tokenInfoData.value && tokenInfoData.value.data) {
    if ("parsed" in tokenInfoData.value.data) {
      const parsedData = tokenInfoData.value.data.parsed.info;
      return parsedData.decimals || 0;
    } else {
      return 0;
    }
  }
  return 0
};
