import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";
import { useWallet } from "@solana/wallet-adapter-react";
import { useCallback, useEffect, useState } from "react";
import Loading from "./components/Loading.tsx";
import Chat from "./pages/Chat.tsx";
import { useAppDispatch, useAppSelector } from "./libs/redux/hooks.ts";
import { connectSocket } from "./libs/redux/slices/pump-socket-slice.ts";
import TokenswapStack from "./components/token-swap/TokenSwapStack.tsx";
import { ToastContainer } from "react-toastify";
import { Box, Stack } from "@mui/material";
import Landing from "./pages/Landing.tsx";
import Profile from "./pages/Profile.tsx";
import { loadInitialMessages } from "./libs/redux/slices/chat-slice.ts"; 
// import filtersSvg from "./assets/wallet-bg-big.png";

const API_URL = import.meta.env.VITE_PUMP_SEVER_URL
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

  if (!wallet.wallet) return <Navigate to="/" />
  if (isLoading || wallet.connecting) return <Loading />;
  if (!isConnected) return <Navigate to="/" />
  return <Outlet />
};

export default function App() {

  const dispatch = useAppDispatch()
  const theme = useAppSelector(state => state.theme.current.styles)
  const socketState = useAppSelector(state => state.pumpSocket.socketState)
  const loadMessages = useCallback(async () => dispatch(loadInitialMessages()), [dispatch])
  const startSocket = useCallback(async () => dispatch(connectSocket(API_URL)), [dispatch])


  useEffect(() => {
    startSocket()
    loadMessages()
  }, [loadMessages, startSocket])

  if (socketState !== 'receiving') {
    return <Loading />
  }

  console.log('EXCESS 👍👌')
  const useColor = theme.bgColor === '#0000FF' ? '#FFFF' : theme.bgColor === '#FFF' ? theme.text_color : theme.active_color

  return (
    <Stack style={{
      width: '100vw', height: '100vh', flexWrap: 'wrap',
      background: theme.bgColor,
      isolation: 'isolate'
    }}>
      <Box className=' scale-125 fixed -z-10 left-0 top-0 h-full w-full overflow-hidden'>
        <svg style={{ width: '100%', height: '100%' }} viewBox="0 0 1440 1064" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g opacity="0.16">
            <path d="M210.794 886.111H1229.93V313.894H210.794V886.111ZM1232.33 888.506H208.399V311.504H1232.33V888.506Z" fill={useColor} />
            <path d="M1231.12 806.414H209.593V804.02H1231.12V806.414Z" fill={useColor} />
            <path d="M1231.12 724.334H209.593V721.94H1231.12V724.334Z" fill={useColor} />
            <path d="M1231.12 642.244H209.593V639.85H1231.12V642.244Z" fill={useColor} />
            <path d="M1231.12 560.156H209.593V557.762H1231.12V560.156Z" fill={useColor} />
            <path d="M1231.12 478.066H209.593V475.672H1231.12V478.066Z" fill={useColor} />
            <path d="M1231.12 395.98H209.593V393.586H1231.12V395.98Z" fill={useColor} />
            <path d="M1153.75 887.305H1151.36V312.691H1153.75V887.305Z" fill={useColor} />
            <path d="M1075.17 887.309H1072.78V312.696H1075.17V887.309Z" fill={useColor} />
            <path d="M996.581 887.309H994.186V312.693H996.581V887.309Z" fill={useColor} />
            <path d="M918.01 887.305H915.614V312.687H918.01V887.305Z" fill={useColor} />
            <path d="M839.424 887.309H837.026V312.693H839.424V887.309Z" fill={useColor} />
            <path d="M760.849 887.307H758.455V312.694H760.849V887.307Z" fill={useColor} />
            <path d="M682.272 887.307H679.878V312.694H682.272V887.307Z" fill={useColor} />
            <path d="M603.692 887.307H601.298V312.694H603.692V887.307Z" fill={useColor} />
            <path d="M525.112 887.307H522.718V312.694H525.112V887.307Z" fill={useColor} />
            <path d="M446.53 887.307H444.136V312.694H446.53V887.307Z" fill={useColor} />
            <path d="M367.95 887.307H365.556V312.694H367.95V887.307Z" fill={useColor} />
            <path d="M289.373 887.307H286.979V312.694H289.373V887.307Z" fill={useColor} />
            <path d="M209.958 311.497H1230.76L1692.82 3.43661H-252.093L209.958 311.497ZM1231.49 313.891H209.234L-260 1.0455H1700.72L1231.49 313.891Z" fill={useColor} />
            <path d="M1268.48 288.99H172.256V286.603H1268.48V288.99Z" fill={useColor} />
            <path d="M1311.7 260.17H129.02V257.778H1311.7V260.17Z" fill={useColor} />
            <path d="M1362.34 226.414H78.3872V224.011H1362.34V226.414Z" fill={useColor} />
            <path d="M1422.46 186.334H18.2661V183.934H1422.46V186.334Z" fill={useColor} />
            <path d="M1495 137.963H-54.2736V135.568H1495V137.963Z" fill={useColor} />
            <path d="M1584.26 78.4492H-143.538V76.0594H1584.26V78.4492Z" fill={useColor} />
            <path d="M1153.3 313.631L1151.82 311.75L1545.81 1.29428L1547.3 3.16928L1153.3 313.631Z" fill={useColor} />
            <path d="M1074.8 313.557L1073.14 311.832L1395.51 1.37503L1397.17 3.09949L1074.8 313.557Z" fill={useColor} />
            <path d="M996.314 313.445L994.453 311.944L1245.19 1.49106L1247.05 2.9928L996.314 313.445Z" fill={useColor} />
            <path d="M917.85 313.289L915.774 312.092L1094.87 1.64056L1096.94 2.83777L917.85 313.289Z" fill={useColor} />
            <path d="M839.375 313.078L837.104 312.301L944.562 1.84024L946.824 2.62628L839.375 313.078Z" fill={useColor} />
            <path d="M760.844 312.824L758.472 312.55L794.287 2.09464L796.668 2.36871L760.844 312.824Z" fill={useColor} />
            <path d="M679.894 312.824L644.069 2.36871L646.45 2.09464L682.266 312.55L679.894 312.824Z" fill={useColor} />
            <path d="M601.362 313.086L493.913 2.62683L496.166 1.84738L603.624 312.306L601.362 313.086Z" fill={useColor} />
            <path d="M522.879 313.293L343.787 2.83905L345.862 1.63968L524.961 312.094L522.879 313.293Z" fill={useColor} />
            <path d="M444.403 313.445L193.673 2.99094L195.536 1.483L446.262 311.937L444.403 313.445Z" fill={useColor} />
            <path d="M365.918 313.561L43.5527 3.10019L45.2142 1.37793L367.578 311.83L365.918 313.561Z" fill={useColor} />
            <path d="M287.432 313.639L-106.573 3.18665L-105.09 1.30142L288.914 311.753L287.432 313.639Z" fill={useColor} />
            <path d="M-252.093 1196.57H1692.82L1230.76 888.503H209.958L-252.093 1196.57ZM1700.72 1198.96H-260L209.234 886.109H1231.49L1700.72 1198.96Z" fill={useColor} />
            <path d="M1268.48 913.395H172.256V911H1268.48V913.395Z" fill={useColor} />
            <path d="M1311.7 942.223H129.02V939.829H1311.7V942.223Z" fill={useColor} />
            <path d="M1362.34 975.98H78.3872V973.586H1362.34V975.98Z" fill={useColor} />
            <path d="M1422.46 1016.07H18.2661V1013.67H1422.46V1016.07Z" fill={useColor} />
            <path d="M1495 1064.43H-54.2736V1062.04H1495V1064.43Z" fill={useColor} />
            <path d="M1545.81 1198.7L1151.82 888.246L1153.3 886.362L1547.3 1196.82L1545.81 1198.7Z" fill={useColor} />
            <path d="M1395.51 1198.63L1073.14 888.169L1074.8 886.445L1397.17 1196.9L1395.51 1198.63Z" fill={useColor} />
            <path d="M1245.19 1198.52L994.453 888.058L996.314 886.558L1247.05 1197.01L1245.19 1198.52Z" fill={useColor} />
            <path d="M1094.87 1198.36L915.775 887.904L917.85 886.707L1096.94 1197.17L1094.87 1198.36Z" fill={useColor} />
            <path d="M944.562 1198.15L837.104 887.694L839.375 886.912L946.824 1197.37L944.562 1198.15Z" fill={useColor} />
            <path d="M794.28 1197.9L758.463 887.442L760.841 887.17L796.659 1197.62L794.28 1197.9Z" fill={useColor} />
            <path d="M646.445 1197.9L644.067 1197.62L679.884 887.17L682.263 887.442L646.445 1197.9Z" fill={useColor} />
            <path d="M496.169 1198.16L493.91 1197.37L601.363 886.915L603.621 887.698L496.169 1198.16Z" fill={useColor} />
            <path d="M345.859 1198.36L343.784 1197.17L522.88 886.708L524.955 887.905L345.859 1198.36Z" fill={useColor} />
            <path d="M195.536 1198.52L193.673 1197.01L444.406 886.557L446.266 888.057L195.536 1198.52Z" fill={useColor} />
            <path d="M45.2202 1198.63L43.5586 1196.9L365.925 886.444L367.585 888.168L45.2202 1198.63Z" fill={useColor} />
            <path d="M-105.088 1198.7L-106.57 1196.82L287.436 886.363L288.917 888.247L-105.088 1198.7Z" fill={useColor} />
            <path d="M-254.85 4.47729L-254.851 1195.52L208.399 886.668V313.331L-254.85 4.47729ZM-257.244 1200L-257.244 0L210.793 312.053V887.944L-257.244 1200Z" fill={useColor} />
            <path d="M28.9323 1008.56H26.5381V191.443H28.9323V1008.56Z" fill={useColor} />
            <path d="M87.4157 969.564H85.0215V230.436H87.4157V969.564Z" fill={useColor} />
            <path d="M135.707 937.369H133.312V262.63H135.707V937.369Z" fill={useColor} />
            <path d="M176.258 910.33H173.863V289.668H176.258V910.33Z" fill={useColor} />
            <path d="M-255.531 1028.05L-256.561 1025.89L209.083 804.139L210.112 806.302L-255.531 1028.05Z" fill={useColor} />
            <path d="M-255.717 857.33L-256.375 855.032L209.269 721.977L209.926 724.283L-255.717 857.33Z" fill={useColor} />
            <path d="M-255.934 686.584L-256.161 684.206L209.483 639.857L209.709 642.235L-255.934 686.584Z" fill={useColor} />
            <path d="M209.483 560.145L-256.161 515.796L-255.934 513.417L209.709 557.766L209.483 560.145Z" fill={useColor} />
            <path d="M209.269 478.021L-256.375 344.967L-255.717 342.668L209.926 475.715L209.269 478.021Z" fill={useColor} />
            <path d="M209.083 395.861L-256.561 174.109L-255.531 171.946L210.112 393.699L209.083 395.861Z" fill={useColor} />
            <path d="M1232.32 886.669L1695.58 1195.52V4.48291L1232.32 313.336V886.669ZM1697.97 1200L1229.92 887.946V312.055L1697.97 0V1200Z" fill={useColor} />
            <path d="M1414.2 1008.56H1411.81V191.443H1414.2V1008.56Z" fill={useColor} />
            <path d="M1355.7 969.564H1353.3V230.435H1355.7V969.564Z" fill={useColor} />
            <path d="M1307.41 937.371H1305.01V262.628H1307.41V937.371Z" fill={useColor} />
            <path d="M1266.86 910.33H1264.47V289.662H1266.86V910.33Z" fill={useColor} />
            <path d="M1696.26 1028.05L1230.62 806.302L1231.65 804.138L1697.29 1025.89L1696.26 1028.05Z" fill={useColor} />
            <path d="M1696.45 857.328L1230.81 724.282L1231.46 721.974L1697.11 855.03L1696.45 857.328Z" fill={useColor} />
            <path d="M1696.66 686.584L1231.02 642.235L1231.25 639.856L1696.89 684.205L1696.66 686.584Z" fill={useColor} />
            <path d="M1231.25 560.146L1231.02 557.763L1696.66 513.413L1696.89 515.796L1231.25 560.146Z" fill={useColor} />
            <path d="M1231.46 478.016L1230.81 475.714L1696.45 342.661L1697.11 344.964L1231.46 478.016Z" fill={useColor} />
            <path d="M1231.65 395.859L1230.62 393.697L1696.26 171.943L1697.29 174.105L1231.65 395.859Z" fill={useColor} />
          </g>
        </svg>
      </Box>
      <Box className="transition-colors duration-1000"
        sx={{
          direction: "column",
          // overflow: 'hidden',
          position: 'relative',
          // backgroundImage: chatState === 'PUMP.RAY' ? `url(${filtersSvg})` : '',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          width: '100vw', height: '100vh',
        }}>
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
  )
}