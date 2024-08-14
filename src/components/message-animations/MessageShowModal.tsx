import { Dialog, Box, Stack, Divider, Button } from '@mui/material';
import React, { } from 'react';
import { useAppSelector } from '../../libs/redux/hooks';
import { Message } from '../../libs/redux/slices/chat-slice';

interface MessageShowModalProps {
    message: Message,
    isOpen: boolean,
    onRequestClose: (state: boolean) => void
}

const MessageShowModal: React.FC<MessageShowModalProps> = ({ message, isOpen, onRequestClose }) => {
    // const theme = useAppSelector(state => state.theme.current.styles)
    const themes = useAppSelector(state => state.theme.themes)
    const selectTheme = themes.filter(theme => theme.name === 'rem')?.[0]
    const theme = selectTheme.styles

    return (
        <Dialog open={isOpen} onClose={onRequestClose} >
            <Stack color={theme.bgColor} sx={{ background: theme.text_color }} direction='column' justifyItems='center' spacing={2} className='rounded-lg overflow-hidden uppercase w-[480px] max-w-full h-[428px] max-h-full p-4'>
                <Box className=' flex flex-col gap-2 justify-center items-center'>
                    <img src={message.profilePic} alt={message.username} className="w-10 h-10 rounded-full" />
                    <p className="font-bold text-[16px] ">{message.username}</p>
                    <Divider style={{ background: theme.bgColor, width: 130, height: 2, borderRadius: 50 }} />
                </Box>
                <Box className='flex-1 w-full flex overflow-auto custom-scrollbar'>
                    <p className='m-auto max-h-full min-w-full text-wrap whitespace-pre-wrap break-words font-semibold ' >
                        {message.message}
                        {message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}{message.message}
                    </p>
                </Box>
                <Box style={{ background: theme.bgColor }} className=' w-full -700 flex items-center justify-center rounded '>
                    <Button onClick={() => onRequestClose(false)} style={{ color: theme.text_color, width: '100%' }} >
                        back to chat
                    </Button>
                </Box>
            </Stack>
        </Dialog>
    );
};

export default MessageShowModal;