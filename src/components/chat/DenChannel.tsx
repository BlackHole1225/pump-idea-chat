import { Box } from '@mui/material'
import Focused from '../message-animations/Focused'
import Chaos from '../message-animations/Chaos'
import GlobalChat from '../message-animations/Equator'
import { useAppSelector } from '../../libs/redux/hooks'

export default function DenChannel() {
  const settingsModal = useAppSelector(state => state.chat.settingsModal.motion)

  return (
    <Box className='flex flex-col justify-center h-full overflow-hidden w-full ' >

      {settingsModal === "focused" ? <Focused /> : settingsModal === "chaos" ? <Chaos /> : <GlobalChat />}
      {/* <Chaos /> */}
    </Box>
  )
}
