import SolanaLogo from '../../assets/solana-sol-logo.png'
import { Connection } from "@solana/web3.js";
import { WalletContextState } from "@solana/wallet-adapter-react";
import { PumpTokenItem } from '../../common/types';

export interface IApp {
    isInitLoading: boolean,
    isLoading: boolean,

}

export interface SwapInfo {
    ammKey: string;
    label: string;
    inputMint: string;
    outputMint: string;
    inAmount: string;
    outAmount: string;
    feeAmount: string;
    feeMint: string;
}

export interface RoutePlan {
    swapInfo: SwapInfo;
    percent: number;
}

export interface QuoteSwapResponse {
    inputMint: string;
    inAmount: string;
    outputMint: string;
    outAmount: string;
    otherAmountThreshold: string;
    swapMode: string;
    platformFee: {
        amount: number,
        feeBps: number,
        fee_currency: string
    };
    priceImpactPct: string;
    routePlan: RoutePlan[];
    contextSlot: number;
    timeTaken: number;
}

export interface TokenRate {
    id: string;
    mintSymbol: string;
    vsToken: string;
    vsTokenSymbol: string;
    price: number;
}
export interface FetchTokenRateParams {
    fromMint?: string;
    toMint?: string;
}
export interface QuoteSwapPrams {
    fromMint?: string;
    toMint?: string;
    settings: ISwapSettings,
    amount: number | string
}

export interface TokenRequesSwapPrams extends QuoteSwapPrams {
    quoteResponse: QuoteSwapResponse
    connection: Connection,
    wallet: WalletContextState
}

export interface TokenSwapResponse {
    sol_scan: string | null
}

export type PriorityOptions = {
    low: 'low'
    medium: 'medium'
    fast: 'fast',
    auto: 'auto'
}

export interface ISwapSettings {
    priorityOptions: Array<{ value: keyof PriorityOptions, label: keyof PriorityOptions, description: string }>,
    slippageOptions: Array<{ value: number, label: number }>,
    selectedPriority: keyof PriorityOptions,
    selectedSlippagePercent: number
}


export interface TokenSwapState {
    tokenToSend: PumpTokenItem | undefined;
    tokenToReceive: PumpTokenItem | undefined;
    amountToSend: number;
    amountToReceive: number | string;
    loading: boolean;
    error: string | null;
    tokensList: PumpTokenItem[],
    isVisible: boolean

    fetchTokenRateState: 'error' | 'success' | 'pending' | 'idle'
    fetchTokenRateMessage: string | null
    conversionRate: number | null

    fetchQuoteState: 'error' | 'success' | 'pending' | 'idle'
    fetchQuoteMessage: string | null
    quoteResponse: QuoteSwapResponse
    platformFeeAmount: number,
    platformFeeToken: string,
    settings: ISwapSettings

    tokenSwapState: 'error' | 'success' | 'pending' | 'idle',
    tokenSwapMessage: string | null,
    tokenSwapResponse: TokenSwapResponse
}

export const NativeToken = {
    symbol: 'SOL',
    logo: SolanaLogo,
    address: 'So11111111111111111111111111111111111111112',
    mint: 'So11111111111111111111111111111111111111112',
    decimals: 9
}

export const appInitialState: IApp = {
    isInitLoading: false,
    isLoading: false
}

export const tokenSwapInitialState: TokenSwapState = {
    tokenToSend: undefined,
    tokenToReceive: undefined,
    amountToSend: 0.0001,
    amountToReceive: 0,
    loading: false,
    error: null,
    tokensList: [],
    isVisible: false,
    fetchTokenRateState: 'idle',
    fetchTokenRateMessage: null,
    conversionRate: null,
    fetchQuoteState: 'idle',
    fetchQuoteMessage: null,
    quoteResponse: {} as any,
    platformFeeAmount: 0,
    platformFeeToken: NativeToken.symbol,
    settings: {
        priorityOptions: [
            {
                value: 'low',
                label: 'low',
                description: 'Economical choice with slower transaction processing time and lower fees.'
            },
            {
                value: 'medium',
                label: 'medium',
                description: 'Balanced option offering moderate speed and cost efficiency for transactions.'
            },
            {
                value: 'fast',
                label: 'fast',
                description: 'Priority choice for fastest processing with faster fees and quicker inclusion.'
            },
            {
                value: 'auto',
                label: 'auto',
                description: 'Lets our system decide.'
            },
        ],
        slippageOptions: [
            { value: 0.5, label: 0.5 },
            { value: 1, label: 1 },
            { value: 3, label: 3 },
        ],
        selectedPriority: 'auto',
        selectedSlippagePercent: 1,
    },

    tokenSwapState: 'idle',
    tokenSwapMessage: null,
    tokenSwapResponse: {
        sol_scan: null
    }
};

export const initialStates = {
    tokenSwapInitialState,
    appInitialState
}