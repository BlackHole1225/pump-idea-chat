import { Box } from '@mui/material'
import { useAppSelector } from '../../libs/redux/hooks';
import PumpChart from '../../components/pump-dot-ray/PumpChart';
import TokenExplorer from '../../components/pump-dot-ray/PumpExplorer';

export default function PumpRay() {
  const isPumpChartShown = useAppSelector(state => state.pumpChart.isPumpChartShown);

  return (
    <Box width='100%' height={'100%'}>
      {isPumpChartShown ? <PumpChart /> : <TokenExplorer />}
    </Box>
  )
}