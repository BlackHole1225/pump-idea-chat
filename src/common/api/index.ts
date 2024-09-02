import axios from "axios";
import { buildQueryParams } from "../../utils";
import { formatResponse } from "../fomaters";
import { TokenInfo } from "../types";

const HELIUS_API_KEY = import.meta.env.VITE_HELIUS_API_KEY;
const PUMPFUN_LATEST_TOKEN_ADDRESSES_API_URL = import.meta.env.VITE_PUMPFUN_LATEST_TOKEN_ADDRESSES_API_URL;
const PUMPFUN_RAYDIUM_MIGRATION_PROGRAM_ID = import.meta.env.VITE_PUMPFUN_RAYDIUM_MIGRATION_PROGRAM_ID;
const PUMPFUN_TOKEN_IFNO_API_URL = import.meta.env.VITE_DEXSCREENER_TOKENINFO_API_URL;
const HELIUS_API_URL = import.meta.env.VITE_HELIUS_API_URL;
const INITIAL_CHAT_MESSAGES_URL = import.meta.env.VITE_CHAT_SERVER_URL;
const COINGECKO_API_URL = import.meta.env.VITE_COINGECKO_API_URL;
// const helius_api_key = import.meta.env.VITE_HELIUS_API_KEY;

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
  filter_migrated: URLSearchParams
) {
  try {
    // console.log("filter_listing", filter_listing)
    const result = await getPumpList(filter_migrated);
    // console.log(result);
    if(result.ok) {
      // Fetch token info for all tokens in parallel
      const tokenInfos = await Promise.all(
        result.tokens.map(async (token: string) => {
          const result = await getTokenInfo(token); // Await each getTokenInfo call
          if (result.ok) {
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



export async function getTokenHoldersCountFromHelius(tokenId: string) {
  try {
    // Pagination logic
    let page = 1;
    // allOwners will store all the addresses that hold the token
    let count = 0;

    while (true) {
      const response = await fetch(`${HELIUS_API_URL}/?api-key=${HELIUS_API_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jsonrpc: "2.0",
          method: "getTokenAccounts",
          id: "helius-test",
          params: {
            page: page,
            limit: 1000,
            displayOptions: {},
            //mint address for the token we are interested in
            mint: tokenId,
          },
        }),
      });
      const data = await response.json();
      // Pagination logic. 
      if (!data.result || data.result.token_accounts.length === 0) {
        // console.log(`No more results. Total pages: ${page - 1}`);
        break;
      }
      // console.log(`Processing results from page ${page}`);
      // Adding unique owners to a list of token owners. 
      count += data.result.token_accounts.length;
      page++;
    }

    // console.log("Number of holders", count);
    // setTokenHolders(count);
    return count;

  } catch (error) {
    console.error('Error fetching token holders count from Helius API:', error);
    return 0;
  }
}

async function getTop10HoldersPercent(tokenId: string, tokenSupply: number) {
  try {
    const response = await fetch(`${HELIUS_API_URL}/?api-key=${HELIUS_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'getTokenLargestAccounts',
        params: [tokenId],
      }),
    });
    let holdersAmount = 0;
    if(!response.ok) throw new Error("failed fetching largeAccountsArray from helius");
    const { result } = await response.json();
    // console.log("Largest accounts", result);
    result.value.slice(0, 10).forEach((account: { amount: number; }, index: any) => {
      // console.log(`Rank ${index + 1}:`, 'Balance:', account.amount);
      if (account?.amount) {
        holdersAmount += Number(account?.amount);
      }
    });

    if (tokenSupply !== 0) {
      const percent = holdersAmount / tokenSupply * 100;
      // console.log("Top10Holders percent", percent);
      // setTop10Percent(Math.floor(percent));
      return percent;
    } else {
      // setTop10Percent(0);
      throw new Error("cannot get supply");
    }
  } catch (error) {
    console.log(error instanceof Error ? error.message : 'Unknown Error')
    // console.error('Error fetching top 10 holders:', error);
    return 0;
  }
}

const getTokenMetaData = async (tokenId: string) => {
  try {
    const response = await fetch(`${HELIUS_API_URL}/?api-key=${HELIUS_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 'my-id',
        method: 'getAsset',
        params: {
          id: tokenId
        },
      }),
    });
    if(!response.ok) throw new Error("fetching token info from helius failed");
    const { result } = await response.json();
    // console.log("Asset: ", result);
    return {
      ok: true,
      data: result
    };      
  } catch (error) {
    // console.log(error instanceof Error ? error.message : 'Unknown Error')
    return {
      ok: false,
      data: null,
      message: error instanceof Error ? error.message : 'Unknown Error'
    };
  }
}

export const getAlphaTokenInfo = async (tokenId: string) => {
  // console.log("get token info");
  try {
    let heliusResult = await getTokenMetaData(tokenId);
    if (!heliusResult.ok) throw new Error(heliusResult.message);
    const dexscreenerResult = await getTokenInfo(tokenId);
    if (!dexscreenerResult.ok) throw new Error(dexscreenerResult.message);
    const top10_percent = await getTop10HoldersPercent(tokenId, heliusResult.data.token_info?.supply);          // Fetch top 10 holders
    console.log(dexscreenerResult);
    const tokenInfo: TokenInfo = {
      image: dexscreenerResult.info?.info?.imageUrl,
      name: dexscreenerResult.info?.baseToken?.name,
      symbol: dexscreenerResult.info?.baseToken?.symbol,
      description: heliusResult.data.content?.metadata?.description,
      type: heliusResult.data.content?.metadata?.token_standard,
      mcap: dexscreenerResult.info?.fdv ?? 0,
      volume: dexscreenerResult.info?.volume?.h24 ?? 0,
      liquidity: dexscreenerResult.info?.liquidity?.usd ?? 0,
      price: dexscreenerResult.info?.priceUsd ?? 0,
      top10: top10_percent
    }
    return {
      ok: true,
      data: tokenInfo
    };
  } catch (error) {
    // console.log(error instanceof Error ? error.message : 'Unknown Error');
    return {
      ok: false,
      data: null,
      message: error instanceof Error ? error.message : 'Unknown Error'
    };
  }
}

export const fetchAlphaMessages = async () => {
  try {
    const response = await axios.get(INITIAL_CHAT_MESSAGES_URL, {
      params: {
        method: "get_messages",
        room: "alpha", // Replace with the actual room name or parameter you need
      },
    });

    console.log("message", response?.data)

    return {
      ok: true,
      data: response?.data
    }
  } catch (error) {
    // console.log(error instanceof Error ? error.message : 'Unknown Error');
    return {
      ok: false,
      data: null,
      message: error instanceof Error ? error.message : 'Unknown Error'
    }
  }
};

export const fetchSolPrice = async () => {
  try {
    const response = await axios.get(COINGECKO_API_URL);
    return response.data.solana.usd;
  } catch (error) {
    console.error("Error fetching SOL price:", error);
    return 0;
  }
};