export interface GetQuoteOperationServiceResponse {
  input: {
    name?: string;
    address:string;
    symbol?:string;
  };
  output: {
    name?: string;
    address:string;
    symbol?:string;
  };
  outputAmount: number;
}
