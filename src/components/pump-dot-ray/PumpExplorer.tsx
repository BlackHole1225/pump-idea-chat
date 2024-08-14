import { Box, IconButton, Typography } from "@mui/material";
import { useAppSelector } from "../../libs/redux/hooks";
import { Close, FilterAlt } from "@mui/icons-material";
import { useState } from "react";
import PumpFilter from "./PumpFilter";
import PumpTokensGrid from "./PumpTokensGrid";
import PumFilterChip from "./PumFilterChip"; 

export default function TokenExplorer() {
  const filters = useAppSelector(state => state.pumpSocket.searchParams.filter_listing)
  const theme = useAppSelector(state => state?.theme.current.styles)
  const [isFilterShown, setIsFilterShown] = useState(false)

  return (
    <Box
      className="container overflow-hidden mx-auto h-full"  >
      <Box className="flex flex-col h-full  overflow-hidden w-full ">
        <Box className="flex items-center justify-between mb-4">
        <Box display='flex' flexDirection='column' gap='.6rem' alignContent='center'>
          <Box display='flex' gap='.6rem' alignContent='center'>
            <Typography variant="h5" className="text-[20px]" style={{ fontFamily: "JetBrains Mono" }}>
              <strong>Pump.Ray</strong>
            </Typography>
          </Box>
          <Typography variant="body2" className="text-[20px]" style={{ fontFamily: "JetBrains Mono" }}>
            Latest pump.fun tokens to hit raydium
          </Typography>
        </Box>

          <Box>
            <IconButton onClick={() => setIsFilterShown(state => !state)} sx={{ border: 'solid thin', borderColor: theme.text_color }}>
              {isFilterShown ? <Close sx={{ color: theme.text_color }} /> : <FilterAlt sx={{ color: theme.text_color }} />}
            </IconButton>
          </Box>
        </Box>


        {filters.length > 0 && <Box className='py-2 gap-4 flex flex-wrap w-full justify-start'>
          {filters.map(filter => <PumFilterChip  {...filter} />)}
        </Box>
        }

        <Box className='overflow-hidden h-full flex relative w-full'>
          <PumpTokensGrid />
          {isFilterShown && <PumpFilter onRequestClose={() => setIsFilterShown(false)} />}
        </Box>
      </Box>
    </Box>
  )
}
