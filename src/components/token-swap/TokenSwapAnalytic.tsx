import React, { useEffect, useRef } from 'react';
import { Grid, Button, Collapse, CircularProgress, Skeleton, Box } from '@mui/material';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MoneyIcon from '@mui/icons-material/Money';
import { useAppSelector } from '../../libs/redux/hooks';
import { SwipeDown } from '@mui/icons-material';
import { formatNumber } from '../../utils/format';
import { parseEther } from '../../utils';
import TokenRateRefreshAndStatus from './TokenRateRefreshAndStatus';

const TokenSwapAnalytic = () => {
    const [open, setOpen] = React.useState(false);
    const tsacref = useRef<HTMLDivElement>(null);
    const theme = useAppSelector(state => state.theme.current.styles)

    const {
        tokenToSend,
        tokenToReceive,
        fetchTokenRateState,
        conversionRate,
        quoteResponse,
        fetchQuoteState,
        platformFeeAmount,
        platformFeeToken
    } = useAppSelector(state => state.tokenSwap);

    const handleClickOutside = (event: MouseEvent) => {
        if (tsacref.current && !tsacref.current.contains(event.target as Node)) {
            setOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const skeletonLoading = <Skeleton style={{ borderRadius: '50px' }} variant="rectangular" width={50} height={18} />;
    const maxToPay = parseEther(Number(quoteResponse?.inAmount || 0), Number(tokenToSend?.decimals || 0));

    const priceImpactColor = () => {
        if (Number(quoteResponse?.priceImpactPct) > 0.1) return 'red';
        if (Number(quoteResponse?.priceImpactPct) < 0.1) return 'grey';
        return 'green';
    };

    return (
        <div
            style={{ color: theme.bgColor == '#0000FF' ? theme.bgColor: theme.active_color, borderColor: theme.active_color }}
            ref={tsacref}
            className="    p-2 rounded-lg text-xs border ">
            <Button
                style={{ color: theme.bgColor == '#0000FF' ? theme.bgColor:theme.text_color }}
                onClick={() => setOpen(!open)}
                className="border-b pb-2 mb-2 cursor-pointer w-full"
            >
                <Grid container alignItems="center" justifyContent="space-between">
                    <span className=' text-xs '>
                        1 {tokenToSend?.symbol} = {fetchTokenRateState == 'pending' || !conversionRate ? <CircularProgress style={{ color: theme.text_color }} size={12} /> : formatNumber(Number(conversionRate))} {tokenToReceive?.symbol}
                    </span>
                    <Box display='flex' alignItems='center' gap='.4rem'>
                        <SwipeDown fontSize='small' className={`transform transition-transform ${open ? 'rotate-180' : ''}`} />
                        <TokenRateRefreshAndStatus />
                    </Box>
                </Grid>
            </Button>

            <Collapse in={open}>
                <div className="space-y-4 p-2">
                    <Grid container justifyContent="space-between">
                        <Grid item>
                            <Grid container alignItems="center">
                                <TrendingDownIcon fontSize='small' className="mr-2" />
                                <span>Price Impact</span>
                            </Grid>
                        </Grid>
                        <Grid item style={{ color: priceImpactColor(), fontWeight: 'bolder' }} display='flex'>
                            <strong>{(!quoteResponse?.priceImpactPct || fetchQuoteState == 'pending') ? skeletonLoading : formatNumber(quoteResponse.priceImpactPct)}</strong><strong>%</strong>
                        </Grid>
                    </Grid>

                    <Grid container justifyContent="space-between">
                        <Grid item>
                            <Grid container alignItems="center">
                                <AttachMoneyIcon fontSize='small' className="mr-2" />
                                <span>Max to pay</span>
                            </Grid>
                        </Grid>
                        <Grid item display='flex'>
                            <strong>{(!maxToPay || fetchQuoteState == 'pending') ? skeletonLoading : (Number(platformFeeAmount || 0) + Number(maxToPay)).toFixed(8)} </strong>&nbsp;<strong>{tokenToSend?.symbol}</strong>
                        </Grid>
                    </Grid>

                    <Grid container justifyContent="space-between">
                        <Grid item>
                            <Grid container alignItems="center">
                                <MoneyIcon fontSize='small' className="mr-2" />
                                <span>Platform Fees</span>
                            </Grid>
                        </Grid>
                        <Grid item display='flex' >
                            <span>{(!platformFeeAmount || fetchQuoteState == 'pending') ? skeletonLoading : formatNumber(platformFeeAmount)}</span>&nbsp;{platformFeeToken}
                        </Grid>
                    </Grid>
                </div>
            </Collapse>
        </div>
    );
};

export default TokenSwapAnalytic;