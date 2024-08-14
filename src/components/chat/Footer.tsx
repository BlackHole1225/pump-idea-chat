import { useAppDispatch, useAppSelector } from "../../libs/redux/hooks";
import { IChatStates } from "../../common/types";
import { Box, IconButton, useMediaQuery } from "@mui/material";
import { setChatSettingsOpen, setChatState } from "../../libs/redux/slices/chat-slice";
import { motion, AnimatePresence } from 'framer-motion'
import { Close, Settings } from "@mui/icons-material";
import ChatSettings from "./ChatSettings";
import AudioPlayerButton from "../AudioPlayerButton";
import ChatTextArea from "./ChatTextArea";

const Footer = () => {

  const dispacth = useAppDispatch();
  const chatState = useAppSelector(state => state.chat.state);
  const updateChatState = (state: IChatStates) => dispacth(setChatState(state));
  const websiteTheme = useAppSelector(state => state.theme.current.styles);
  const buttons = ['DEN', 'PUMP.RAY', 'ALPHA'];
  const dispatch = useAppDispatch();
  const isChatSettingsOpen = useAppSelector(state => state.chat.isChatSettingsOpen);
  const isMobile = useMediaQuery("(max-width:768px)");
  const clickAnimation = {
    scale: 0.9,
    transition: { type: "spring", stiffness: 400, damping: 10 },
  };

  return (
    <Box className='mx-auto p-4 w-max max-w-full max-sm:w-full max-sm:px-0'>
      <Box alignItems='flex-start' className="flex justify-between relative gap-2 lg:gap-4 m-auto max-sm:w-full" >
        {!(isChatSettingsOpen && !isMobile) && <AnimatePresence>
          <Box className="w-[60%] max-sm:flex-grow sm:w-[566px] flex-col gap-4" maxWidth='100%' display='flex'>

            {chatState == 'DEN' && !isChatSettingsOpen && <ChatTextArea />}

            <Box className='w-full flex items-center'>
              <Box
                style={{ borderColor: websiteTheme.text_color }}
                className={`max-sm:mx-auto h-11 mr-auto flex justify-between rounded-md sm:w-[566px] border overflow-hidden max-sm:w-full`}
              >
                {buttons.map(button => {
                  return (
                    <Box
                      key={button}
                      style={{
                        backgroundColor: chatState === button ? websiteTheme.text_color : 'transparent',
                        color: chatState === button ? websiteTheme.bgColor : websiteTheme.text_color,
                        borderRadius: chatState === button ? 5 : 0
                      }}
                      className="flex-grow h-full flex place-content-center place-items-center cursor-pointer"
                      onClick={() => updateChatState(button as any)}
                    >
                      <small
                        className={`uppercase text-[14px] ml-[15px] h-[30px] w-[90px] flex items-center justify-center rounded-[2px]`}
                      >
                        {button}
                      </small>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          </Box>
        </AnimatePresence>}

        {chatState == 'DEN' && <ChatSettings />}

        {chatState == 'DEN' &&
          <Box
            className='max-md:hidden'
            marginTop={isChatSettingsOpen ? 'auto' : undefined}
          >
            <motion.div
              whileTap={clickAnimation}
              style={{ borderColor: websiteTheme.text_color }}
              className={`p-[5px] col-span-2 rounded-[4px] lg:rounded-[8px] border`}
              onClick={() => dispatch(setChatSettingsOpen(!isChatSettingsOpen))}
            >
              <IconButton>
                {isChatSettingsOpen ? <Close style={{ color: websiteTheme.text_color }} /> : <Settings style={{ color: websiteTheme.text_color }} />}
              </IconButton>
            </motion.div>
          </Box>
        }

        {chatState == 'DEN' && !isChatSettingsOpen &&
          <motion.div
            style={{ borderColor: 'transparent' }}
            whileTap={clickAnimation}
            className={`p-[5px] col-span-2 rounded-[4px] lg:rounded-[8px] border max-md:hidden`}
          >
            <AudioPlayerButton />
          </motion.div>
        }
      </Box>
    </Box>
  );
};

export default Footer;
