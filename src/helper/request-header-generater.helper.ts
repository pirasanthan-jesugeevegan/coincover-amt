export const header = (stdTxnToken) => {
  return {
    Authorization: `Bearer ${stdTxnToken}`,
  };
};
