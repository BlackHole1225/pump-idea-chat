import { useRef, useEffect } from "react";
import Footer from "../components/chat/Footer";
import { Box } from "@mui/material";
import { useAppSelector, useAppDispatch } from "../libs/redux/hooks";
import PumpChannel from "../components/chat/PumpDotRay";
import DenChannel from "../components/chat/DenChannel";
import ContainedLayout from "../layouts/ContainedLayout";
import { setMusicIsPlaying } from "../libs/redux/slices/chat-slice";
import AlphaChannel from "../components/chat/AlphaChannel";

const Chat = () => {
  const dispatch = useAppDispatch();
  const chatState = useAppSelector(state => state.chat.state);
  const theme = useAppSelector(state => state.theme.current);
  const chatAudio = useAppSelector(state => state.chat.chatAudio);
  const shouldPlayAudio = useAppSelector(state => state.chat.shouldPlayAudio);
  const isMusicPlaying = useAppSelector(state => state.chat.isMusicPlaying);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (chatAudio) {
        audioRef.current.src = chatAudio;
      }
      if (shouldPlayAudio) {
        audioRef.current.play().then(() => {
          dispatch(setMusicIsPlaying(true));
        }).catch((error) => {
          console.log("Error playing audio:", error);
        });
      } else if (isMusicPlaying) {
        audioRef.current.pause();
        dispatch(setMusicIsPlaying(false));
      }
    }
    return () => {
    };
  }, [shouldPlayAudio, isMusicPlaying, chatAudio, dispatch]);

  return (
    <ContainedLayout>
      <audio ref={audioRef} loop hidden>
        <source src={chatAudio} type="audio/mpeg" />
        <source src={chatAudio} type="audio/mp3" />
      </audio>
      <Box
        style={{
          color: theme.styles.text_color,
        }}
        className={`transition-colors duration-1000 flex flex-col relative font-jbm uppercase h-full overflow-hidden`}
      >
        <Box flexGrow='1' display='flex' width='100%' overflow='hidden'>
          {chatState === 'PUMP.RAY' ? <PumpChannel /> : chatState === 'DEN' ? <DenChannel /> : chatState === 'ALPHA' ? <AlphaChannel /> : null}
        </Box>
        <Footer />
      </Box>
    </ContainedLayout>
  );
};

export default Chat;
