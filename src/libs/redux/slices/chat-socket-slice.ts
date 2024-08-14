import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import io, { Socket } from 'socket.io-client';
import { AppDispatch } from '../store';
import { Message } from './chat-slice'; 

// Define states for WebSocket handling
type ChatSocketStates = 'idle' | 'error' | 'receiving' | 'ready';
type ChatSocketEvents = 'newMessage';  // Events the client listens to // be sure of
type ChatSocketSendEvents = 'sendMessage'; // Events the client sends to the server // dev are you doing the right thing?

interface ChatSocketState {
    socket: Socket | null;
    connected: boolean;
    newMessages: Message[];
    socketState: ChatSocketStates;
}

const initialState: ChatSocketState = {
    socket: null,
    connected: false,
    newMessages: [],
    socketState: 'idle',
};

// Slice for WebSocket handling in chat
const chatSocketSlice = createSlice({
    name: 'chatSocket',
    initialState,
    reducers: {
        setSocket(state, action: PayloadAction<Socket | null>) {
            state.socket = action.payload as any;
        },
        setConnected(state, action: PayloadAction<boolean>) {
            state.connected = action.payload;
        },
        addNewMessage(state, action: PayloadAction<Message>) {
            state.newMessages.push(action.payload);
        },
        setChatSocketState(state, action: PayloadAction<ChatSocketStates>) {
            state.socketState = action.payload;
        },
    },
});

// Async thunk to connect to WebSocket
export const connectSocket = (serverUrl: string) => async (dispatch: AppDispatch) => {
    const socketInstance = io(serverUrl, {
        autoConnect: true,
        upgrade: true,
    });

    socketInstance.on('connect', () => {
        dispatch(setConnected(true));
    });

    socketInstance.on('disconnect', () => {
        dispatch(setConnected(false));
    });

    socketInstance.on('newMessage', (message: Message) => {
        dispatch(addNewMessage(message));
    });

    dispatch(setSocket(socketInstance));

    return () => {
        socketInstance.disconnect();
    };
};

// Emit events to the WebSocket
export const emitChatEvent = <K extends ChatSocketSendEvents>(event: K, data?: any) => (dispatch: AppDispatch, getState: () => { chatSocket: ChatSocketState }) => {
    dispatch
    const { socket } = getState().chatSocket;
    if (socket) {
        socket.emit(event, data);
    }
};

// Handle incoming events from the WebSocket
export const onChatEvent = <K extends ChatSocketEvents>(event: K, callback: (data: any) => void) => (dispatch: AppDispatch, getState: () => { chatSocket: ChatSocketState }) => {
    dispatch
    const { socket } = getState().chatSocket;
    if (socket) {
        const typedCallback: (data: any) => void = (data) => callback(data);
        socket.on(event, typedCallback as any);
        return () => {
            socket.off(event, typedCallback as any);
        };
    }
    return () => {};
};

export const { setSocket, setConnected, addNewMessage, setChatSocketState } = chatSocketSlice.actions;

export default chatSocketSlice.reducer;
