import React from 'react';
import { Button, Box, Stack, Divider } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../libs/redux/hooks';
import { setSlippagePercentage, setPriorityOption } from '../../libs/redux/slices/token-swap-slice';

const TokenSwapConfigs: React.FC = () => {
    const theme = useAppSelector(state => state.theme.current.styles)
    const dispatch = useAppDispatch()

    const priorities = useAppSelector(state => state.tokenSwap.settings.priorityOptions)
    const slippageOptions = useAppSelector(state => state.tokenSwap.settings.slippageOptions)
    const selectedSlippagePercent = useAppSelector(state => state.tokenSwap.settings.selectedSlippagePercent)
    const selectedPriority = useAppSelector(state => state.tokenSwap.settings.selectedPriority)
    const priorityDescription = (priorities.filter(item => selectedPriority == item.value))?.[0]?.description

    const handleSave = () => {
        // Save the configuration settings
    };

    return (
        <Stack
            direction='column'
            spacing={2}
            divider={<Divider orientation="vertical" flexItem />}
            style={{ color: theme.bgColor == '#0000FF' ? theme.bgColor: theme.text_color }}>
            <Stack direction='column' spacing={2}>
                <Stack className="text-sm mb-2">
                    <div className="text-xs font-semibold mb-2">
                        Slippage:
                    </div>
                    <Box
                        sx={{
                            background: theme.bgColor == '#0000FF' ? theme.bgColor: theme.menu_bg,
                            borderColor: theme.bgColor == '#0000FF' ? theme.bgColor: theme.text_color
                        }}
                        className="flex items-center border rounded-md ring-1 ring-black/10 dark:ring-white/5 overflow-hidden text-sm h-10">
                        {
                            slippageOptions.map(feeitem => (
                                <button
                                    onClick={() => dispatch(setSlippagePercentage(feeitem.value))}
                                    style={{
                                        background: selectedSlippagePercent == feeitem.value ? theme.active_color : '',
                                        color: selectedSlippagePercent == feeitem.value ? theme.menu_bg : theme.text_color
                                    }}
                                    className="flex-1 py-4 px-1 text-white-50 bg-[#1B1B1E] h-full relative"  >
                                    <div className="h-full w-full leading-none flex justify-center items-center">
                                        {feeitem.value}%
                                    </div>
                                </button>
                            ))
                        }
                        <div
                            style={{
                                background: slippageOptions.every(item => item.value != selectedSlippagePercent) ? theme.active_color : '',
                                color: slippageOptions.every(item => item.value != selectedSlippagePercent) ? theme.menu_bg : theme.text_color
                            }}
                            className="flex items-center justify-between cursor-text w-[130px] h-full text-white-50 bg-[#1B1B1E] px-2 text-sm relative border-l border-white/5">
                            <span className="text-xs flex-grow text-right">CUSTOM</span>
                            <input
                                onChange={({ target: { value } }) => dispatch(setSlippagePercentage(Number(value)))}
                                inputMode="decimal"
                                className="outline-none text-center h-full w-full bg-transparent py-4 px-2 text-sm rounded-lg placeholder:text-white/25 text-v2-primary  pointer-events-all"
                                placeholder="0.00%"
                                type="number"
                                value={selectedSlippagePercent}
                            />
                        </div>
                    </Box>

                    <div className="mt-2 text-xs text-v2-lily/50 flex flex-col gap-y-2">
                        <p>Higher slippage can increase the likelihood of a successful transaction, but it also raises the risk of being exposed to frontrunning or sandwich attacks.</p>
                    </div>

                    <div className="block"></div>
                </Stack>
                <Stack className="text-sm mb-2">
                    <div className="text-xs font-semibold mb-2">
                        Priority level:
                    </div>
                    <Box
                        sx={{
                            background: theme.menu_bg,
                            borderColor: theme.text_color
                        }}
                        className="flex items-center border rounded-md ring-1 ring-black/10 dark:ring-white/5 overflow-hidden text-sm h-10">
                        {
                            priorities.map(feeitem => (
                                <button
                                    onClick={() => dispatch(setPriorityOption(feeitem.value))}
                                    style={{
                                        background: selectedPriority == feeitem.value ? theme.active_color : '',
                                        color: selectedPriority == feeitem.value ? theme.menu_bg : theme.text_color
                                    }}
                                    className="flex-1 py-4 px-1 text-white-50 bg-[#1B1B1E] h-full relative"  >
                                    <div className="h-full w-full capitalize leading-none flex justify-center items-center">
                                        {feeitem.value}
                                    </div>
                                </button>
                            ))
                        }
                        {/* <div className="flex items-center justify-between cursor-text w-[130px] h-full text-white-50 bg-[#1B1B1E] px-2 text-sm relative border-l border-white/5">
                            <span className="text-xs whitespace-nowrap">MAX</span>
                            <input
                                inputMode="decimal"
                                className="outline-none text-center h-full w-full bg-transparent py-4 px-2 text-sm rounded-lg placeholder:text-white/25 text-v2-primary  pointer-events-all"
                                placeholder="0.00 SOL"
                                type="text"
                            // value=""
                            />
                        </div> */}
                    </Box>

                    <div className="mt-2 text-xs text-v2-lily/50 flex flex-col gap-y-2">
                        <p>
                            Prioritizing blockchain transactions involves setting higher fees for faster processing and quicker inclusion in the blockchain.
                        </p>
                        <p
                            className=' rounded-md border'
                            style={{ background: theme.menu_bg, padding: '.5rem', borderColor: theme.bgColor == '#0000FF' ? theme.bgColor: theme.text_color }}>
                            {priorityDescription}
                        </p>
                    </div>

                    <div className="block"></div>
                </Stack>
            </Stack>
            <Box>
                <Button
                    fullWidth
                    variant="outlined"
                    color="primary"
                    onClick={handleSave}
                    className="text-white font-bold py-2 px-4 rounded-full"
                    style={{ borderRadius: '50px', padding: '.6rem', color: theme.text_color, borderColor: theme.text_color }}
                    disableElevation
                >
                    Save Changes
                </Button>
            </Box>
        </Stack>
    );
};

export default TokenSwapConfigs;