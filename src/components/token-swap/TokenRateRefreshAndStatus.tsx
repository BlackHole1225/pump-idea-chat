import { useCallback, useEffect, useState } from "react";
import { parseAmount } from '../../utils';
import { useAppDispatch, useAppSelector } from "../../libs/redux/hooks";
import { fetchQuoteSwap, fetchTokenRate, setAmountToReceive } from '../../libs/redux/slices/token-swap-slice';
import { CircularProgress } from "@mui/material";

export default function TokenRateRefreshAndStatus() {
  const [initCountdown,] = useState(20) //setInitCountdown
  const [timeTillRefetch, setTimeTillRefetch] = useState<number>(initCountdown);
  const theme = useAppSelector(state => state.theme.current.styles)
  const dispatch = useAppDispatch();

  const {
    tokenToSend,
    tokenToReceive,
    amountToSend,
    settings,
    tokenToReceiveDecimal,
    tokenToSendDecimal
  } = useAppSelector(state => state.tokenSwap);


  const fetchQuote = useCallback(() => {
    if (tokenToSend?.baseToken?.address && tokenToReceive?.baseToken?.address && amountToSend) {
      dispatch(fetchQuoteSwap({
        fromMint: tokenToSend?.baseToken?.address,
        toMint: tokenToReceive?.baseToken?.address,
        amount: parseAmount(amountToSend, tokenToSendDecimal),
        settings
      }));
      dispatch(fetchTokenRate({
        fromMint: tokenToSend.baseToken.address,
        toMint: tokenToReceive.baseToken.address
      }));
    } else {
      dispatch(setAmountToReceive(0));
    }
  }, [dispatch, tokenToSend, tokenToReceive, amountToSend, settings]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchQuote();
    }, 800); // Debounce duration

    return () => clearTimeout(timeoutId);
  }, [fetchQuote, amountToSend]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeTillRefetch(prev => {
        if (prev === 1) {
          fetchQuote();
          return initCountdown;
        }
        return prev > 0 ? prev - 1 : 0;
      });
    }, 1000);

    return () => {
      setTimeTillRefetch(initCountdown)
      clearInterval(interval)
    };
  }, [fetchQuote, initCountdown, amountToSend, tokenToReceive, tokenToSend]);

  return <CircularProgress variant="determinate" size={17} style={{ color: theme.bgColor == '#0000FF' ? theme.bgColor:theme.text_color }} value={((initCountdown - timeTillRefetch) / initCountdown) * 100} />
}