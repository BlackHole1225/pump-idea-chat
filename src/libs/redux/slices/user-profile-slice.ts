import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URI = import.meta.env.VITE_MESSENGER_API_URL;

interface UserProfileState {
    userName: string;
    profilePic: string;
    loading: boolean;
    error: string | null;
}

const initialState: UserProfileState = {
    userName: '',
    profilePic: '',
    loading: false,
    error: null
};

export const loadUserProfile = createAsyncThunk(
    'userProfile/loadUserProfile',
    async (walletAddress: string, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URI}/api/user-profile?walletAddress=${walletAddress}`);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

const userProfileSlice = createSlice({
    name: 'userProfile',
    initialState,
    reducers: {
        setUserName(state, action: PayloadAction<string>) {
            state.userName = action.payload;
        },
        setProfilePic(state, action: PayloadAction<string>) {
            state.profilePic = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loadUserProfile.fulfilled, (state, action: PayloadAction<{ username: string; profilePic: string }>) => {
                state.userName = action.payload.username;
                state.profilePic = action.payload.profilePic;
                state.loading = false;
            })
            .addCase(loadUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});

export const { setUserName, setProfilePic } = userProfileSlice.actions;
export default userProfileSlice.reducer;