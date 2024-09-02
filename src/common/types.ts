interface TokenHolderPercentageData {
  description: string;
  data: number;
}

interface TokenHolderSummary {
  top10_with_percentage: TokenHolderPercentageData;
  top50_with_percentage: TokenHolderPercentageData;
  others_with_percentage: TokenHolderPercentageData;
  top10_supply_percentage: TokenHolderPercentageData;
  top50_supply_percentage: TokenHolderPercentageData;
  others_supply_percentage: TokenHolderPercentageData;
  top10_holders_percentage: TokenHolderPercentageData;
  top50_holders_percentage: TokenHolderPercentageData;
  others_holders_percentage: TokenHolderPercentageData;
}

type TokenSocial = {
  type: "twitter" | "telegram"; // Add more types as needed
  url: string;
};

export type PumpTokenItem = {
  baseToken: {
    address: string;
    name: string;
    symbol: string;
  };
  chainId: string;
  dexId: string;
  fdv: number;
  info: {
    imageUrl: string;
    socials: TokenSocial[];
    websites: string[];
  }
  liquidity: {
    base: number;
    quote: number;
    usd: number;
  };
  pairAddress: string;
  pairCreatedAt: number; // Assuming this is a timestamp in milliseconds
  priceChange: {
    h1: number;
    h6: number;
    h24: number;
    m5: number;
  };
  priceNative: string; // If it's a numeric string, you might consider converting it to `number`
  priceUsd: string;    // Same as above
  quoteToken: {
    address: string;
    name: string;
    symbol: string;
  };
  txns: {
    h1: {
      buys: number;
      sells: number;
    };
    h6: {
      buys: number;
      sells: number;
    };
    h24: {
      buys: number;
      sells: number;
    };
    m5: {
      buys: number;
      sells: number;
    };
  };
  url: string;
  volume: {
    h1: number;
    h6: number;
    h24: number;
    m5: number;
  };
};

export type TokenInfo = {
  image: string | undefined; // URL of the token image, can be undefined if not present
  name: string | undefined;  // Token name, can be undefined if not present
  symbol: string | undefined; // Token symbol, can be undefined if not present
  description: string | undefined; // Description of the token, can be undefined if not present
  type: string | undefined; // Token standard/type, can be undefined if not present
  mcap: number; // Market capitalization (fully diluted valuation)
  volume: number; // 24-hour trading volume
  liquidity: number; // USD value of liquidity
  price: number; // Current price in USD
  top10: number; // Percentage held by the top 10 holders
};


export type IFilterTypes = {
  min: number | null;
  max: number | null;
  name: 'holder_count' | 'liquidity' | 'volume_24h' | 'market_cap' | 'dev holding';
  type: 'number' | 'percentage';
}

export type IPumpRequestParams = {
  filter_listing: Array<IFilterTypes>;
  filter_migrated: Array<IFilterTypes>;
};

export type PumpSocketSend = {
  requestPumpList: 'requestPumpList';
  requestPumpDetails: 'requestPumpDetails';
  userJoined: { userId: string; userName: string };
}

export type PumpSocketReceived = {
  pumpList: {
    pump: PumpTokenItem[],
    migrated: PumpTokenItem[]
  };
}

export type SocketEventCallback<T = any> = (data: T) => void;

import { Socket } from 'socket.io-client';

export type UseSocketReturn<T = any> = {
  socket: Socket | null;
  connected: boolean;
  emitEvent: (event: string, data?: any) => void;
  onEvent: (event: string, callback: SocketEventCallback<T>) => () => void;
}

export type ITokenSwapInputProps = {
  side: 'receive' | 'pay';
  onChange: (value: number | string) => void;
  selectedToken: PumpTokenItem | undefined;
  onTokenSelect: (token: PumpTokenItem) => void;
  amount?: string;
  readonly?: boolean
  value: number | string
  loading?: boolean
}

export type IChatStates = "DEN" | "PUMP.RAY" | "ALPHA"