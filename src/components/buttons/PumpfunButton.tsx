import { IconButton } from '@mui/material'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../libs/redux/hooks'

export default function PumpfunButton({ mintAddress }: { mintAddress: string | undefined }) {

    const theme = useAppSelector(state => state.theme.current.styles)

    if (!mintAddress) return

    return (
        <Link target='_blank' to={`https://pump.fun/${mintAddress}`}>
            <IconButton style={{ border: 'solid thin red', borderColor: theme.text_color }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.4281 9.93935L12.4261 7.93802C12.7132 7.6509 12.9361 7.31802 13.0947 6.93935C13.2539 6.56157 13.3334 6.1649 13.3334 5.74935C13.3334 4.89068 13.0339 4.16224 12.4347 3.56402C11.8356 2.96579 11.1061 2.66646 10.2461 2.66602C9.83408 2.66602 9.43897 2.74557 9.06075 2.90468C8.68208 3.06379 8.34897 3.2869 8.06141 3.57402L6.06075 5.57135L10.4281 9.93935ZM5.75475 13.3327C6.1663 13.3327 6.56141 13.2531 6.94008 13.094C7.31875 12.9353 7.65164 12.7125 7.93875 12.4253L9.94008 10.4273L5.57208 6.06002L3.57475 8.06068C3.28764 8.34779 3.06453 8.68068 2.90541 9.05935C2.7463 9.43713 2.66675 9.83379 2.66675 10.2493C2.66675 11.108 2.9663 11.8365 3.56541 12.4347C4.16453 13.0329 4.8943 13.3322 5.75475 13.3327Z" fill={theme.text_color} />
                </svg>
            </IconButton>
        </Link>
    )
}