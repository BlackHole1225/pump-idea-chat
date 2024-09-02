import React, { memo } from 'react';
import { useAppSelector } from '../../libs/redux/hooks';

interface PumpChartEmbedProps {
    tokenId: string;
    backgroundColor?: string;
    style?: React.CSSProperties;
    [key: string]: any;
}

const PumpChartEmbed: React.FC<PumpChartEmbedProps> = ({ tokenId, backgroundColor = 'transparent', style = {}, ...props }) => {
    const theme = useAppSelector(state => state.theme.current.styles)
    return (
        <div className="relative w-full lg:h-[390px] overflow-hidden aspect-video ">
            <iframe id="dextools-widget"
                title="DEXTools Trading Chart"
                className='w-full h-full'
                src={`https://www.dextools.io/widget-chart/en/solana/pe-light/${tokenId}?theme=light&chartType=1&chartResolution=30&drawingToolbars=false`}>
            </iframe>
        </div>
    );
};
export default memo(PumpChartEmbed);