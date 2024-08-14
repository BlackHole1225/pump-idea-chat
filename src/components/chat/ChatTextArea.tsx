import { useAppDispatch, useAppSelector } from '../../libs/redux/hooks';
import { motion } from 'framer-motion';
import { setTypedMessage } from '../../libs/redux/slices/chat-slice';
import { Box, IconButton } from '@mui/material';
import { emitChatEvent } from '../../libs/redux/slices/chat-socket-slice';
import { useCallback, useRef } from 'react';
import messageAudio from '../../assets/msg.mp3';

export default function ChatTextArea() {
  const theme = useAppSelector(state => state.theme.current.styles);
  const typedMessage = useAppSelector(state => state.chat.typedMessage);
  const dispatch = useAppDispatch();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const MAX_LETTERS = 100;

  const isLink = (message: string) => {
    const urlPattern = /https?:\/\/[^\s]+/;
    return urlPattern.test(message);
  };

  const handleSendMessage = useCallback(() => {
    if (isLink(typedMessage)) {
      // You can also show an alert or notification here
      console.warn("Links are not allowed in the chat.");
      return;
    }
    
    // Play the message audio tone
    const audio = new Audio(messageAudio);
    audio.play().catch(error => console.error("Error playing audio:", error));

    dispatch(emitChatEvent('sendMessage', typedMessage));
  }, [typedMessage, dispatch]);

  const handleInput = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = event.target;
    dispatch(setTypedMessage(textarea.value));
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [dispatch]);

  const clickAnimation = {
    scale: 0.9,
    transition: { type: "spring", stiffness: 400, damping: 10 },
  };

  const countLetters = () => typedMessage.split('').filter(char => char !== ' ').length;

  const isButtonDisabled = () => {
    return !typedMessage.length || countLetters() > MAX_LETTERS;
  };

  return (
    <Box
      sx={{ borderColor: theme.text_color, backdropFilter: `blur(2px)` }}
      className='flex gap-2 border items-end rounded-[8px] overflow-hidden'>
      <motion.textarea
        ref={textareaRef}
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -100, opacity: 0 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
        placeholder="say something retarded..."
        value={typedMessage}
        className='flex-1 font-jbm uppercase bg-transparent overflow-auto no-scrollbar pl-3 line-clamp-3 min-h-min w-full outline-none resize-none text-[16px] my-auto max-h-[120px]'
        onInput={handleInput}
        rows={1}
      />
      <motion.div
        style={{ opacity: isButtonDisabled() ? .3 : 1 }}
        whileTap={isButtonDisabled() ? undefined : clickAnimation}
        onClick={handleSendMessage}>
        <IconButton disabled={isButtonDisabled()}>
          <svg width="35" height="35" viewBox="0 0 40 35" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.8">
              <g filter="url(#filter0_d_5368_529)">
                <rect x="4" width="36" height="36" rx="8" fill={theme.text_color} />
              </g>
              <g clipPath="url(#clip0_5368_529)">
                <path d="M27.9999 18L17.3333 8V28L27.9999 18Z" fill={theme.bgColor} />
              </g>
            </g>
          </svg>
        </IconButton>
      </motion.div>
    </Box>
  );
}
