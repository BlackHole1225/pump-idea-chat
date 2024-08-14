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

export type PumpTokenItem = {
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  price: number;
  logo: string;
  price_1m: number;
  price_5m: number;
  price_1h: number;
  price_6h: number;
  price_24h: number;
  volume_24h: number;
  swaps_5m: number;
  swaps_1h: number;
  swaps_6h: number;
  swaps_24h: number;
  liquidity: number;
  max_supply: number;
  total_supply: number;
  holder_count: number;
  biggest_pool_address: string;
  chain: string;
  creation_timestamp: number;
  open_timestamp: number;
  circulating_supply: number | null;
  high_price: number | null;
  high_price_timestamp: number | null;
  low_price: number | null;
  low_price_timestamp: number | null;
  buys_1m: number;
  sells_1m: number;
  swaps_1m: number;
  volume_1m: number;
  buy_volume_1m: number;
  sell_volume_1m: number;
  net_in_volume_1m: number;
  buys_5m: number;
  sells_5m: number;
  volume_5m: number;
  buy_volume_5m: number;
  sell_volume_5m: number;
  net_in_volume_5m: number;
  buys_1h: number;
  sells_1h: number;
  volume_1h: number;
  buy_volume_1h: number;
  sell_volume_1h: number;
  net_in_volume_1h: number;
  buys_6h: number;
  sells_6h: number;
  volume_6h: number;
  buy_volume_6h: number;
  sell_volume_6h: number;
  net_in_volume_6h: number;
  buys_24h: number;
  sells_24h: number;
  buy_volume_24h: number;
  sell_volume_24h: number;
  net_in_volume_24h: number;
  fdv: number;
  market_cap: number;
  circulating_market_cap: number | null;
  link: {
    geckoterminal: string;
    gmgn: string;
  };
  social_links: {
    id: number;
    chain: string;
    address: string;
    twitter_username: string | null;
    website: string;
    telegram: string;
    bitbucket: string | null;
    discord: string | null;
    description: string;
    facebook: string | null;
    github: string | null;
    instagram: string | null;
    linkedin: string | null;
    medium: string | null;
    reddit: string | null;
    tiktok: string | null;
    youtube: string | null;
    updated_at: number;
  };
  hot_level: number;
  is_show_alert: boolean;
  buy_tax: number | null;
  sell_tax: number | null;
  is_honeypot: number | null;
  renounced: number | null;
  top_10_holder_rate: number;
  renounced_mint: number;
  renounced_freeze_account: number;
  burn_ratio: string;
  burn_status: string;
  pool_info: {
    address: string;
    quote_address: string;
    quote_symbol: string;
    liquidity: number;
    base_reserve: string;
    quote_reserve: string;
    initial_liquidity: number;
    initial_base_reserve: string;
    initial_quote_reserve: string;
    creation_timestamp: number;
    base_reserve_value: number;
    quote_reserve_value: number;
  };
  launchpad: string;
  launchpad_status: number;
  rug_ratio: number | null;
  holder_rugged_num: number | null;
  holder_token_num: number | null;
  rugged_tokens: any[];
  creator_address: string;
  creator_balance: number;
  creator_token_balance: string;
  creator_close: boolean;
  creator_percentage: string;
  creator_token_status: string;
  dev_token_burn_amount: string;
  dev_token_burn_ratio: number;
  twitter_name_change_history: any[];
  dexscr_ad: number;
  dexscr_update_link: number;
  cto_flag: number;
  holders_info: TokenHolderSummary
}


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