import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import { useWallet } from "@solana/wallet-adapter-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import Loading from "./components/Loading.js";
import Chat from "./pages/Chat.js";
import { useAppDispatch, useAppSelector } from "./libs/redux/hooks";
import { connectSocket } from "./libs/redux/slices/pump-socket-slice.js";
import TokenswapStack from "./components/token-swap/TokenSwapStack.js";
import { ToastContainer } from "react-toastify";
import { Box, Stack, useMediaQuery } from "@mui/material";
import Landing from "./pages/Landing";
import Profile from "./pages/Profile";
import { loadInitialMessages } from "./libs/redux/slices/chat-slice";

import BlueLoopGridBgPc from "./assets/videos/blue-loop-grid-bg-pc.mp4";
import GreenLoopGridBgPc from "./assets/videos/green-loop-grid-bg-pc.mp4";
import WhiteLoopGridBgPc from "./assets/videos/white-loop-grid-bg-pc.mp4";

import BlueLoopGridBgMobile from "./assets/videos/blue-loop-grid-bg-mobile.mp4";
import GreenLoopGridBgMobile from "./assets/videos/green-loop-grid-bg-mobile.mp4";
import WhiteLoopGridBgMobile from "./assets/videos/white-loop-grid-bg-mobile.mp4";

const API_URL = import.meta.env.VITE_PUMP_SEVER_URL;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const connectWallet = async (wallet: any): Promise<boolean> => {
  try {
    if (!wallet.connected) {
      await wallet.connect();
    }
    return wallet.connected;
  } catch {
    return false;
  }
};

const ProtectedRoute: React.FC = () => {
  const wallet = useWallet();
  const [isLoading, setIsLoading] = useState(true);
  const [isConnected, setIsConnected] = useState<boolean | null>(null);

  useEffect(() => {
    connectWallet(wallet).then((connected) => {
      setIsConnected(connected);
      setIsLoading(false);
    });
  }, [wallet]);

  if (!wallet.wallet) return <Navigate to="/" />;
  if (isLoading || wallet.connecting) return <Loading />;
  if (!isConnected) return <Navigate to="/" />;
  return <Outlet />;
};

export default function App() {
  const dispatch = useAppDispatch();
  const currentTheme = useAppSelector((state) => state.theme.current);
  const socketState = useAppSelector((state) => state.pumpSocket.socketState);
  const isMobile = useMediaQuery("(max-width:768px)");

  const theme = currentTheme.styles;
  console.log("EXCESS 👍👌");

  const { blueLoopGrid, greenLoopGrid, whiteLoopGrid } = useMemo(() => {
    if (isMobile) {
      return {
        blueLoopGrid: BlueLoopGridBgMobile,
        greenLoopGrid: GreenLoopGridBgMobile,
        whiteLoopGrid: WhiteLoopGridBgMobile,
      };
    }

    return {
      blueLoopGrid: BlueLoopGridBgPc,
      greenLoopGrid: GreenLoopGridBgPc,
      whiteLoopGrid: WhiteLoopGridBgPc,
    };
  }, [isMobile]);

  const loadMessages = useCallback(
    async () => dispatch(loadInitialMessages()),
    [dispatch]
  );
  const startSocket = useCallback(
    async () => dispatch(connectSocket(API_URL)),
    [dispatch]
  );

  useEffect(() => {
    startSocket();
    loadMessages();
  }, [loadMessages, startSocket]);

  if (socketState !== "receiving") {
    return <Loading />;
  }

  return (
    <Stack
      sx={{
        width: "100vw",
        height: "100vh",
        flexWrap: "wrap",
        background: theme.bgColor,
        isolation: "isolate",
      }}
    >
      <Box
        className="fixed -z-10 left-0 top-0 h-full w-full overflow-hidden flex flex-col justify-between"
        style={{
          transform: isMobile ? "scale(2)" : "scale(1.5)",
        }}
      >
        <video
          key={`${currentTheme.name}-${isMobile}`}
          className="w-full h-full"
          autoPlay
          muted
          loop
        >
          <source
            src={
              currentTheme.name === "rem"
                ? blueLoopGrid
                : currentTheme.name === "neo"
                ? greenLoopGrid
                : whiteLoopGrid
            }
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </Box>
      <Box
        className="transition-colors duration-1000"
        sx={{
          direction: "column",
          position: "relative",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100vw",
          height: "100vh",
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/chat" element={<Chat />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <ToastContainer />
      </Box>
      <TokenswapStack />
    </Stack>
  );
}