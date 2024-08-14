import { useRecoilState } from "recoil";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { userProfilePicState, userNameState } from "../atoms/users";  // Import Recoil atoms
import { MdDriveFolderUpload } from "react-icons/md";
import ContainedLayout from "../layouts/ContainedLayout";
import { Box, Button, Input, Snackbar, Alert } from "@mui/material";
import { useAppSelector } from "../libs/redux/hooks";
import { useWallet } from "@solana/wallet-adapter-react";

const BASE_URI = "https://prithvikr.live";

const Profile = () => {
    const websiteTheme = useAppSelector(state => state.theme.current.styles);
    const [profilePic, setProfilePic] = useState<string | File>(null);
    const [, setShowProfilePicError] = useState(false);
    const [showFileUploadSuccess] = useState(false);
    const [profilePicFromS3, setProfilePicFromS3] = useRecoilState(userProfilePicState);  // Use Recoil for profile pic
    const [userName, setUserName] = useRecoilState(userNameState);  // Use Recoil for username
    const [isSaveDisabled, setIsSaveDisabled] = useState(true);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const walletAddress = localStorage.getItem("walletAddress");
    const wallet = useWallet();
    const navigate = useNavigate(); 

    // Load existing profile data
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get(`${BASE_URI}/api/user-profile?walletAddress=${walletAddress}`);
                const { userName, profilePicUrl } = response.data;
                setUserName(userName || "");  // Populate username using Recoil
                setProfilePicFromS3(profilePicUrl || "");  // Populate profile picture
                setProfilePic(profilePicUrl || "");  // Set profile picture state
            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        };

        fetchUserProfile();
    }, [walletAddress, setProfilePicFromS3, setUserName]);

    const handleFileChange = (event: any) => {
        setShowProfilePicError(false);
        const file = event.target.files[0];
        if (file && file.size <= 10 * 1024 * 1024) {
            setProfilePic(file);
            setIsSaveDisabled(false);  // Enable save button when a file is selected
        } else {
            setShowProfilePicError(true);
        }
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        if (!profilePic && !userName) {
            return;
        }

        try {
            if (profilePic && profilePic instanceof File) {
                const formData = new FormData();
                formData.append("profilePic", profilePic);

                const response = await axios.post(
                    `${BASE_URI}/api/profile-pic?walletAddress=${walletAddress}`,
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
                const data = response.data;
                setProfilePicFromS3(data.data.Location);  // Update Recoil state
                setProfilePic(data.data.Location);
            }

            if (userName) {
                await saveUserName(userName);
            }

            setIsSaveDisabled(true);  // Disable save button after successful update
            setShowSuccessMessage(true);  // Show success message
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    const saveUserName = async (newUserName: string) => {
        try {
            await axios.post(
                `${BASE_URI}/api/save-username`, 
                { userName: newUserName, walletAddress }
            );
            console.log("Username saved successfully");
        } catch (error) {
            console.error("Error saving username:", error);
        }
    };

    useEffect(() => {
        if (userName !== null && userName.trim() !== "") {
            const delayDebounceFn = setTimeout(() => {
                setIsSaveDisabled(false);  // Enable save button when the username is not empty
            }, 500);  // Delay in milliseconds

            return () => clearTimeout(delayDebounceFn);
        } else {
            setIsSaveDisabled(true);  // Disable save button when the username is cleared
        }
    }, [userName]);

    const renderProfilePic = () => {
        if (profilePic instanceof File) {
            try {
                return URL.createObjectURL(profilePic);
            } catch {
                return "";
            }
        } else {
            return profilePicFromS3 || "";
        }
    };

    const handleSuccessClose = () => {
        setShowSuccessMessage(false);
        navigate("/profile");  // Redirect to profile after closing the success message
    };

    return (
        <ContainedLayout>
            <Box className="uppercase h-screen max-h-screen w-full font-jbm" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                <div className="flex flex-col items-center justify-center relative gap-5 lg:gap-10 w-full">
                    <Box className="flex flex-col gap-4 max-w-[100%]">
                        <Box className="w-full max-md:flex-row-reverse flex justify-between items-center">
                            <Box className="flex-grow h-auto">
                                {showFileUploadSuccess && (
                                    <div className="flex gap-2 items-center justify-center">
                                        <p>Profile Picture updated successfully</p>
                                    </div>
                                )}
                            </Box>

                            <div
                                className="relative group border h-[100px] w-[100px] lg:h-[200px] lg:w-[200px] rounded-[100%] flex items-center justify-center"
                                style={{ borderColor: websiteTheme.text_color }}
                            >
                                <div className="rounded-full h-full w-full overflow-hidden">
                                    <img
                                        src={renderProfilePic()}
                                        className="object-cover w-full h-full"
                                    />
                                </div>

                                <form
                                    onSubmit={handleSubmit}
                                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-full h-full"
                                >
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        id="fileInput"
                                        onChange={handleFileChange}
                                    />
                                    <label
                                        htmlFor="fileInput"
                                        className="flex items-center justify-center cursor-pointer w-full h-full"
                                    >
                                        <MdDriveFolderUpload className="w-full h-auto opacity-0" />
                                    </label>
                                </form>
                            </div>
                        </Box>

                        <Box className="grid grid-cols-3 gap-2">
                            <Box
                                sx={{ borderColor: websiteTheme.text_color, color: websiteTheme.text_color }}
                                className={`center col-span-1 uppercase flex items-center justify-center border px-4 py-2 text-[15px] lg:text-[20px] outline-none`}
                            >
                                username
                            </Box>
                            <Box
                                sx={{ borderColor: websiteTheme.text_color }}
                                className={`max-sm:col-span-3 col-span-2 uppercase border px-4 py-2 text-[15px] lg:text-[20px] outline-none`}
                            >
                                <Input
                                    inputProps={{ style: { textTransform: 'uppercase', color: websiteTheme.text_color, fontFamily: 'JetBrains Mono' } }}
                                    placeholder="type here"
                                    value={userName || ""}  // If userName is null, display an empty string
                                    disableUnderline
                                    onChange={(e) => setUserName(e.target.value)}
                                />
                            </Box>
                        </Box>

                        <Box className="m-auto flex justify-center max-w-[640px] w-full" alignItems="center">
                            <Button
                                disableElevation
                                disableTouchRipple
                                disabled={isSaveDisabled} 
                                onClick={handleSubmit}
                                sx={{
                                    padding: '.7rem',
                                    color: websiteTheme.bgColor,
                                    background: websiteTheme.text_color,
                                    '&:hover': {
                                        background: websiteTheme.text_color, 
                                        color: websiteTheme.bgColor, 
                                    },
                                    fontFamily: 'JetBrains Mono'
                                }}
                                className="flex h-full align-middle gap-2 justify-center w-full whitespace-nowrap overflow-hidden text-ellipsis"
                            >
                                save
                            </Button>
                        </Box>

                        <Link to="/chat" style={{ color: websiteTheme.text_color }} className="mx-auto">
                            <p className="uppercase text-[15px] lg:text-[20px]" style={{ fontFamily: 'JetBrains Mono' }}>Back to chat</p>
                        </Link>

                        <Box className="m-auto flex justify-center max-w-[100%] h-[56px] mt-12" alignItems="center">
                            <Button
                                sx={{ borderColor: websiteTheme.text_color, color: websiteTheme.text_color, fontFamily: 'JetBrains Mono' }}
                                variant="outlined"
                                className="flex h-full align-middle gap-2 justify-center w-full whitespace-nowrap overflow-hidden text-ellipsis"
                            >
                                <span>connected with </span>
                                <strong className="whitespace-nowrap overflow-hidden text-ellipsis">
                                    {wallet.publicKey?.toString()}
                                </strong>
                            </Button>
                        </Box>
                    </Box>
                </div>

                {/* Success Message Snackbar */}
                <Snackbar
                    open={showSuccessMessage}
                    autoHideDuration={3000}
                    onClose={handleSuccessClose}
                >
                    <Alert onClose={handleSuccessClose} severity="success" sx={{ width: '100%', fontFamily: 'JetBrains Mono' }}>
                        User Details Updated
                    </Alert>
                </Snackbar>
            </Box>
        </ContainedLayout>
    );
};

export default Profile;
