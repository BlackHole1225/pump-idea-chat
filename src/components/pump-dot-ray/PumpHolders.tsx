import { Box } from '@mui/material';
import { PieChart, Pie, Cell, Label } from 'recharts';
//import MapIcon from '@mui/icons-material/Map';
import { useAppSelector } from '../../libs/redux/hooks';

export default function PumpHolders() {
    const pumpHolders = useAppSelector(state => state.pumpChart.pumpItem?.holders_info);
    const theme = useAppSelector(state => state.theme.current.styles)

    const pieData = [
        { value: Number(pumpHolders?.top10_holders_percentage.data ?? 0), label: 'TOP 10', color: '#00FF00' },
        { value: Number(pumpHolders?.top50_holders_percentage.data ?? 0), label: 'TOP 50', color: '#FFFFFF' },
        { value: Number(pumpHolders?.others_holders_percentage.data ?? 0), label: 'OTHERS', color: '#F7FF05' }
    ];

    const dominantSection = pieData.reduce((max, data) => (data.value > max.value ? data : max), pieData[0]);

    return (
        <Box className='flex-col gap-4 m-auto flex justify-center' width={'100%'} alignItems='center'>
            <Box>
                <PieChart width={300} height={370}>
                    <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={90}
                        dataKey="value"
                        endAngle={450}>
                        {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                        <Label
                            position={'center'}
                            style={{
                                fontSize: '13px',
                                fontWeight: 'bold',
                                textAlign: 'center',
                                fill: theme.text_color,
                                width: 20
                            }}
                            allowReorder="yes">
                            {`${dominantSection.value.toFixed(2)}%\n${dominantSection.label}`}
                        </Label>
                    </Pie>

                </PieChart>
                <Box className='flex gap-2 items-center justify-evenly '>
                    {pieData?.map(data => (
                        <Box className='flex items-start justify-start gap-1'>
                            <Box className='w-3 aspect-square mt-1' sx={{ background: data.color }} />
                            <Box display='flex' flexDirection='column' >
                                <span className=' text-[14px]'>{data.label}</span>
                                <span className=' text-[14px]'>{data.value}%</span>
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Box>
            {/* <Button variant="outlined" className="flex align-middle gap-2 justify-center w-full" sx={{ color: theme.text_color, borderColor: theme.text_color }}>
                <MapIcon /> View on bubblemaps
            </Button> */}
        </Box>
    );
}
