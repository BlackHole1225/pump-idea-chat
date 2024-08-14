import { Web } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../libs/redux/hooks'

export default function WebsiteButton({ url }: { url: string | undefined }) {

    const theme = useAppSelector(state => state.theme.current.styles)

    if (!url) return

    return (
        <Link target='_blank' to={url ?? '#invalid-link'}>
            <IconButton style={{ border: 'solid thin red', borderColor: theme.text_color }}>
                <Web color='action' style={{ color: theme.text_color, fontSize: 14 }} />
            </IconButton>
        </Link>
    )
}