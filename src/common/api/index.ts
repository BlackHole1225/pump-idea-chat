import { buildQueryParams } from "../../utils";
import { formatResponse } from "../fomaters";
import { PumpSocketReceived, PumpTokenItem } from "../types";

const HELIUS_API_KEY = import.meta.env.VITE_HELIUS_API_KEY;
const PUMPFUN_LATEST_TOKEN_ADDRESSES_API_URL = import.meta.env.VITE_PUMPFUN_LATEST_TOKEN_ADDRESSES_API_URL;
const PUMPFUN_RAYDIUM_MIGRATION_PROGRAM_ID = import.meta.env.VITE_PUMPFUN_RAYDIUM_MIGRATION_PROGRAM_ID;
const PUMPFUN_TOKEN_IFNO_API_URL = import.meta.env.VITE_DEXSCREENER_TOKENINFO_API_URL;

export async function getPumpList(
  params: object
) {
  const query = buildQueryParams({
    type: "CREATE_POOL",
    limit: 30,
    sort: "desc",
    ...params,
  });

  const API_URL = `${PUMPFUN_LATEST_TOKEN_ADDRESSES_API_URL}/${PUMPFUN_RAYDIUM_MIGRATION_PROGRAM_ID}/transactions?${query}`;
  try {
    const response = await fetch(API_URL);
    // console.log("response", response)
    if (!response?.ok) {
      // console.error("Failed to fetch transactions:", response?.statusText);
      throw new Error(`Failed to fetch transactions: ${response?.statusText}`);
    }

    const data = await response?.json();
    const tokens = formatResponse(data as string[]);
    // console.log("fulfilledTokens", tokens)
    return {
      ok: true,
      tokens
    }
  } catch (error: any) {
    console.error(
      "Error fetching gradated Pump list:",
      error?.message || error
    );
    console.log(error instanceof Error ? error.message : "Unknown Error");
    return {
      ok: true,
      tokens: [],
      message: error instanceof Error ? error.message : "Unknown Error"
    };
  }
}

export async function getTokenInfo(tokenAddress: string) {
  const API_URL = `${PUMPFUN_TOKEN_IFNO_API_URL}/${tokenAddress}`;
  try {
    const response = await fetch(API_URL);
    // console.log("response", response)
    if (!response?.ok) {
      // console.error("Failed to fetch transactions:", response?.statusText);
      throw new Error(`Failed to token info: ${response?.statusText}`);
    }

    const data = await response?.json();
    // const tokens = formatResponse(data as string[]);
    // console.log("token info", data)
    return {
      ok: true,
      info: data?.pairs[0]
    }
  } catch (error: any) {
    console.error(
      "Error fetching gradated Pump list:",
      error?.message || error
    );
    console.log(error instanceof Error ? error.message : "Unknown Error");
    return {
      ok: true,
      data: [],
      message: error instanceof Error ? error.message : "Unknown Error"
    };
  }
}

export async function getAllPumpList(
  filter_listing: URLSearchParams,
  filter_migrated: URLSearchParams,
  callback?: (val: any) => void
) {
  try {
    // console.log("filter_listing", filter_listing)
    const result = await getPumpList(filter_migrated);
    // console.log(result);
    if (result.ok) {
      // Fetch token info for all tokens in parallel
      const tokenInfos = await Promise.all(
        result.tokens.map(async (token: string) => {
          const result = await getTokenInfo(token); // Await each getTokenInfo call
          if (result.ok) {
            if (result?.info)
              callback && callback(result.info)
            return result.info; // Return token info if the result is OK
          }
          return undefined; // Explicitly return undefined if not OK
        })
      );

      // Filter out undefined values from the results
      const validTokenInfos = tokenInfos.filter((info) => info !== undefined);
      // console.log("Fetched Valid Token Infos:", validTokenInfos);
      return {
        ok: true,
        tokens: validTokenInfos
      }
    } else {
      throw new Error("Failed getting pump token addresses")
    }

  } catch (error) {
    console.error(error instanceof Error ? error.message : "Unknown Error");
    return {
      ok: false,
      tokens: [],
      message: error instanceof Error ? error.message : "Unknown Error"
    }
  }
}
