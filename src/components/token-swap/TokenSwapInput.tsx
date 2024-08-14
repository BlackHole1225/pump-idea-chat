import React, { useState } from 'react';
import { Box, Grid, Typography, Paper, InputBase, MenuItem, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';
import { ITokenSwapInputProps } from '../../common/types';
import TokenSelection from './TokenSelection';
import TokenBalance from './TokenBalance';
import { useWallet } from '@solana/wallet-adapter-react';
import { Connection } from '@solana/web3.js';
import { useAppSelector } from '../../libs/redux/hooks';

const StyledPaper = styled(Paper)(() => ({
    boxShadow: 'none',
    background: 'rgba(0, 0, 0, 0.45)'
}));

const StyledInput = styled(InputBase)(({ theme }) => ({
    padding: theme.spacing(1),
    width: '100%',
    color: 'white',
    fontWeight: 900
}));

const TokenSwapInput: React.FC<ITokenSwapInputProps> = ({
    side,
    onChange,
    selectedToken,
    onTokenSelect,
    amount,
    readonly,
    value,
    loading
}) => {
    const [isTokensListOpen, setIsTokensListOpen] = useState(false);
    const wallet = useWallet()

    const RPC_URL = import.meta.env.VITE_RPC_URL;
    const connection = new Connection(RPC_URL, 'confirmed')
    const theme = useAppSelector(state => state.theme.current.styles)

    const handleOnTokenSelect = (token: any) => {
        setIsTokensListOpen(false);
        onTokenSelect(token);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        if (/^\d*\.?\d*$/.test(newValue)) {
            onChange(newValue);
        }
    };

    return (
        <Box className="w-full" width={'100%'} >
            <Grid container alignItems="center" display='flex' justifyContent="space-between" style={{ marginBottom: '8px' }}>
                <Typography variant="body2" className='text-white' style={{ textTransform: 'capitalize', color: theme.bgColor == '#0000FF' ? theme.bgColor:theme.text_color }}>{side}</Typography>
                <TokenBalance
                    walletAddress={String(wallet?.publicKey?.toString?.())}
                    tokenMintAddress={String(selectedToken?.address)}
                    connection={connection}
                />
            </Grid>
            <StyledPaper style={{ borderRadius: '.5rem' }} className='bg-slate-700'>
                <Box display='flex' flexDirection='row' gap='1rem' paddingInline='.6rem' alignItems='center'>
                    <StyledInput
                        placeholder="0"
                        inputMode="decimal"
                        readOnly={readonly}
                        // pattern="^\d*\.?\d*$"
                        value={value}
                        onChange={handleInputChange}
                    />
                    {loading && (
                        <Box>
                            <CircularProgress style={{ color: theme.text_color }} size={20} thickness={10} />
                        </Box>
                    )}
                    <Box
                        onClick={() => setIsTokensListOpen(state => !state)}
                        display='flex'
                        alignItems='center'
                        paddingInline='.4rem'
                        borderRadius='50px'
                        margin='auto'
                        style={{ background: 'grey', maxHeight: '40px' }}
                    >
                        <MenuItem key={selectedToken?.symbol} value={selectedToken?.symbol}>
                            <Box gap={'.3rem'} display='flex' alignItems='center' flexDirection='row' justifyContent='center'>
                                <img
                                    className="w-5 h-5 rounded-full aspect-square"
                                    src={selectedToken?.logo}
                                    alt={`${selectedToken?.symbol} selectedToken?`}
                                />
                                <Typography variant="body2">
                                    {selectedToken?.symbol}
                                </Typography>
                            </Box>
                        </MenuItem>
                    </Box>
                </Box>
            </StyledPaper>
            <TokenSelection
                onRequestClose={setIsTokensListOpen}
                onTokenSelect={handleOnTokenSelect}
                isOpen={isTokensListOpen}
            />
            <Grid container alignItems="flex-end" justifyContent="space-between" style={{ marginTop: '1px' }}>
                <Typography variant="h5" data-testid="destination-usd-amount">
                    {amount}
                </Typography>
            </Grid>
        </Box>
    );
};

export default TokenSwapInput;
