import { Box } from '@mui/material'
import { ReactNode } from 'react'
import Navbar from '../components/Navbar'


export default function ContainedLayout({ children }: { children: ReactNode }) {

    return (
        <Box
            height={'100vh'}
            maxWidth={'100vw'}
            width={'calc(1400px - 1rem)'}
            marginInline="auto"
            paddingInline={'1rem'}
            display="flex"
            justifyContent="center"  >
            <Box display='flex' flexDirection='column' overflow='hidden' width='100%' height='100%'>
                <Box className=" flex py-4 justify-end align-middle " >
                    <Navbar />
                </Box>
                <Box width="100%" flexGrow={1} overflow='hidden' >
                    {children}
                </Box>
            </Box>
        </Box>
    )
}
