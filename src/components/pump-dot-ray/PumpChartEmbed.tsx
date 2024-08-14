import React, { useRef, useState } from 'react';
import { useAppSelector } from '../../libs/redux/hooks';
import { CircularProgress } from '@mui/material';

interface PumpChartEmbedProps {
    src: string;
    backgroundColor?: string;
    style?: React.CSSProperties;
    [key: string]: any;
}

const PumpChartEmbed: React.FC<PumpChartEmbedProps> = ({ src, backgroundColor = 'transparent', style = {}, ...props }) => {
    const iframeRef = useRef<HTMLIFrameElement | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const theme = useAppSelector(state => state.theme.current.styles)

    const handleLoad = () => {
        setIsLoading(false);
        if (iframeRef.current) {
            const iframeDocument = iframeRef.current.contentDocument || iframeRef.current.contentWindow?.document;
            if (iframeDocument) {
                // Create a <style> element
                const styleElement = iframeDocument.createElement('style');
                styleElement.innerHTML = `
                    
                    img {
                      display: none !important;
                    }
                `;
                // Append the <style> element to the <head> of the iframe document
                iframeDocument.head.appendChild(styleElement);
            }
        }
    };

    return (
        <div className="relative w-full lg:h-[390px] overflow-hidden aspect-video ">
            {isLoading && (
                <div
                    style={{ background: theme.bgColor }}
                    className="absolute inset-0 flex items-center justify-center  ">
                    <CircularProgress style={{ color: theme.text_color }} thickness={25} />
                </div>
            )}
            <iframe
                ref={iframeRef}
                style={{
                    background: backgroundColor,
                    width: '100%',
                    height: '100%',
                    border: 'none',
                    ...style,
                }}
                src={src}
                title={`Chart`}
                onLoad={handleLoad}
                {...props}
            ></iframe>
        </div>
    );
};

export default PumpChartEmbed;