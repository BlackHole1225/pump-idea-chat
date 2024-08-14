import { Box, IconButton, useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SettingsClosed from "./SettingsClosed";
import SettingsIcon from "./SettingsIcon";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../libs/redux/hooks";
import { setChatSettingsOpen } from "../libs/redux/slices/chat-slice";
import AudioPlayerButton from "./AudioPlayerButton";
import Bottle from "../components/buttons/bottle";

const Navbar = () => {
  const isMobile = useMediaQuery("(max-width:768px)");
  const websiteTheme = useAppSelector((state) => state.theme.current.styles);
  const clickAnimation = {
    scale: 0.9,
    transition: { type: "spring", stiffness: 400, damping: 10 },
  };
  const [liveUsersCount, setLiveUsersCount] = useState<number>(0);
  const dispatch = useAppDispatch();
  const isChatSettingsOpen = useAppSelector((state) => state.chat.isChatSettingsOpen);

  useEffect(() => {
    // Simulate user count updates
    const interval = setInterval(() => {
      setLiveUsersCount((prevCount) => prevCount + Math.floor(Math.random() * (70 - 50 + 1)) + 50);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const MobileNav = () => {
    return (
      <div className="mx-auto flex justify-between items-center sticky w-full">
        <div>
          <Bottle />
        </div>
        <div className="flex items-center gap-[10px]">
          <div className="h-[10px] w-[10px] bg-[#00FF00] rounded-full"></div>
          <p style={{ color: websiteTheme.text_color }}>{liveUsersCount} Online</p>
        </div>
        <div className="grid grid-cols-4 opacity-80 gap-2">
          <motion.div
            whileTap={clickAnimation}
            className={`p-[5px] col-span-2 rounded-[4px] lg:rounded-[8px]`}  >
            <AudioPlayerButton />
          </motion.div>
          <motion.button
            whileTap={clickAnimation}
            className={`p-[5px] col-span-2 rounded-[4px] lg:rounded-[8px]`}
          >
            <IconButton onClick={() => dispatch(setChatSettingsOpen(!isChatSettingsOpen))}>
              {isChatSettingsOpen ? (
                <SettingsClosed color={websiteTheme.text_color} />
              ) : (
                <SettingsIcon color={websiteTheme.text_color} />
              )}
            </IconButton>
          </motion.button>
        </div >
      </div >
    );
  };

  return isMobile ? (
    <MobileNav />
  ) : (
    <Box
      style={{
        color: websiteTheme.text_color,
      }}
      className="uppercase flex  text-[14px] sm:text-[16px] gap-4 lg:gap-6 xl:gap-8 lg:text-[18px] xl:text-[20px] w-full"
    >
      <Box className="flex justify-between gap-4 overflow-hidden w-full">
        <div>
          <Bottle />
        </div>
        <Box className="flex justify-between gap-10 overflow-hidden my-4">
          <Link to={"/profile"}>
            <p style={{ fontFamily: 'JetBrains Mono, monospace' }}>profile</p>
          </Link>
          <Link to={"/"}>
            <p style={{ fontFamily: 'JetBrains Mono, monospace' }}>exit</p>
          </Link>
        </Box>

      </Box>
    </Box>
  );
};

export default Navbar;
