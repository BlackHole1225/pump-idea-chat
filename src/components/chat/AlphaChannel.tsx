import { useEffect, useState } from 'react';
import { useAppSelector } from '../../libs/redux/hooks';
import CopyTextButton from '../buttons/CopyTextButton';
import { Box, IconButton, Stack } from '@mui/material';
import { generateRandomHex } from '../../utils';
import { Button } from "@mui/material";
import LightButton from "../buttons/LightButton";

const generateRandomCall = () => {
    const addresses = [
        'FV56CmR7fhEyPkymKfmviKV48uPo51ti9kAxssQqTDLu',
        'A1b2C3d4E5f6G7h8I9j0K1L2m3N4o5P6q7R8S9t0U1V2W3X4Y5Z6',
        '1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef'
    ];
    const messages = [
        '“Invested all my savings into this project, it’s the future!”',
        '“Just got my first reward, feeling excited!”',
        '“Hoping this turns into something big, crossing fingers!”'
    ];
    const usernames = ['alpha_hoe', 'beta_boss', 'gamma_guru'];

    return {
        id: generateRandomHex(),
        address: addresses[Math.floor(Math.random() * addresses.length)],
        message: messages[Math.floor(Math.random() * messages.length)],
        username: usernames[Math.floor(Math.random() * usernames.length)],
        timestamp: Date.now() + Math.floor(Math.random() * 600),
        profilePic: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 50)}.jpg`,
    };
};

export default function AlphaChannel() {
    const theme = useAppSelector(state => state.theme.current.styles);
    const [calls, setCalls] = useState([generateRandomCall()]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCalls(prevCalls => [generateRandomCall(), ...prevCalls]);
        }, 10000);

        return () => clearInterval(intervalId);
    }, []);

    const handleDeleteItem = (item_id: string) => {
        setCalls(calls => calls.filter(call => call.id !== item_id))
    }

    return (
        <Stack
            direction='column'
            spacing={2}
            className="flex-col h-full no-scrollbar items-center w-max mx-auto overflow-hidden sm:w-[800px] max-sm:w-full">
            <Box className='mr-auto w-full p-4 pl-10'>
                <Stack direction='row' spacing={1} alignItems='center'>
                    <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21.1334 18.6672C20.3667 18.8839 19.6834 19.0005 19.0834 19.0005C17.0834 19.0005 15.7334 17.5339 15.05 14.5839H14.9667C13.3167 17.7672 11 19.3505 8.08336 19.3505C5.90003 19.3505 4.15003 18.5339 2.83337 16.8839C1.5167 15.2339 0.866699 13.1672 0.866699 10.6672C0.866699 7.75052 1.6167 5.41719 3.10003 3.60052C4.58337 1.78385 6.60003 0.867188 9.15003 0.867188C10.5167 0.867188 11.75 1.25052 12.8167 2.00052C13.8834 2.76719 14.7 3.83385 15.2667 5.21719H15.3334L16.5167 1.21719H20.7834L17.2167 10.0839C17.6167 12.1505 18.0334 13.5672 18.5 14.3172C18.9 15.0672 19.4667 15.4505 20.1667 15.4505C20.5667 15.4505 20.8834 15.3839 21.1667 15.2672L21.1334 18.6672ZM14.0334 9.93386C13.6834 8.05052 13.1167 6.58385 12.35 5.58385C11.6 4.56719 10.6834 4.06719 9.63337 4.06719C8.2667 4.06719 7.1667 4.68385 6.35003 5.90052C5.53337 7.13385 5.1667 8.65052 5.1667 10.4339C5.1667 12.0672 5.48337 13.4172 6.20003 14.5172C6.90003 15.6172 7.85003 16.1505 9.03336 16.1505C10.0334 16.1505 10.95 15.6672 11.7667 14.7505C12.6 13.8005 13.2834 12.4172 13.8334 10.6005L14.0334 9.93386Z" fill={theme.text_color} />
                    </svg>
                    <h1 className=' text-[32px]'>ALPHA</h1>
                </Stack>
                <p className=' uppercase'>
                    Quality alpha from top callers
                </p>
            </Box>
            <Stack
                divider={
                    <div className="h-[1px] w-[90%] mx-auto mt-[20px]"
                        style={{ background: `linear-gradient(to right, ${theme.bgColor}, ${theme.text_color}, ${theme.bgColor})`, }}
                    />}
                direction='column' spacing={2}
                className="flex flex-col w-full mx-auto overflow-auto no-scrollbar"  >
                {calls.map((call, index) => (
                    <Box key={index} className='flex flex-col group '>
                        <div style={{ color: theme.text_color }}
                            className="flex mx-auto w-full justify-between items-center"   >
                            <div className="flex items-center">
                                <img src={call.profilePic} alt={call.username} className="w-10 h-10 rounded-full" />
                                <div className="flex flex-col gap-[5px] pl-[10px]">
                                    <p className="uppercase text-[14px]">{call.username}</p>
                                    <div className="flex items-center gap-2">
                                        <p className="uppercase text-[16px] text-ellipsis overflow-hidden">{call.address}</p>
                                        <CopyTextButton textToCopy={call.address} />
                                    </div>
                                </div>
                            </div>
                            <Button
                                onClick={()=>{}} // This function opens the Tip modal
                                style={{
                                    border: `1px solid ${theme.bgColor == '#0000FF' ? theme.text_color:theme.text_color}`,
                                    left: "0px",
                                    width: "80px",
                                    fontFamily: "JetBrains mono",
                                    top: "10px",
                                    borderRadius: 20,
                                    color: theme.bgColor == '#0000FF' ? theme.text_color:theme.text_color,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: "6px"
                                }}
                                className="px-3 py-1 rounded">
                                <LightButton />
                                Tip
                            </Button>
                        </div>
                        <Box className='flex gap-4 justify-between w-full mt-[10px]'>
                            <p className="italic text-[16px]">
                                <blockquote>{call.message}</blockquote>
                            </p>
                            <Box className='w-10 h-10 aspect-square'>
                                <Box className='hidden group-hover:block'>
                                    <IconButton onClick={() => handleDeleteItem(call.id)}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10 6H14C14 5.46957 13.7893 4.96086 13.4142 4.58579C13.0391 4.21071 12.5304 4 12 4C11.4696 4 10.9609 4.21071 10.5858 4.58579C10.2107 4.96086 10 5.46957 10 6ZM8 6C8 4.93913 8.42143 3.92172 9.17157 3.17157C9.92172 2.42143 10.9391 2 12 2C13.0609 2 14.0783 2.42143 14.8284 3.17157C15.5786 3.92172 16 4.93913 16 6H21C21.2652 6 21.5196 6.10536 21.7071 6.29289C21.8946 6.48043 22 6.73478 22 7C22 7.26522 21.8946 7.51957 21.7071 7.70711C21.5196 7.89464 21.2652 8 21 8H20.118L19.232 18.34C19.1468 19.3385 18.69 20.2686 17.9519 20.9463C17.2137 21.6241 16.2481 22.0001 15.246 22H8.754C7.75191 22.0001 6.78628 21.6241 6.04815 20.9463C5.31002 20.2686 4.85318 19.3385 4.768 18.34L3.882 8H3C2.73478 8 2.48043 7.89464 2.29289 7.70711C2.10536 7.51957 2 7.26522 2 7C2 6.73478 2.10536 6.48043 2.29289 6.29289C2.48043 6.10536 2.73478 6 3 6H8ZM15 12C15 11.7348 14.8946 11.4804 14.7071 11.2929C14.5196 11.1054 14.2652 11 14 11C13.7348 11 13.4804 11.1054 13.2929 11.2929C13.1054 11.4804 13 11.7348 13 12V16C13 16.2652 13.1054 16.5196 13.2929 16.7071C13.4804 16.8946 13.7348 17 14 17C14.2652 17 14.5196 16.8946 14.7071 16.7071C14.8946 16.5196 15 16.2652 15 16V12ZM10 11C9.73478 11 9.48043 11.1054 9.29289 11.2929C9.10536 11.4804 9 11.7348 9 12V16C9 16.2652 9.10536 16.5196 9.29289 16.7071C9.48043 16.8946 9.73478 17 10 17C10.2652 17 10.5196 16.8946 10.7071 16.7071C10.8946 16.5196 11 16.2652 11 16V12C11 11.7348 10.8946 11.4804 10.7071 11.2929C10.5196 11.1054 10.2652 11 10 11Z" fill="red" />
                                        </svg>
                                    </IconButton>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                ))}
            </Stack>
        </Stack>
    );
}
