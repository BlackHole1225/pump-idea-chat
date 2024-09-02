import { Box, Button, Tab } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../libs/redux/hooks";
import { setPumpChartShown } from "../../libs/redux/slices/pump-chart-slice";
import { ArrowBack } from "@mui/icons-material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { motion } from "framer-motion";
import { setSelectedtokenToReceive } from "../../libs/redux/slices/token-swap-slice";
import TelegramButton from "../buttons/TelegramButton";
import XButton from "../buttons/XButton";
import WebsiteButton from "../buttons/WebsiteButton";
import PumpfunButton from "../buttons/PumpfunButton";
import React, { useState } from "react";
import PumpHolders from "./PumpHolders";
import PumpStats from "./PumpStats";
import PumpChartEmbed from "./PumpChartEmbed";
import PumpDetailsModal from "./PumpDetailsModal";
import JupButton from "../buttons/JupButton";
import JupiterButton from "../buttons/JupiterButton";
//import DexScreenerButton from "../buttons/DexScreenerButton";
import DexToolButton from "../buttons/DexToolButton";
import SolanaButton from "../buttons/SolanaButton";
import { PumpTokenItem } from "../../common/types";

export default function PumpChart() {
  const pumpItem = useAppSelector((state) => state.pumpChart.pumpItem);
  const theme = useAppSelector((state) => state.theme.current.styles);
  const dispatch = useAppDispatch();
  const atClickBuy = () => dispatch(setSelectedtokenToReceive(pumpItem));
  const [value, setValue] = useState("1");

  const [isModalShown, setIsModalShown] = useState<boolean>(false);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    event;
    setValue(newValue);
  };
  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 100, opacity: 0 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
      className="grid gap-4 overflow-auto lg:grid-cols-3 max-lg:flex max-lg:flex-col max-lg:h-full no-scrollbar "
    >
      <PumpDetailsModal
        onRequestClose={() => setIsModalShown(false)}
        isOpen={isModalShown}
        pumpItem={pumpItem}
      />
      <Box className="flex flex-col gap-4 md:col-span-2 h-max ">
        <Box
          className="relative grid w-full grid-cols-3 sm:p-4 h-max sm:border max-sm:flex max-sm:flex-col"
          style={{ borderColor: theme.text_color }} // Change border color
        >
          <div className="flex items-center gap-2 col-span-2 max-w-[100%] overflow-hidden">
            <Box className="relative z-10 hover:cursor-pointer">
              <Box
                onClick={() => setIsModalShown(true)}
                className="relative flex items-center z-[-2]"
                sx={{ width: 66, height: 66 }}
              >
                <img
                  src={pumpItem?.info?.imageUrl}
                  style={{ aspectRatio: "1/1" }}
                  alt="Token Image"
                  className="rounded-full aspect-square"
                />
              </Box>
            </Box>
            <div className="flex flex-col gap-1 max-w-[100%]">
              <p className="text-[16px] max-sm:text-[12px] whitespace-nowrap max-lg:overflow-hidden text-ellipsis">
                {pumpItem?.baseToken?.symbol} ({pumpItem?.baseToken?.name})
              </p>
              {/* <p
                title={pumpItem?.social_links.description}
                className="text-[11px] max-sm:text-[9px] whitespace-nowrap  overflow-hidden w-[80%] text-ellipsis"
              >
                {pumpItem?.social_links.description}
              </p> */}
            </div>
          </div>
          <Box
            alignItems="flex-end"
            className="flex flex-col justify-center col-span-1 gap-3 align-middle max-sm:mt-4 max-sm:p-2 max-sm:flex-row max-sm:flex max-sm:justify-between max-sm:border"
            style={{ borderColor: theme.text_color }} // Change border color
          >
            <Box display="flex" alignItems="center" gap=".9rem">
              {
                pumpItem?.info?.socials?.map((social, index) => (
                  social.type === "telegram" ? <TelegramButton key={index} url={social.url} /> :
                    social.type === "twitter" ? <XButton key={index} username={social.url} /> :
                      null
                ))
              }
              {
                pumpItem?.info?.websites?.map((url, index) => (
                  <WebsiteButton key={index} url={url} />
                ))
              }
            </Box>
            <Box display="flex" alignItems="center" gap=".9rem">
              <DexToolButton mintAddress={pumpItem?.baseToken?.address} />
              <JupiterButton mintAddress={pumpItem?.baseToken?.address} />
              <PumpfunButton mintAddress={pumpItem?.baseToken?.address} />
              <SolanaButton mintAddress={pumpItem?.baseToken?.address} />
            </Box>
          </Box>
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "2px",
              background: theme.text_color, // Add bottom line with theme color
            }}
          />
        </Box>
        <Box
          className="w-full lg:h-[397px] overflow-hidden aspect-video sm:border"
          style={{ borderColor: theme.text_color }} // Change border color
        > {
            pumpItem?.pairAddress && <PumpChartEmbed tokenId={pumpItem?.pairAddress} />
          }
        </Box>
        <Box
          className="w-full"
          style={{ overflowY: "auto", maxHeight: "calc(100vh - 200px)" }}
        >
          <Box className="grid grid-cols-3 gap-4">
            <Button
              variant="outlined"
              className="flex justify-center gap-2 align-middle"
              style={{
                alignItems: "center",
                borderRadius: 0,
                overflow: "hidden",
                color: theme.text_color,
                borderColor: theme.text_color,
                padding: "8px 12px", // Reduce padding
              }}
              onClick={() => dispatch(setPumpChartShown(false))}
            >
              <ArrowBack /> Back
            </Button>
            <Button
              style={{
                color: theme.bgColor,
                background: theme.text_color,
                padding: "8px 12px", // Reduce padding
                minWidth: "fit-content", // Ensure it fits content without overflow
              }}
              disableElevation
              variant="contained"
              className="flex justify-center col-span-2 gap-2 align-middle"
              onClick={atClickBuy}
            >
              <JupButton />
              Buy
            </Button>
          </Box>
        </Box>
      </Box>
      <Box
        className="p-4 border md:col-span-1 lg:w-full lg:h-full"
        style={{ borderColor: theme.text_color }} // Change border color
      >
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: theme.text_color, // Change underline color
                position: "relative",
                "& .MuiTabs-indicator": {
                  backgroundColor: theme.text_color, // Ensure active tab underline color is consistent
                },
              }}
            >
              <TabList onChange={handleChange} centered>
                <Tab
                  label="Token info"
                  value="1"
                  style={{ color: theme.text_color, flexGrow: 1 }}
                />
                <Tab
                  label="Holders"
                  value="2"
                  style={{ color: theme.text_color, flexGrow: 1 }}
                />
              </TabList>
            </Box>
            <TabPanel value="1">
              <PumpStats />
            </TabPanel>
            <TabPanel value="2">
              <PumpHolders />
            </TabPanel>
          </TabContext>
        </Box>
      </Box>
    </motion.div>
  );
}
