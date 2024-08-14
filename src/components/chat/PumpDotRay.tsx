import { Box } from '@mui/material'
import TokenExplorer from '../pump-dot-ray/PumpExplorer'
import { useAppSelector } from '../../libs/redux/hooks';
import PumpChart from '../pump-dot-ray/PumpChart';

export default function PumpDotRay() {

    const isPumpChartShown = useAppSelector(state => state.pumpChart.isPumpChartShown);

    return (
        <Box width='100%' height={'100%'}>
            {isPumpChartShown ? <PumpChart /> : <TokenExplorer />}
        </Box>
    )
}