import { Box, CircularProgress } from '@mui/material';
import { Key, useEffect } from 'react';
import { useAppSelector } from '../../libs/redux/hooks';
import PumpCard from './PumpCard';
// import { filterAndSortPumpList } from '../../libs/redux/slices/pump-socket-slice';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { getAllPumpList } from '../../common/api';
import { PumpTokenItem } from '../../common/types';
import PumpDetailsModal from './PumpDetailsModal';

export default function PumpTokensGrid() {

    const pools = useAppSelector(state => state?.pumpSocket.pumpList?.migrated);
    const filters = useAppSelector(state => state?.pumpSocket.searchParams.filter_listing);
    // const pumplist = filterAndSortPumpList(pools, filters);
    const [pumplist, setPumpList] = useState<PumpTokenItem[]>([]);
    const theme = useAppSelector(state => state.theme.current.styles);

    const getPumptokenAddresses = async () => {
        const result = await getAllPumpList(
            new URLSearchParams(),
            new URLSearchParams(),
            // (val) => {
            //     setPumpList(prev => [...prev, val]);
            // }
        );
        if (result.ok) {
            setPumpList(result.tokens);
        }
    }

    // console.log("pumplist", pumplist);

    const openModal = (pump: PumpTokenItem) => {
        setModalItem({ pumpItem: pump, isOpen: true });
    }

    useEffect(() => {
        getPumptokenAddresses();
    }, [])

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
        <Box className="relative flex flex-col w-full h-full gap-4 overflow-auto no-scrollbar custom-scrollbar">
            {
                pumplist?.length ?
                    <>
                        <PumpDetailsModal onRequestClose={() => setModalItem({ isOpen: false })}  {...modalItem} />
                        <Box className="grid grid-cols-1 md:grid-cols-3 items-start sm:grid-cols-2 max-sm:grid-cols-1 motion.divide-x divide-grey-500 gap-4" maxHeight="100%" flexGrow="1">
                            {

                                pumplist?.map((pump: PumpTokenItem, index: Key | null | undefined) => (
                                    <motion.div
                                        key={index}
                                        variants={cardVariants}
                                        initial="initial"
                                        animate="animate"
                                        exit="exit"
                                    >
                                        <PumpCard onOpenModal={openModal} pumpItem={pump} />
                                    </motion.div>
                                ))
                            }
                        </Box>
                    </> :
                    <Box className="flex items-center justify-center h-full">
                        <CircularProgress size={50} />
                    </Box>
            }

        </Box>
    );
}
