export const isContractFormatString = (contract: string): boolean => {
    return contract.length >= 32 && contract.length <= 44;
  };