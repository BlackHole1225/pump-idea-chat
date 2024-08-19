import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate  } from "react-router-dom";
import { SolanaConnect } from "../components/ConnectButton";
import { Box, useMediaQuery } from "@mui/material";

import bgVideoMobile from '../assets/videos/mobile-blue-bg.mp4';
import bgVideoDesktop from '../assets/videos/pc-blue-bg.mp4';
import AnimatedLogo from "../components/buttons/AnimatedLogo";
import { useWallet } from "@solana/wallet-adapter-react";

export default function Landing() {
  const { publicKey, disconnect } = useWallet();
  const navigate = useNavigate();

  const isMobile = useMediaQuery("(max-width:768px)");
  const [bgSource, setBgSource] = useState(isMobile ? bgVideoMobile : bgVideoDesktop);

  const disconnectFromWallet = async () => {
    if (publicKey) {
      await disconnect();
      navigate("/");
    }
  };

  useEffect(() => {
    disconnectFromWallet()
  }, []);

  useEffect(() => {
    setBgSource(isMobile ? bgVideoMobile : bgVideoDesktop);
  }, [isMobile]);

  return (
    <div className="relative w-full h-screen isolate bg-[#0000FF]">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover object-center -z-10"
        src={bgSource}
        autoPlay
        loop
        muted
      />

      <Box className="flex centre justify-center h-full w-full">
        <Box className="m-auto">
          <div className="text-white text-center flex flex-col justify-between">
            <AnimatedLogo />
            <h1 className="text-[40px] lg:text-[80px] font-bold font-jbm uppercase">
              chat
            </h1>
            <p className="text-[15px] lg:text-[24px] uppercase font-jbm">
              autism friendly chat interface from the future
            </p>
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-white coming-soon-shadow text-[#0000FF] uppercase font-jbm text-[15px] lg:text-[24px] w-[90%] mx-auto mt-5 sm:w-full flex flex-col gap-2"
            >
              <SolanaConnect
              />
            </motion.div>      
          </div>
        </Box>
      </Box>
    </div>
  );
}