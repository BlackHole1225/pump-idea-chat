export const formatResponse = (data: any[]) => data?.map(item => {
  for (const transfer of item.tokenTransfers) {
      if (transfer.mint.endsWith("pump")) {
          return transfer.mint;
      }
  }
  return;
}).filter(i => i !== undefined);