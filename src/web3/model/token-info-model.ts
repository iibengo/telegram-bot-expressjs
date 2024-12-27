export interface TokenInfoModel {
  name?: string;
  symbol?: string;
  decimals: number;
  address: string;
  logoUri?:string
}
export const createTokenInfoModel = (): TokenInfoModel => {
  const tokenInfoEmpty: TokenInfoModel = {
    name: "",
    decimals: 0,
    address: "",
  };
  return tokenInfoEmpty;
};
