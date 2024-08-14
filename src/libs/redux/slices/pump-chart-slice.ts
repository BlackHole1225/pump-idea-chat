import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { PumpTokenItem } from "../../../common/types";

interface HistoricalDataPoint {
    timestamp: number;
    value: number;
}

interface PumpChartState {
    data: HistoricalDataPoint[];
    status: 'idle' | 'pending' | 'error' | 'success'
    message: string | null,
    isPumpChartShown: boolean
    pumpItem: PumpTokenItem | null
}

const initialState: PumpChartState = {
    data: [],
    status: 'idle',
    message: null,
    isPumpChartShown: false,
    pumpItem: null
};

const API_URL = import.meta.env.VITE_PUMP_SEVER_URL
export const fetchPumpTokenDetails = createAsyncThunk(
    'pump_chart/fetchPumpTokenDetails',
    async (tokenAddress: string, thumApi) => {
        try {
            const res = await axios.get<{ token_details: PumpTokenItem }>(`${API_URL}fetch-token-details?mint=${tokenAddress}`);
            return res.data.token_details;
        } catch (error) {
            return thumApi.rejectWithValue(error)
        }
    }
);

const pumpChartSlice = createSlice({
    name: 'pump_chart',
    initialState,
    reducers: {
        setPumpChartShown: (state, action: PayloadAction<boolean>) => {
            state.isPumpChartShown = action.payload
        },
        setPumpTokenItem: (state, action: PayloadAction<PumpTokenItem>) => {
            state.pumpItem = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPumpTokenDetails.pending, (state) => {
            state.isPumpChartShown = false
            state.status = 'pending';
        });
        builder.addCase(fetchPumpTokenDetails.fulfilled, (state, action: PayloadAction<PumpTokenItem>) => {
            state.status = 'success';
            state.isPumpChartShown = true
            // state.data = action.payload;
            state.pumpItem = action.payload
        });
        builder.addCase(fetchPumpTokenDetails.rejected, (state, action) => {
            state.status = 'error';
            console.log({ action })
            // state.isPumpChartShown = true
            state.message = action.error.message || 'Failed to fetch historical data';
        });
    },
});

export const {
    setPumpChartShown,
    setPumpTokenItem
} = pumpChartSlice.actions

export default pumpChartSlice.reducer;