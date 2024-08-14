import { createSlice } from "@reduxjs/toolkit"
import { initialStates } from "../initial-states";

const appSlice = createSlice({
    name: 'app_slice',
    initialState: initialStates['appInitialState'],
    reducers: {
        setAppLoading: (state, action) => {
            state.isLoading = action.payload
        },
        setAppInitialLoading: (state, action) => {
            state.isInitLoading = action.payload
        }
    },
});

export const {
    setAppInitialLoading,
    setAppLoading
} = appSlice.actions

export default appSlice.reducer