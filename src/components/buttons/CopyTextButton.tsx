
import { Check, CopyAll } from '@mui/icons-material';
import { Box, Button, CircularProgress, IconButton } from '@mui/material';
import { ReactNode, useState } from 'react';
import { promise } from '../../utils';
import { useAppSelector } from '../../libs/redux/hooks';

interface CopyButtonProps {
    textToCopy: string;
    buttonText?: ReactNode;
}

const CopyTextButton: React.FC<CopyButtonProps> = ({ textToCopy, buttonText = "" }) => {
    const [isCopied, setIsCopied] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const theme = useAppSelector(state => state.theme.current.styles)


    const handleCopy = async () => {
        setIsLoading(true);
        try {
            await navigator.clipboard.writeText(textToCopy);
            await promise(1)
            setIsCopied(true);
            setIsLoading(false);
            await promise(1)
            setIsCopied(false);
        } catch (error) {
            console.error('Failed to copy text:', error);
            setIsLoading(false);
        }
    };

    return (
        <Box className='flex items-center'>
            {buttonText} <IconButton onClick={handleCopy} style={{ color: theme.text_color }} >{isLoading ? <CircularProgress thickness={10} size={24} /> : isCopied ? <Check /> : <CopyAll />}</IconButton>
        </Box>
    );
};
Button
export default CopyTextButton;

