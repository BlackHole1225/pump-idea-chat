import { Box } from '@mui/material';
import { useAppSelector } from '../../libs/redux/hooks';
import PumpCard from './PumpCard';
import { filterAndSortPumpList } from '../../libs/redux/slices/pump-socket-slice';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { PumpTokenItem } from '../../common/types';
import PumpDetailsModal from './PumpDetailsModal';

export default function PumpTokensGrid() {

    const pools = useAppSelector(state => state?.pumpSocket.pumpList?.migrated);
    const filters = useAppSelector(state => state?.pumpSocket.searchParams.filter_listing);
    const pumplist = filterAndSortPumpList(pools, filters);
    const theme = useAppSelector(state => state.theme.current.styles);

    const [modalItem, setModalItem] = useState<{
        isOpen: boolean,
        pumpItem?: PumpTokenItem
    }>({
        isOpen: false
    })

    const cardVariants = {
        initial: {
            opacity: 0,
        },
        animate: {
            opacity: 1,
            borderColor: theme.bgColor,
            x: [0, -10, 10, -10, 10, 0],
            transition: {
                x: { duration: 0.6 },
                boxShadow: { duration: 0.6 },
                type: "spring",
                stiffness: 300,
                damping: 30,
            },
        },
        exit: {
            opacity: 0,
            transition: { duration: 0.2 },
        },
    };

    return (
        <Box className="flex flex-col gap-4 overflow-auto no-scrollbar relative h-full w-full">
            <PumpDetailsModal onRequestClose={() => setModalItem({ isOpen: false })}  {...modalItem} />
            <Box className="grid grid-cols-1 md:grid-cols-3 items-start sm:grid-cols-2 max-sm:grid-cols-1 motion.divide-x divide-grey-500 gap-4" maxHeight="100%" flexGrow="1">
                {pumplist?.map(pump => (
                    <motion.div
                        key={`${String(pump.market_cap).concat(String(pump.net_in_volume_1m)).concat(String(pump.liquidity)).concat(String(pump.price_1m))}`}
                        variants={cardVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                    >
                        <PumpCard onOpenModal={(pumpItem) => setModalItem({ pumpItem, isOpen: true })} {...pump} />
                    </motion.div>
                ))}
            </Box>
        </Box>
    );
}
