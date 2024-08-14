import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface ThemeStyles {
    bgColor: string;
    text_color: string;
    buttonColor: string;
    pump_card_bg: string;
    menu_bg: string,
    active_color: string,
    inactive_color: string
}

interface Theme {
    name: string;
    styles: ThemeStyles;
    class: string;
}

interface ThemeState {
    current: Theme;
    themes: Theme[];
}

const virtuals: Theme[] = [
    {
        name: 'rem',
        styles: {
            bgColor: "#0000FF",
            text_color: "#FFFF",
            buttonColor: "#0000FF",
            pump_card_bg: 'transparent',
            menu_bg: '#FFFF',
            active_color: '#0000FF',
            inactive_color: '#100F0D'
        },
        class: 'bg-[#0000FF] text-white p-[5px] lg:p-2 rounded-[3px] text-[8px] lg:text-[10px] cursor-pointer'
    },
    {
        name: 'neo',
        styles: {
            bgColor: "#000000",
            text_color: "#00FF00",
            buttonColor: "#000000",
            pump_card_bg: '#000000',
            menu_bg: '#000000',
            active_color: '#00FF00',
            inactive_color: '#ffffff'
        },
        class: 'bg-[#000000] text-[#00FF00] border border-[#00FF00]  text-[8px] lg:text-[10px]  p-[5px] lg:p-2 rounded-[3px] cursor-pointer'
    },
    {
        name: 'pinked',
        styles: {
            bgColor: "#000000",
            text_color: "#FF00BF",
            buttonColor: "#FF00BF",
            pump_card_bg: '#000000',
            menu_bg: '#000000',
            active_color: '#FF00BF',
            inactive_color: '#FFFFFF'
        },
        class: 'bg-[#000000] text-[#FF00BF] border border-[#FF00BF] text-[8px] lg:text-[10px]  p-[5px] lg:p-2 rounded-[3px] cursor-pointer'
    },
    {
        name: 'red',
        styles: {
            bgColor: "#000000",
            text_color: "#FF5959",
            buttonColor: "#FF5959",
            pump_card_bg: '#000000',
            menu_bg: '#000000',
            active_color: '#FF5959',
            inactive_color: '#ffffff'
        },
        class: 'bg-[#000000] text-[#FF5959] border border-[#FF5959] text-[8px] lg:text-[10px]  p-[5px] lg:p-2 rounded-[3px] cursor-pointer'
    },
    {
        name: 'B/W',
        styles: {
            bgColor: "#FFF",
            text_color: "#000000",
            buttonColor: "#000000",
            pump_card_bg: '',
            menu_bg: '#ffffff',
            active_color: '#0000FF',
            inactive_color: '#3D3D3D'
        },
        class: 'bg-[#ffffff] text-[#000000] text-[8px] lg:text-[10px]  p-[5px] lg:p-2 rounded-[3px] border border-black cursor-pointer'
    }
];

const initialTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? JSON.parse(savedTheme) : virtuals[0];
};

const initialState: ThemeState = {
    current: initialTheme(),
    themes: virtuals
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setTheme: (state, action: PayloadAction<string>) => {
            const selectedTheme = state.themes.find(virtual => virtual.name === action.payload);
            if (selectedTheme) {
                state.current = selectedTheme;
                localStorage.setItem('theme', JSON.stringify(selectedTheme));
            } else {
                console.warn(`Theme with name "${action.payload}" not found`);
            }
        }
    }
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;