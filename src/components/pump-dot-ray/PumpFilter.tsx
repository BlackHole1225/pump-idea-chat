import { Box, Button, Input } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../libs/redux/hooks';
import { IFilterTypes, IPumpRequestParams } from '../../common/types';
import { setSearchParams } from '../../libs/redux/slices/pump-socket-slice';

const deduplicateFilters = (filters: IFilterTypes[]): IFilterTypes[] => {
    const filterMap = new Map<string, IFilterTypes>();
    filters.forEach(filter => {
        filterMap.set(filter.name, filter);
    });
    return Array.from(filterMap.values());
};

export default function PumpFilter({ onRequestClose }: { onRequestClose: () => void }) {

    const theme = useAppSelector(state => state.theme.current.styles);
    const pumpList = useAppSelector(state => state.pumpSocket.pumpList!.migrated)
    const dispatch = useAppDispatch()
    const containerRef = useRef<HTMLDivElement>(null);

    const currentFilters = useAppSelector(state => state.pumpSocket.searchParams);
    const [filters, setFilters] = useState<IPumpRequestParams>({
        filter_listing: deduplicateFilters([
            { name: 'holder_count', type: 'number', min: null, max: null },
            { name: 'liquidity', type: 'number', min: null, max: null },
            { name: 'volume_24h', type: 'number', min: null, max: null },
            { name: 'market_cap', type: 'number', min: null, max: null },
            // { name: 'dev holding', type: 'percentage', min: null, max: null },
            ...currentFilters.filter_listing
        ]),
        filter_migrated: []
    });

    const handleInputChange = (name: IFilterTypes['name'], field: 'min' | 'max') => (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value ? parseFloat(event.target.value) : null;
        setFilters(prevFilters => ({
            ...prevFilters,
            filter_listing: prevFilters.filter_listing.map(filter => {
                if (filter.name === name) {
                    return { ...filter, [field]: value, }
                }
                return filter
            })
        }));
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                onRequestClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onRequestClose]);

    const applyFilters = () => {
        dispatch(setSearchParams(
            filters['filter_listing'].map(item => {
                if (item.max == null || item.max <= 0 || (item.min && item.max <= item.min)) {
                    const max = Math.max(...pumpList!.map(att => att[item.name]));
                    return { ...item, max };
                }
                return item;
            }).filter(item => item.min)
        ));
        onRequestClose()
    }

    const resetFilters = () => {
        onRequestClose()
        dispatch(setSearchParams([]))
    }

    return (
        <Box
            className='absolute right-0 top-0 w-[361px] max-w-[100%]  max-sm:bottom-0 max-sm:top-auto max-sm:w-full isolate'>
            <div className='fixed h-[100vh] w-[100vw] backdrop-brightness-75 left-0 top-0 -z-10' />
            <Box ref={containerRef} className='flex-col flex p-4 gap-3 h-auto rounded-lg  border '
                sx={{ background: theme.text_color, borderColor: theme.text_color }} >
                {filters.filter_listing.map(filter => (
                    <Box className='flex flex-col gap-4'>
                        <Box key={filter.name} className='grid grid-cols-5 items-center '>
                            <Box
                                sx={{ color: theme.bgColor }}
                                className="whitespace-nowrap col-span-3 text-[14px] uppercase">{filter.name !== 'holder_count' ? '$ ' : '  '}{filter.name?.replace?.('_', ' ')}</Box>
                            <Box display='flex' alignItems='center' justifyContent='space-between' className='col-span-2' gap='.6rem'>
                                <Input
                                    placeholder='min'
                                    disableUnderline
                                    type='number'
                                    inputProps={{ style: { textAlign: 'center', color: theme.bgColor } }}
                                    style={{ border: 'solid thin black', borderColor: theme.bgColor }}
                                    className='px-2 w-[80px] rounded-md input-number'
                                    value={filter.min !== null ? filter.min : ''}
                                    onChange={handleInputChange(filter.name, 'min')} />
                                <Input
                                    placeholder='max'
                                    disableUnderline
                                    type='number'
                                    inputProps={{ style: { textAlign: 'center', color: theme.bgColor } }}
                                    style={{ border: 'solid thin black', borderColor: theme.bgColor }}
                                    className='px-2 w-[80px] rounded-md input-number'
                                    value={filter.max !== null ? filter.max : ''}
                                    onChange={handleInputChange(filter.name, 'max')} />
                            </Box>
                        </Box>
                        <div className={`bg-gradient-to-r from-[${theme.bgColor}] to-transparent h-[1px]`}></div>
                    </Box>
                ))}
                <Box className='flex justify-between items-center gap-4'>
                    <Button onClick={resetFilters}
                        sx={{ flexGrow: 1, padding: '.5rem', color: '#FF0017', background: 'transparent' }}
                        disableElevation>
                        <strong >Reset</strong>
                    </Button>
                    <Button onClick={applyFilters} sx={{ flexGrow: 1, background: theme.bgColor, padding: '.5rem', color: theme.text_color }} disableElevation>Apply</Button>
                </Box>
            </Box>
        </Box>
    );
}
