declare module '@solana/wallet-adapter-wallets' {
    import { Wallet } from '@solana/wallet-adapter-base';
  
    export function getPhantomWallet(): Wallet;
    export function getSolletWallet(): Wallet;
  }
  