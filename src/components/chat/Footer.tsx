import { useCallback, useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../libs/redux/hooks";
import { IChatStates } from "../../common/types";
import { Box, IconButton, useMediaQuery } from "@mui/material";
import {
  setChatSettingsOpen,
  setChatState,
  setShouldPlayAudio,
  setTypedMessage,
  addNewMessage,
} from "../../libs/redux/slices/chat-slice";
import { setAlphaAccess } from "../../libs/redux/slices/user-profile-slice";
import { motion, AnimatePresence } from "framer-motion";
import { Close, Settings, Send } from "@mui/icons-material";
import ChatSettings from "./ChatSettings";
import AudioPlayerButton from "../AudioPlayerButton";
import ChatTextArea from "./ChatTextArea";
import { useWallet } from "@solana/wallet-adapter-react";
import axios from "axios";

const websocket_url = import.meta.env.VITE_WEBSOCKET_URL;
const initial_chat_messages_url = import.meta.env.VITE_CHAT_SERVER_URL;

const Footer = () => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const dispacth = useAppDispatch();
  const chatState = useAppSelector((state) => state.chat.state);
  const typedMessage = useAppSelector((state) => state.chat.typedMessage);
  const alphaAccess = useAppSelector((state) => state.profile.alphaAccess);
  const updateChatState = (state: IChatStates) => dispacth(setChatState(state));
  // const [alphaAccess, setAlphaAccess] = useState(false);
  const websiteTheme = useAppSelector((state) => state.theme.current.styles);
  const buttons = ["DEN", "PUMP.RAY", "ALPHA"];
  const dispatch = useAppDispatch();
  const isChatSettingsOpen = useAppSelector(
    (state) => state.chat.isChatSettingsOpen
  );
  const isMobile = useMediaQuery("(max-width:768px)");
  const clickAnimation = {
    scale: 0.9,
    transition: { type: "spring", stiffness: 400, damping: 10 },
  };
  const wallet = useWallet();

  const getAlpahAccessInfo = async () => {
    try {
      const response = await axios.get(initial_chat_messages_url, {
        params: {
          method: 'get_user_info',
          walletAddress: wallet?.publicKey?.toString(),
        }
      });

      if (response?.data?.alphaAccess) {
        // setAlphaAccess(response?.data?.alphaAccess);
        dispatch(setAlphaAccess(response?.data?.alphaAccess))
      }
      // console.log(">>>>>>>>>>>>>>>>>>>>> fetchedMessages <<<<<<<<<<<<<<<<<<<<<<<", response.data);

      // setGridData(fetchedMessages.reverse().slice(0, totalSlots));
      // setGridData(fetchedMessages.reverse());
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  useEffect(() => {
    getAlpahAccessInfo();
  });

  useEffect(() => {
    const socket = new WebSocket(websocket_url);
    setWs(socket);

    socket.onopen = () => {
      console.log("WebSocket connection established");
    };

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log(">>>>>>>>>>>>>>>>>>Received message footer:<<<<<<<<<<<<<<<<<<<<<<<<", message);
      // dispatch(addNewMessage(message));
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      socket.close();
    };
  }, [dispatch]);

  const handleSendMessage = () => {
    // console.log("test handle send message");
    if (ws && ws.readyState === WebSocket.OPEN) {
      const message = {
        text: typedMessage,
        walletAddress: wallet.publicKey?.toString(), // Replace with actual user wallet address
        room: chatState.toLowerCase(),
        action: "sendMessage",
      };
      ws.send(JSON.stringify(message));
      dispatch(setTypedMessage(""));

      // Trigger the message to be added to the chat state
      // dispatch(addNewMessage({
      //   _id: Date.now().toString(), // Assuming the message ID can be a timestamp, replace with actual logic
      //   message: typedMessage,
      //   username: "Your Username", // Replace with the actual username from your state
      //   profilePic: "path/to/your/profilePic.jpg", // Replace with actual profile picture URL
      // }));
    }
  };

  const handleAlphaSendMessage = () => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      const message = {
        text: typedMessage,
        walletAddress: wallet.publicKey?.toString(), // Replace with actual user wallet address
        room: chatState.toLowerCase(),
        action: "sendMessage",
      };
      ws.send(JSON.stringify(message));
      dispatch(setTypedMessage(""));

      // Trigger the message to be added to the chat state
      // dispatch(addNewMessage({
      //   _id: Date.now().toString(), // Assuming the message ID can be a timestamp, replace with actual logic
      //   message: typedMessage,
      //   username: "Your Username", // Replace with the actual username from your state
      //   profilePic: "path/to/your/profilePic.jpg", // Replace with actual profile picture URL
      // }));
    }
  };

  const handlePlayAudio = useCallback(
    (state: boolean = true) => dispatch(setShouldPlayAudio(state)),
    [dispatch]
  );
  const handlePauseAudio = useCallback(
    (state: boolean = false) => dispatch(setShouldPlayAudio(state)),
    [dispatch]
  );

  return (
    <Box className="mx-auto p-4 w-max max-w-full max-sm:w-full max-sm:px-0">
      <Box
        alignItems="flex-start"
        className="flex justify-between items-center relative gap-2 lg:gap-4 m-auto max-sm:w-full"
      >
        {!(isChatSettingsOpen && !isMobile) && (
          <AnimatePresence>
            <Box
              className="w-[60%] max-sm:flex-grow sm:w-[566px] flex-col gap-4"
              maxWidth="100%"
              display="flex"
            >
              {chatState === "DEN" && !isChatSettingsOpen && <ChatTextArea handleSendMessage={handleSendMessage} />}
              {chatState === "ALPHA" && alphaAccess && <ChatTextArea handleSendMessage={handleAlphaSendMessage} />}

              <Box className="w-full flex items-center">
                <Box
                  style={{ borderColor: websiteTheme.text_color }}
                  className={`max-sm:mx-auto h-11 mr-auto flex justify-between rounded-md sm:w-[566px] border overflow-hidden max-sm:w-full`}
                >
                  {buttons.map((button) => (
                    <Box
                      key={button}
                      style={{
                        backgroundColor:
                          chatState === button
                            ? websiteTheme.text_color
                            : "transparent",
                        color:
                          chatState === button
                            ? websiteTheme.bgColor
                            : websiteTheme.text_color,
                        borderRadius: chatState === button ? 5 : 0,
                      }}
                      className="flex-grow h-full flex place-content-center place-items-center cursor-pointer"
                      onClick={() =>
                        dispatch(setChatState(button as IChatStates))
                      }
                    >

                      <small
                        className={`uppercase text-[14px] ml-[25px] h-[30px] w-[90px] flex items-center justify-center rounded-[2px]`}
                      >
                        {button}
                      </small>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>

            {/* {chatState === 'DEN' && (
              <Box className='max-md:hidden' marginTop={isChatSettingsOpen ? 'auto' : undefined}>
                <motion.div
                  whileTap={clickAnimation}
                  style={{ borderColor: websiteTheme.text_color }}
                  className={`p-[5px] col-span-2 rounded-[4px] lg:rounded-[8px] border`}
                  onClick={handleSendMessage}
                >
                  <IconButton>
                    <Send style={{ color: websiteTheme.text_color }} />
                  </IconButton>
                </motion.div>
              </Box>
            )} */}
          </AnimatePresence>
        )}

        {chatState === "DEN" && <ChatSettings />}

        {chatState === "DEN" && (
          <Box
            className="max-md:hidden p-[5px]"
            marginTop={isChatSettingsOpen ? "auto" : undefined}
          >
            <motion.div
              whileTap={clickAnimation}

              onClick={() => dispatch(setChatSettingsOpen(!isChatSettingsOpen))}
            >
              <IconButton>
                {isChatSettingsOpen ? (
                  <Close style={{ color: websiteTheme.text_color }} />
                ) : (
                  <Settings style={{ color: websiteTheme.text_color }} />
                )}
              </IconButton>
            </motion.div>
          </Box>
        )}

        {chatState === "DEN" && !isChatSettingsOpen && (
          <motion.div
            style={{ borderColor: "transparent" }}
            whileTap={clickAnimation}
            className={`p-[5px] col-span-2 rounded-[4px] lg:rounded-[8px] border max-md:hidden`}
          >
            <AudioPlayerButton />
          </motion.div>
        )}
      </Box>
    </Box>
  );
};

export default Footer;