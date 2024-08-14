import { X } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../libs/redux/hooks'

export default function XButton({ username }: { username: string | undefined }) {

    const theme = useAppSelector(state => state.theme.current.styles)

    if (!username) return

    return (
        <Link target='_blank' to={`https://x.com/${username}`}>
            <IconButton style={{ border: 'solid thin red', borderColor: theme.text_color }}>
                <X color='action' style={{ color: theme.text_color, fontSize: 16 }} />
            </IconButton>
        </Link>
    )
}