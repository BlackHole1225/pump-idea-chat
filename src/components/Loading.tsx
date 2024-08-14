import { CircularProgress, Stack } from "@mui/material";

export default function Loading() {
    return (
        <Stack alignItems="center" className=" h-screen w-screen flex centre align-middle justify-center bg-inherit" justifyContent="center" >
            <CircularProgress />
        </Stack>
    )
}