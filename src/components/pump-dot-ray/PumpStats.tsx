import { Box } from '@mui/material'
import { formatNumber, formatPrice } from '../../utils/format'
import { useAppSelector } from '../../libs/redux/hooks'
import { calculatePumpTokenChanges, shortenString } from '../../utils'
import { ReactNode } from 'react'
import CopyTextButton from '../buttons/CopyTextButton'

export default function PumpStats() {

    const pumpItem = useAppSelector(state => state.pumpChart.pumpItem)
    const theme = useAppSelector(state => state.theme.current.styles)
    const percentage_changes = calculatePumpTokenChanges(pumpItem as any);

    const InfoItem = ({ left, right }: { left: ReactNode, right: ReactNode }) =>
        <Box display='flex' alignItems='center' justifyContent='space-between' style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            <Box style={{ color: theme.text_color }}>
                {left}
            </Box>
            <Box style={{ color: theme.text_color }}>
                {right}
            </Box>
        </Box>

    const getTextColor = (value: number | string) => {
        const numValue = typeof value === 'string' ? parseFloat(value) : value;
        return numValue > 0 ? 'green' : numValue < 0 ? 'red' : theme.text_color;
    }

    return (
        <Box className='flex flex-col gap-4 ' style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            <Box className='flex justify-between text-center centre'>
                <Box className='flex flex-col'>
                    <strong style={{ color: theme.text_color }}>5m</strong>
                    <small style={{ color: getTextColor(percentage_changes.change5m) }}>{percentage_changes.change5m}%</small>
                </Box>
                <Box className='flex flex-col'>
                    <strong style={{ color: theme.text_color }}>1h</strong>
                    <small style={{ color: getTextColor(percentage_changes.change1h) }}>{percentage_changes.change1h}%</small>
                </Box>
                <Box className='flex flex-col'>
                    <strong style={{ color: theme.text_color }}>6h</strong>
                    <small style={{ color: getTextColor(percentage_changes.change6h) }}>{percentage_changes.change6h}%</small>
                </Box>
                <Box className='flex flex-col'>
                    <strong style={{ color: theme.text_color }}>24h</strong>
                    <small style={{ color: getTextColor(percentage_changes.change24h) }}>{percentage_changes.change24h}%</small>
                </Box>
            </Box>
            <div style={{ backgroundImage: `linear-gradient(to right, transparent, ${theme.text_color}, transparent)`, height: 1 }}></div>
            <Box display='flex' className='flex-col gap-4 ' width={'100%'}>
                <InfoItem left="ADDRESS" right={<CopyTextButton buttonText={shortenString(String(pumpItem?.baseToken.address))} textToCopy={String(pumpItem?.baseToken.address)} />} />
                <div style={{ backgroundImage: `linear-gradient(to right, transparent, ${theme.text_color}, transparent)`, height: 1.5 }}></div>
                <InfoItem left="PRICE" right={`$${formatPrice(Number(pumpItem?.priceUsd ?? 0))}`} />
                <div style={{ backgroundImage: `linear-gradient(to right, transparent, ${theme.text_color}, transparent)`, height: 1.5 }}></div>
                <InfoItem left="MCAP" right={`$${formatNumber(pumpItem?.fdv ?? 0)}`} />
                <div style={{ backgroundImage: `linear-gradient(to right, transparent, ${theme.text_color}, transparent)`, height: 1.5 }}></div>
                <InfoItem left="LIQUIDITY" right={`$${formatNumber(Number(pumpItem?.liquidity?.usd))}`} />
                <div style={{ backgroundImage: `linear-gradient(to right, transparent, ${theme.text_color}, transparent)`, height: 1.5 }}></div>
                <InfoItem left="VOLUME" right={`$${formatNumber(pumpItem?.volume?.h24 ?? 0)}`} />
                <div style={{ backgroundImage: `linear-gradient(to right, transparent, ${theme.text_color}, transparent)`, height: 3 }}></div>
                <InfoItem left="HOLDERS" right={`${formatNumber(0)}`} />
                <div style={{ backgroundImage: `linear-gradient(to right, transparent, ${theme.text_color}, transparent)`, height: 1 }}></div>
                <InfoItem left="DEV HOLDING" right={`${0}%`} />
            </Box>
        </Box>
    )
}
