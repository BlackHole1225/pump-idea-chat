import { useAppDispatch, useAppSelector } from "../../libs/redux/hooks";
import { setSelectedtokenToReceive } from "../../libs/redux/slices/token-swap-slice";
import { formatNumber } from "../../utils/format";
import { Box, Button, CircularProgress, LinearProgress } from "@mui/material";
import { fetchPumpTokenDetails, setPumpTokenItem } from "../../libs/redux/slices/pump-chart-slice";
import { PumpTokenItem } from "../../common/types";
import TelegramButton from "../buttons/TelegramButton";
import WebsiteButton from "../buttons/WebsiteButton";
import PumpfunButton from "../buttons/PumpfunButton";
import XButton from "../buttons/XButton";
import JupiterButton from "../buttons/JupiterButton";
// import DexScreenerButton from "../buttons/DexScreenerButton";
import DexToolButton from "../buttons/DexToolButton";
import SolanaButton from "../buttons/SolanaButton";
import { timeFrom } from "../../utils";
import JupButton from "../buttons/JupButton";
import ChartButton from "../buttons/ChartButton";
import { setTokenToReceiveDecimal, setTokenToSendDecimal } from "../../libs/redux/slices/token-swap-slice";
import { getTokenDecimals } from "../../common/api";

interface PumpCardProps {
  pumpItem: PumpTokenItem; // Define the type for the pump item
  onOpenModal: (pumpItem: PumpTokenItem) => void; // Define a more specific function type
}

