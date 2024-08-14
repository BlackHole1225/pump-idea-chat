import { IconButton } from '@mui/material'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../libs/redux/hooks'

export default function SolanaButton({ mintAddress }: { mintAddress: string | undefined }) {

    const theme = useAppSelector(state => state.theme.current.styles)

    if (!mintAddress) return

    return (
        <Link target='_blank' to={`https://solscan.io/token/${mintAddress}`}>
            <IconButton style={{ border: 'solid thin red', borderColor: theme.text_color }}>
                <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M2.19304 5.91594H10.5843C10.6893 5.91594 10.7855 5.95969 10.8643 6.03844L12.1943 7.40344C12.4393 7.65719 12.2643 8.08594 11.9143 8.08594H3.52304C3.41804 8.08594 3.32179 8.04219 3.24304 7.96344L1.91304 6.59844C1.66804 6.34469 1.84304 5.91594 2.19304 5.91594ZM1.91304 4.10469L3.24304 2.73969C3.31304 2.66094 3.41804 2.61719 3.52304 2.61719H11.9055C12.2555 2.61719 12.4305 3.04594 12.1855 3.29969L10.8643 4.66469C10.7943 4.74344 10.6893 4.78719 10.5843 4.78719H2.19304C1.84304 4.78719 1.66804 4.35844 1.91304 4.10469ZM12.1855 9.88844L10.8555 11.2534C10.7768 11.3322 10.6805 11.3759 10.5755 11.3759H2.19304C1.84304 11.3759 1.66804 10.9472 1.91304 10.6934L3.24304 9.32844C3.31304 9.24969 3.41804 9.20594 3.52304 9.20594H11.9055C12.2555 9.20594 12.4305 9.63469 12.1855 9.88844Z" fill={theme.text_color} />
                </svg>
            </IconButton>
        </Link>
    )
}