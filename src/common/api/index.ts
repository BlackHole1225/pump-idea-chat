import { buildQueryParams } from "../../utils";
import { formatResponse } from "../fomaters";
import { PumpSocketReceived, PumpTokenItem } from "../types";

const HELIUS_API_KEY = import.meta.env.VITE_HELIUS_API_KEY;
const PUMPFUN_RAYDIUM_MIGRATION_PROGRAM_ID = import.meta.env.VITE_PUMPFUN_RAYDIUM_MIGRATION_PROGRAM_ID

const apiKeyNames = [
  "api",
  "api-key",
  "apikey",
  "x-api-key",
  "auth",
  "api-gen",
  "nex-api",
];

function getRandomApiKeyHeader() {
  const randomKeyName =
    apiKeyNames[Math.floor(Math.random() * apiKeyNames.length)];
  const randomKeyValue = Math.random().toString(36).substring(2);
  return { [randomKeyName]: randomKeyValue };
}

export async function fetchTokenDetails(addr: string): Promise<PumpTokenItem> {
  const randomApiKeyHeader = getRandomApiKeyHeader();
  try {
    const res = await fetch(
      `https://gmgn.ai/defi/quotation/v1/tokens/sol/${addr}`,
      {
        headers: {
          "api-key": HELIUS_API_KEY ?? "",
          ...randomApiKeyHeader,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const tokenDetails = await res.json();

    return tokenDetails?.data?.token ?? {};
  } catch (error) {
    console.error("Error fetching Token details:", error);
    throw error;
  }
}

export async function getPumpList(params: object): Promise<PumpTokenItem[]> {
  console.log("params", params)
  const query = buildQueryParams({
    limit: 20,
    orderby: "usd_market_cap",
    direction: "desc",
    pump: "true",
    ...params,
  });
  const randomApiKeyHeader = getRandomApiKeyHeader();
  try {
    console.log("query", query)
    const res = await fetch(
      `https://gmgn.ai/defi/quotation/v1/rank/sol/pump?${query}`,
      {
        headers: {
          "api-key": HELIUS_API_KEY ?? "",
          api: Math.random().toString(36).substring(2),
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = (await res.json()) as { data: { rank: PumpTokenItem[] } };

    return data?.data?.rank ?? [];
  } catch (error: any) {
    console.error("Error fetching Pump list:", error);
    throw error;
  }
}


export async function getGradiatedPumpList(
  params: object
): Promise<PumpTokenItem[]> {
  const query = buildQueryParams({
    type: "CREATE_POOL",
    limit: 30,
    sort: "desc",
    ...params,
  });

  const API_URL = `https://api.helius.xyz/v0/addresses/${PUMPFUN_RAYDIUM_MIGRATION_PROGRAM_ID}/transactions?${query}`;
  try {
    const response = await fetch(API_URL);
    console.log("response", response)
    if (!response.ok) {
      console.error("Failed to fetch transactions:", response.statusText);
      return [];
    }

    const data = await response.json();
    const tokens = formatResponse(data as string[]);
    // const tokenDetailsPromises = tokens.map(fetchTokenDetails);
    // const tokensAndDetails = await Promise.allSettled(tokenDetailsPromises);
    // const fulfilledTokens = tokensAndDetails
    //   .filter((tokenDetail) => tokenDetail.status === "fulfilled")
    //   .map(
    //     (tokenDetail) =>
    //       (tokenDetail as PromiseFulfilledResult<PumpTokenItem>).value
    //   );
    console.log("fulfilledTokens", tokens)
    return tokens;
  } catch (error: any) {
    console.error(
      "Error fetching gradated Pump list:",
      error?.message || error
    );
    throw error;
  }
}

export async function getAllPumpList(
  filter_listing: URLSearchParams,
  filter_migrated: URLSearchParams
): Promise<PumpSocketReceived["pumpList"]> {
  try {
    console.log("filter_listing", filter_listing)
    const [migratedPumpList] = await Promise.allSettled([
      // getPumpList(filter_listing),
      getGradiatedPumpList(filter_migrated), // Make sure the function name is correctly spelled.
    ]);

    const data: PumpSocketReceived["pumpList"] = {
      pump: [],
      migrated: []
    };

    // if (pumpList.status === "fulfilled") {
    //   data.pump = pumpList.value;
    // }
    if (migratedPumpList.status === "fulfilled") {
      data.migrated = migratedPumpList.value;
    }

    return data;
  } catch (error) {
    console.error("Error fetching all Pump list:", error);
    throw error; // Re-throw the error to maintain the promise chain.
  }
}