export default function PumpCard({ pumpItem, onOpenModal }: PumpCardProps) {
  const theme = useAppSelector(state => state.theme.current.styles);
  const dispatch = useAppDispatch();
  const atClickBuy = async () => {
    dispatch(setSelectedtokenToReceive(pumpItem));
    const decimals = await getTokenDecimals(pumpItem?.baseToken?.address);
    console.log("token decimals", decimals);
    dispatch(setTokenToReceiveDecimal(decimals));
    dispatch(setTokenToSendDecimal(9));
  }
  const pumpChartStatus = useAppSelector(state => state.pumpChart.status);
  const pItem = useAppSelector(state => state.pumpChart.pumpItem);

  // console.log(pumpItem);

  const handleLoadAndShowChart = () => {
    dispatch(setPumpTokenItem(pumpItem));
    dispatch(fetchPumpTokenDetails(pumpItem.baseToken.address));
  };

  return (
    <div
      className="border-[1px] rounded-[10px] border-white font-jbm mx-auto isolate overflow-x-hidden"
      style={{
        maxWidth: '430px', // Ensure maximum width for desktop
        width: '100%',     // Use full width for mobile responsiveness
        height: 'auto',
        borderColor: theme.text_color,
        color: theme.text_color,
        background: theme.pump_card_bg,
        fontFamily: 'JetBrains Mono',
      }}
    >
      <div className="flex flex-col gap-[10px] p-[8px]">
        {/* <p>{pump?.info?.imageUrl}</p> */}
        <div className="flex items-center gap-1">
          <Box className="relative z-10">
            <Box className="flex items-center">
              <Box className="relative flex items-center z-[-2]" sx={{ width: 66, height: 60 }}>
                {pumpItem?.info?.imageUrl &&
                  <img src={pumpItem?.info?.imageUrl} style={{ aspectRatio: '1/1' }} alt="Token Image" className="rounded-full aspect-square" height="100%" />
                }
              </Box>
            </Box>
          </Box>
          <div className="flex flex-col gap-[2px]">
            <p className="text-[16px]" style={{ fontFamily: 'JetBrains Mono' }}>{pumpItem?.baseToken?.name}</p>
            <p className="text-[12px]" style={{ fontFamily: 'JetBrains Mono' }}>{timeFrom(pumpItem?.pairCreatedAt)}</p>
          </div>
          <div className="flex items-center ml-auto mt-9">
            <span style={{ color: theme.text_color, fontWeight: 'bold', fontSize: '16px', fontFamily: 'JetBrains Mono' }}>100%</span>
          </div>
        </div>

        <LinearProgress
          variant="determinate"
          style={{ background: theme.text_color, height: '1rem', borderRadius: '50px', border: 'solid thin' }}
          value={Number(pumpItem.priceUsd ?? 1) * 100}
        />

        <div className="flex justify-between w-[100%] mx-auto">
          <div className="flex flex-col text-center">
            <p className="text-[12px]" style={{ fontFamily: 'JetBrains Mono' }}>mcap</p>
            <p className="text-[16px]" style={{ fontFamily: 'JetBrains Mono' }}>${formatNumber(pumpItem?.fdv ?? 0)}</p>
          </div>
          <div className="flex flex-col text-center">
            <p className="text-[12px]" style={{ fontFamily: 'JetBrains Mono' }}>holders</p>
            <p className="text-[16px]" style={{ fontFamily: 'JetBrains Mono' }}>{formatNumber(0)}</p>
          </div>
          <div className="flex flex-col text-center">
            <p className="text-[12px]" style={{ fontFamily: 'JetBrains Mono' }}>volume</p>
            <p className="text-[16px]" style={{ fontFamily: 'JetBrains Mono' }}>${formatNumber(pumpItem?.volume?.h24)}</p>
          </div>
          <div className="flex flex-col text-center">
            <p className="text-[12px]" style={{ fontFamily: 'JetBrains Mono' }}>liquidity</p>
            <p className="text-[16px]" style={{ fontFamily: 'JetBrains Mono' }}>${formatNumber(pumpItem?.liquidity?.usd)}</p>
          </div>
        </div>

        <div
          className="h-[1px] w-[100%] mx-auto"
          style={{
            background: `linear-gradient(to right, ${theme.bgColor}, ${theme.text_color}, ${theme.bgColor})`,
          }}
        />

        <Box className="flex items-center justify-between">
          <Box display="flex" alignItems="center" gap=".3rem">
            {pumpItem?.info?.socials.map((item: { type: string; url: string | undefined; }) => {
              if (item.type == "telegram") {
                return <TelegramButton url={item?.url} />
              }
              if (item.type == "twitter") {
                <XButton username={item?.url} />
              }
            })}


            <WebsiteButton url={pumpItem?.info?.websites[0]} />
          </Box>
          <Box display="flex" alignItems="center" gap=".3rem">
            <DexToolButton mintAddress={pumpItem?.baseToken?.address} />
            <JupiterButton mintAddress={pumpItem?.baseToken?.address} />
            <PumpfunButton mintAddress={pumpItem?.baseToken?.address} />
            <SolanaButton mintAddress={pumpItem?.baseToken?.address} />
          </Box>
        </Box>

        <div
          className="h-[1px] w-[100%] mx-auto"
          style={{
            background: `linear-gradient(to right, ${theme.bgColor}, ${theme.text_color}, ${theme.bgColor})`,
          }}
        />

        <Box display="flex" gap="1rem" alignItems="center" justifyContent="space-between">
          <Button
            onClick={handleLoadAndShowChart}
            disabled={pumpChartStatus === 'pending'}
            className="flex"
            variant="outlined"
            style={{
              alignItems: 'center',
              borderRadius: 0,
              justifyContent: 'center',
              overflow: 'hidden',
              color: theme.text_color,
              borderColor: theme.text_color,
              fontFamily: 'JetBrains Mono',
            }}
          >
            <Box display="flex" alignItems="center" gap={1}>
              {pumpItem?.baseToken?.address === pItem?.baseToken?.address && pumpChartStatus === 'pending' ? (
                <CircularProgress size={24} thickness={10} />
              ) : (
                <ChartButton />
              )}
              <span style={{ fontFamily: 'JetBrains Mono' }}>Chart</span>
            </Box>
          </Button>

          <Button
            onClick={atClickBuy}
            title="Buy"
            variant="contained"
            style={{
              borderRadius: 0,
              flexGrow: 1,
              boxShadow: 'none',
              background: theme.text_color,
              color: theme.bgColor,
              fontFamily: 'JetBrains Mono',
            }}
          >
            <Box display="flex" alignItems="center">
              <JupButton />
              <Box ml={1.0} style={{ fontFamily: 'JetBrains Mono' }}>
                Buy
              </Box>
            </Box>
          </Button>
        </Box>
      </div>
    </div>
  );
}
