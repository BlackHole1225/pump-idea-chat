import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import io, { Socket } from 'socket.io-client';
import { AppDispatch } from '../store';
import { IFilterTypes, IPumpRequestParams, PumpSocketReceived, PumpSocketSend, PumpTokenItem } from '../../../common/types';

const saveFiltersToLocalStorage = (filters: IFilterTypes[]) => {
    try {
        localStorage.setItem('_p_f', btoa(JSON.stringify(filters)));
    } catch (error) {
        console.error('Error saving filters to local storage', error);
    }
};

const loadFiltersFromLocalStorage = (): IFilterTypes[] => {
    try {
        const serializedFilters = localStorage.getItem('_p_f');
        if (serializedFilters === null) {
            return [];
        }
        return JSON.parse(atob(serializedFilters));
    } catch (error) {
        console.error('Error loading filters from local storage', error);
        return [];
    }
};

type PumpSocketStates = 'idle' | 'error' | 'receiving' | 'ready'

interface PumpSocketState {
    socket: Socket | null;
    connected: boolean;
    pumpList: PumpSocketReceived['pumpList'] | null;
    searchParams: IPumpRequestParams,
    socketState: PumpSocketStates
}

const initialState: PumpSocketState = {
    socket: null,
    connected: false,
    pumpList: null,
    searchParams: {
        filter_listing: loadFiltersFromLocalStorage(),
        filter_migrated: []
    },
    socketState: 'idle'
};

const socketIoSlice = createSlice({
    name: 'pumpSocket',
    initialState,
    reducers: {
        setSocket: (state, action: PayloadAction<Socket | null>) => {
            state.socket = action.payload as any;
        },
        setConnected: (state, action: PayloadAction<boolean>) => {
            state.connected = action.payload;
        },
        setPumpList: (state, action: PayloadAction<PumpSocketReceived['pumpList']>) => {
            state.pumpList = action.payload;
        },
        setSearchParams: (state, action: PayloadAction<IPumpRequestParams['filter_listing']>) => {
            saveFiltersToLocalStorage((state.searchParams.filter_listing = action.payload));
        },
        setPumpSocketState: (state, action: PayloadAction<PumpSocketStates>) => {
            state.socketState = action.payload;
        },
    },
});

export const { setSocket, setConnected, setPumpList, setPumpSocketState, setSearchParams } = socketIoSlice.actions;

export const filterAndSortPumpList = (pumpList: PumpTokenItem[] | undefined, filters: IFilterTypes[]): PumpTokenItem[] => {
    if (!pumpList) return []

    const filteredPumpList = pumpList.filter(item => {
        return filters.every(filter => {
            const value = getFilterValue(item, filter.name);
            if (value === undefined) return false;
            if (filter.min !== null && value < filter.min) return false;
            if (filter.max !== null && value > filter.max) return false;
            return true;
        });
    });

    const sortedPumpList = filteredPumpList.sort((a, b) => {
        for (const filter of filters) {
            const aValue = getFilterValue(a, filter.name);
            const bValue = getFilterValue(b, filter.name);

            if (aValue !== undefined && bValue !== undefined) {
                if (filter.type === 'number' || filter.type === 'percentage') {
                    if (aValue > bValue) return 1;
                    if (aValue < bValue) return -1;
                }
            }
        }
        return 0;
    });

    return sortedPumpList;
};
const getFilterValue = (item: PumpTokenItem, filterName: IFilterTypes['name']): number | undefined => {
    switch (filterName) {
        case 'holder_count':
            return item.holder_count;
        case 'liquidity':
            return item.liquidity;
        case 'volume_24h':
            return item.volume_24h;
        case 'market_cap':
            return item.market_cap;
        case 'dev holding':
            return item.creator_balance; // Assuming `creator_balance` is what is meant by 'dev holding'
        default:
            return undefined;
    }
};

export const connectSocket = (serverUrl: string) => async (dispatch: AppDispatch) => {

    const socketInstance = io(serverUrl, {
        autoConnect: true,
        upgrade: true,
    });

    socketInstance.on('connect', () => {
        dispatch(emitEvent('requestPumpList'))
        dispatch(setConnected(true));
    });

    socketInstance.on('disconnect', () => {
        dispatch(setConnected(false));
    });

    socketInstance.on('pumpList', (data: PumpSocketReceived['pumpList']) => {
        dispatch(setPumpSocketState('receiving'))
        dispatch(setPumpList(data));
    });

    dispatch(setSocket(socketInstance));

    return () => {
        socketInstance.disconnect();
    };
};

export const emitEvent = <K extends keyof PumpSocketSend>(event: K, data?: any) => (dispatch: AppDispatch, getState: () => { pumpSocket: PumpSocketState }) => {
    dispatch
    const { socket } = getState().pumpSocket;
    if (socket) {
        socket.emit(event, data);
    }
};

export const onEvent = <K extends keyof PumpSocketReceived>(event: K, callback: (data: PumpSocketReceived[K]) => void) => (dispatch: AppDispatch, getState: () => { pumpSocket: PumpSocketState }) => {
    dispatch
    const { socket } = getState().pumpSocket;
    if (socket) {
        const typedCallback: (data: any) => void = (data) => callback(data as PumpSocketReceived[K]);
        socket.on(event, typedCallback as any);
        return () => {
            socket.off(event, typedCallback as any);
        };
    }
    return () => { };
};

export default socketIoSlice.reducer;