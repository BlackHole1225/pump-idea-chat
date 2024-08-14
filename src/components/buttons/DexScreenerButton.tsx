import { Link } from 'react-router-dom'
import { useAppSelector } from '../../libs/redux/hooks'
import DexScreenerIcon from '../../assets/icons/dex-screener-icon.jpg'

export default function DexScreenerButton({ mintAddress }: { mintAddress: string | undefined }) {

    const theme = useAppSelector(state => state.theme.current.styles)

    if (!mintAddress) return

    return (
        <Link target='_blank' to={``} className='relative h-[35px] w-[35px]'>
            <svg width="35" height="35" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="13" cy="13" r="12" stroke={theme.text_color} />
            </svg>
            <img className='rounded-full w-[26px] aspect-square absolute translate-x-[-50%] translate-y-[-50%] left-[50%] top-[50%]' src={DexScreenerIcon} />
        </Link>
    )
}