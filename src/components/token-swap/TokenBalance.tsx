import React, { useEffect, useState } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { NativeToken } from '../../libs/redux/initial-states';
import { Box } from '@mui/material';
import { formatNumber } from '../../utils/format';
import { AccountBalanceWallet } from '@mui/icons-material';
import { useAppSelector } from '../../libs/redux/hooks';

interface TokenBalanceProps {
    walletAddress: string;
    tokenMintAddress?: string;
    connection: Connection;
}

const TokenBalance: React.FC<TokenBalanceProps> = ({ walletAddress, tokenMintAddress, connection }) => {
    const [balance, setBalance] = useState<number | null>(null);
    const theme = useAppSelector(state => state.theme.current.styles)
    const [, setError] = useState<string | null>(null);//error
    useEffect(() => {
        const fetchBalance = async () => {
            if (!walletAddress) {
                setError('Wallet address is required');
                return;
            }
            try {
                const publicKey = new PublicKey(walletAddress);
                if (tokenMintAddress && tokenMintAddress !== NativeToken.address) {
                    const tokenAccounts = await connection.getParsedTokenAccountsByOwner(publicKey, {
                        programId: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'),
                    });
                    const tokenAccount = tokenAccounts.value.find(({ account }) =>
                        account.data.parsed.info.mint === tokenMintAddress
                    );

                    if (tokenAccount) {
                        const tokenBalance = tokenAccount.account.data.parsed.info.tokenAmount.uiAmount;
                        setBalance(tokenBalance);
                    } else {
                        setBalance(0);
                    }
                } else {
                    const solBalance = await connection.getBalance(publicKey);
                    setBalance(solBalance / 1e9);
                }
            } catch (error) {
                setError((error as Error)?.message);
            }
        };
        fetchBalance();
    }, [walletAddress, tokenMintAddress, connection]);

    // if (error) {
    //     return <div>Error: {error}</div>;
    // }

    return (
        <Box fontStyle={{ color: theme.bgColor == '#0000FF' ? theme.bgColor: 'whitesmoke' }} display={'flex'} alignItems={'center'} gap={'.2rem'}>
            <AccountBalanceWallet style={{ fontSize: 13 }} /> <small>{formatNumber(Number(balance))}</small>
        </Box>
    );
};

export default TokenBalance;
