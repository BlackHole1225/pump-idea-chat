import { Box, Grid, InputBase, MenuItem, Collapse } from '@mui/material';
import { Search as SearchIcon, Launch as LaunchIcon } from '@mui/icons-material';
import { ITokenSwapInputProps } from '../../common/types';
import { useAppSelector } from '../../libs/redux/hooks';
import { useEffect, useRef } from 'react';
import { shortenString } from '../../utils';

const TokenSelection: React.FC<{
    onTokenSelect: ITokenSwapInputProps['onTokenSelect'],
    isOpen: boolean,
    onRequestClose: (state: boolean) => void
}> = ({ onTokenSelect, isOpen, onRequestClose }) => {

    const tokensList = useAppSelector(state => state.pumpSocket.pumpList?.migrated)
    const containerRef = useRef<HTMLDivElement>(null)
    const theme = useAppSelector(state => state.theme.current.styles)

    useEffect(() => {
        document.addEventListener('mousedown', (event) => {
            if (event.target !== containerRef.current && !containerRef.current?.contains(event.target as any)) {
                onRequestClose(false)
            }
        })
        return document.removeEventListener('mousedown', () => { })
    }, [onRequestClose, isOpen])

    return (
        <Collapse in={isOpen}>
            <Box ref={containerRef} className="flex mt-4 rounded-lg active " style={{ maxHeight: '20vh', color: theme.bgColor == '#0000FF' ? theme.bgColor : theme.bgColor == '#FFF' ? theme.active_color : 'whitesmoke' }} >
                <Box flexDirection="column" display='flex' overflow='hidden' width='100%' >
                    <Grid item>
                        <InputBase
                            placeholder="Find tokens by name or address"
                            startAdornment={<SearchIcon className='mr-2 text-yellow-100' />}
                            fullWidth
                            style={{ color: theme.bgColor == '#0000FF' ? theme.bgColor : theme.bgColor == '#FFF' ? theme.active_color : 'white' }}
                        />
                    </Grid>
                    <Box display='flex' flexDirection='column' gap='.5rem' width='100%' className=' no-scrollbar' overflow='auto'>
                        {tokensList?.map?.((token,) => (
                            <MenuItem key={token.baseToken.address} onClick={() => onTokenSelect(token)} value={token.baseToken.symbol} style={{ paddingInline: 0, borderRadius: '10px' }}   >
                                <Box display='flex' flexDirection='column' width='100%' gap='1rem'>
                                    <Box display='flex' alignItems='center' flexDirection='row' width='100%' >
                                        {
                                            token.info.imageUrl ?
                                                <img
                                                    className="mr-2 rounded-full w-7 h-7 aspect-square"
                                                    src={token.info.imageUrl}
                                                    alt={`${token.baseToken.symbol} token`}
                                                /> :
                                                <div className='className="mr-2 rounded-full w-7 h-7 aspect-square'>
                                                </div>
                                        }
                                        <Box display='flex' alignItems='center' justifyContent='space-between' width='100%'>
                                            <Box display='flex' flexDirection='column'>
                                                <small style={{ fontSize: 12 }}>{token.baseToken.symbol}</small>
                                                <strong style={{ fontSize: 10, opacity: .6 }}>{token.baseToken.name}</strong>
                                            </Box>
                                            <Box display='flex' gap={'.4rem'} alignItems='center' flexDirection='column'>
                                                {token?.baseToken.address && <a
                                                    target='_blank'
                                                    href={`https://solscan.io/token/${token.baseToken.address}`}
                                                    style={{ borderRadius: '50px', fontSize: 11 }}>
                                                    {shortenString(token.baseToken.address)} <LaunchIcon style={{ fontSize: 11 }} />
                                                </a>}
                                                {/* <strong style={{ fontSize: 10, opacity: .6 }}>MC - $12</strong> */}
                                            </Box>
                                        </Box>
                                    </Box>
                                    {/* <div className=" w-[100%] h-[1px] bg-gradient-to-r from-[#ffff] to-transparent  " /> */}
                                </Box>
                            </MenuItem>
                        ))}
                    </Box>
                </Box>
            </Box>
        </Collapse>
    );
};

export default TokenSelection;