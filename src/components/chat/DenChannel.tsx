import { Box } from '@mui/material'
import Focused from '../message-animations/Focused'
import Chaos from '../message-animations/Chaos'
import EquatorTest from '../message-animations/EquatorTest'
import { useAppSelector } from '../../libs/redux/hooks' 

export default function DenChannel() {
  const settingsModal = useAppSelector(state => state.chat.settingsModal.motion)

  return (
    <Box className='flex flex-col justify-center h-full overflow-hidden w-full ' >
      <Box className="relative overflow-y-auto w-full no-scrollbar h-full" flexGrow='1'>
        {settingsModal === "focused" ? <Focused /> : settingsModal === "chaos" ? <Chaos /> : <EquatorTest />}
        {/* <Chaos /> */}
      </Box>
    </Box>
  )
}
