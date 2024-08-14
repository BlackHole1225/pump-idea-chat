import { configureStore } from '@reduxjs/toolkit'
import tokenSwapSlice from './slices/token-swap-slice'
import appSlice from './slices/app-slice'
import themeSlice from './slices/theme-slice'
import userProfileSlice from './slices/user-profile-slice'
import audioSlice from './slices/audio-slice'
import chatSlice from './slices/chat-slice'
import socketIoSlice from './slices/pump-socket-slice'
import pumpChartSlice from './slices/pump-chart-slice'
import chatSocketSlice from './slices/chat-socket-slice'

export const makeStore = () => {
    return configureStore({
        reducer: {
            tokenSwap: tokenSwapSlice,
            app: appSlice,
            theme: themeSlice,
            profile: userProfileSlice,
            audio: audioSlice,

            chat: chatSlice,
            chatSocket:chatSocketSlice,
            pumpSocket: socketIoSlice,
            pumpChart: pumpChartSlice
        }
    })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']