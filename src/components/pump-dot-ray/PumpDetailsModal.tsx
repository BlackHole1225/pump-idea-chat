import { Dialog, Box, Stack, Divider, Button } from '@mui/material';
import React, { } from 'react';
import { useAppSelector } from '../../libs/redux/hooks';
import { PumpTokenItem } from '../../common/types';
// import { color } from 'framer-motion';

interface PumpDetailsModalProps {
    pumpItem?: PumpTokenItem
    isOpen: boolean,
    onRequestClose: (state: boolean) => void
}

const PumpDetailsModal: React.FC<PumpDetailsModalProps> = ({ pumpItem, isOpen, onRequestClose }) => {
    // const theme = useAppSelector(state => state.theme.current.styles)
    const theme = useAppSelector(state => state.theme.current.styles)

    if (!(isOpen && pumpItem)) return null

    return (
        <Dialog
            open={isOpen} onClose={onRequestClose}
            PaperProps={{
                style: { background: 'transparent', boxShadow:` 0 6px 10px -4px ${theme.text_color}` },
            }}
        >
            <Stack
                color={theme.text_color}
                sx={{ background: theme.menu_bg   }}
                direction='column'
                justifyItems='center'
                spacing={2}
                className='rounded-[8px] overflow-hidden uppercase w-[480px] max-w-full max-h-full p-4 shadow-sm '>
                <Box className=' flex flex-col gap-2 justify-center items-center'>
                    <img src={pumpItem.logo} alt={pumpItem.address} className="w-10 h-10 rounded-full" />
                    <p className="font-bold text-[16px]" style={{ color: theme.bgColor == '#0000FF' ? theme.bgColor:theme.text_color }}>{pumpItem.name}</p>
                    <Divider style={{ background: theme.bgColor == '#0000FF' ? theme.bgColor:theme.text_color, width: 130, height: 2, borderRadius: 50 }} />
                </Box>
                <Box className='flex-1 w-full flex overflow-auto custom-scrollbar'>
                    <p className='m-auto max-h-full min-w-full text-wrap whitespace-pre-wrap break-words font-semibold text-center' style={{ color: theme.bgColor == '#0000FF' ? theme.bgColor:theme.text_color }} >
                        {pumpItem?.social_links?.description}
                    </p>
                </Box>
                <Box style={{ background: theme.text_color }} className=' w-full -700 flex items-center justify-center rounded'>
                    <Button onClick={() => onRequestClose(false)} style={{ color: theme.bgColor == '#0000FF' ? theme.text_color:theme.bgColor, width: '100%', backgroundColor: theme.bgColor == '#0000FF' ? theme.bgColor:theme.text_color }} >
                        Cool
                    </Button>
                </Box>
            </Stack>
        </Dialog>
    );
};

export default PumpDetailsModal;