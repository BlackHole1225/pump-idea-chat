import { useRecoilState } from "recoil";
import { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { userProfilePicState, userNameState } from "../atoms/users"; // Import Recoil atoms
import { MdDriveFolderUpload } from "react-icons/md";
import ContainedLayout from "../layouts/ContainedLayout";
import { Box, Button, Input, Snackbar, Alert } from "@mui/material";
import { useAppSelector } from "../libs/redux/hooks";
import { useWallet } from "@solana/wallet-adapter-react";
import { BottleSvg } from "../components/buttons/bottle";

const BASE_URI = import.meta.env.VITE_CHAT_SERVER_URL;

const Profile = () => {
  const websiteTheme = useAppSelector((state) => state.theme.current.styles);
  const [profilePic, setProfilePic] = useState<string | File>("");
  const [, setShowProfilePicError] = useState(false);
  const [showFileUploadSuccess] = useState(false);
  const [profilePicFromS3, setProfilePicFromS3] =
    useRecoilState(userProfilePicState); // Use Recoil for profile pic
  const [userName, setUserName] = useRecoilState<any>(userNameState); // Use Recoil for username
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const walletAddress = localStorage.getItem("walletAddress");
  const wallet = useWallet();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.post(BASE_URI, {
          method: "register",
          walletAddress: wallet.publicKey?.toString(), // Sending the wallet address
        });

        if (response.data) {
          if (response.data.user) {
            const userName = response.data.user.username;
            setUserName(userName || "");
            const profilePicUrl = response.data.user.profilePic;
            setProfilePic(profilePicUrl || "");
            setProfilePicFromS3(profilePicUrl || ""); // Populate profile picture
          }
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    if (wallet.publicKey) {
      fetchUserProfile();
    }
  }, [wallet.publicKey, setProfilePicFromS3, setUserName]);

  const handleFileChange = (event: any) => {
    setShowProfilePicError(false);
    const file = event.target.files[0];
    if (file && file.size <= 10 * 1024 * 1024) {
      setProfilePic(file);
      setIsSaveDisabled(false); // Enable save button when a file is selected
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
        // Convert image file to base64
        const reader = new FileReader();
        reader.readAsDataURL(profilePic);
        reader.onloadend = async () => {
          const base64Image = reader.result as string;

          const response = await axios.post(BASE_URI, {
            method: "update_profile_pic",
            walletAddress: wallet.publicKey?.toString(),
            pfpBase64: base64Image.split(",")[1], // Send base64 string without the prefix
          });

          const data = response.data;
          if (!data.error) {
            setProfilePicFromS3(data.s3_compressed_url); // Update Recoil state with the new image URL
            setProfilePic(data.s3_compressed_url);
          } else {
            console.error("Error updating profile picture:", data.message);
          }
        };
      }

      if (userName) {
        await saveUserName(userName);
      }

      setIsSaveDisabled(true); // Disable save button after successful update
      setShowSuccessMessage(true); // Show success message
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const saveUserName = async (newUserName: string) => {
    try {
      const response = await axios.post(BASE_URI, {
        method: "update_username",
        username: newUserName,
        walletAddress: wallet.publicKey?.toString(), // Sending the wallet address
      });

      if (response.data) {
        if (response.data.user) {
          const userName = response.data.user.username;
          setUserName(userName || "");
        }
      }

      console.log("Username saved successfully");
    } catch (error) {
      console.error("Error saving username:", error);
    }
  };

  useEffect(() => {
    if (userName !== null && userName?.trim() !== "") {
      const delayDebounceFn = setTimeout(() => {
        setIsSaveDisabled(false); // Enable save button when the username is not empty
      }, 500); // Delay in milliseconds

      return () => clearTimeout(delayDebounceFn);
    } else {
      setIsSaveDisabled(true); // Disable save button when the username is cleared
    }
  }, [userName]);

  const renderProfilePic = useMemo(() => {
    if (profilePic instanceof File) {
      try {
        return URL.createObjectURL(profilePic);
      } catch {
        return "";
      }
    } else {
      return profilePicFromS3 || "";
    }
  }, [profilePic, profilePicFromS3]);

  const handleSuccessClose = () => {
    setShowSuccessMessage(false);
    navigate("/profile"); // Redirect to profile after closing the success message
  };

  return (
    <ContainedLayout>
      <Box
        className="uppercase h-screen max-h-screen w-full font-jbm"
        style={{ fontFamily: "JetBrains Mono, monospace" }}
      >
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
                <div
                  className={`rounded-full h-full w-full overflow-hidden ${
                    renderProfilePic ? "" : "flex items-center justify-center"
                  }`}
                >
                  {renderProfilePic ? (
                    <img
                      alt=""
                      src={renderProfilePic}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <BottleSvg className="w-1/2 h-3/4 m-auto" />
                  )}
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
                    placeholder="H"
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
                sx={{
                  borderColor: websiteTheme.text_color,
                  color: websiteTheme.text_color,
                }}
                className={`center col-span-1 uppercase flex items-center justify-center border px-4 py-2 text-[15px] lg:text-[20px] outline-none`}
              >
                username
              </Box>
              <Box
                sx={{ borderColor: websiteTheme.text_color }}
                className={`max-sm:col-span-3 col-span-2 uppercase border px-4 py-2 text-[15px] lg:text-[20px] outline-none`}
              >
                <Input
                  inputProps={{
                    style: {
                      textTransform: "uppercase",
                      color: websiteTheme.text_color,
                      fontFamily: "JetBrains Mono",
                    },
                  }}
                  placeholder="type here"
                  value={userName || ""} // If userName is null, display an empty string
                  disableUnderline
                  onChange={(e) => setUserName(e.target.value)}
                />
              </Box>
            </Box>

            <Box
              className="m-auto flex justify-center max-w-[640px] w-full"
              alignItems="center"
            >
              <Button
                disableElevation
                disableTouchRipple
                onClick={isSaveDisabled ? undefined : handleSubmit}
                sx={{
                  padding: ".7rem",
                  color: websiteTheme.bgColor,
                  background: websiteTheme.text_color,
                  "&:hover": {
                    background: websiteTheme.text_color,
                    color: websiteTheme.bgColor,
                  },
                  fontFamily: "JetBrains Mono",
                  cursor: isSaveDisabled ? "not-allowed" : "pointer",
                  opacity: isSaveDisabled ? 0.5 : 1,
                }}
                className="flex h-full align-middle gap-2 justify-center w-full whitespace-nowrap overflow-hidden text-ellipsis"
              >
                save
              </Button>
            </Box>

            <Link
              to="/chat"
              style={{ color: websiteTheme.text_color }}
              className="mx-auto"
            >
              <p
                className="uppercase text-[15px] lg:text-[20px]"
                style={{ fontFamily: "JetBrains Mono" }}
              >
                Back to chat
              </p>
            </Link>

            <Box
              className="m-auto flex justify-center max-w-[100%] h-[56px] mt-12"
              alignItems="center"
            >
              <Button
                sx={{
                  borderColor: websiteTheme.text_color,
                  color: websiteTheme.text_color,
                  fontFamily: "JetBrains Mono",
                }}
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
          <Alert
            onClose={handleSuccessClose}
            severity="success"
            sx={{ width: "100%", fontFamily: "JetBrains Mono" }}
          >
            User Details Updated
          </Alert>
        </Snackbar>
      </Box>
    </ContainedLayout>
  );
};

export default Profile;
