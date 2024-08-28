import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../../libs/redux/hooks";
import { addNewMessage, Message } from "../../libs/redux/slices/chat-slice";
import debounce from "lodash/debounce";
import MessageShowModal from "./MessageShowModal";
import { IconButton, useMediaQuery } from "@mui/material";
import messageAudio from "../../assets/msg.mp3"; // Import the message audio
import axios from "axios";
import { ConstructionOutlined } from "@mui/icons-material";

interface MessageItem extends Message {
  _id: string;
  message: string;
  username: string;
  profilePic: string;
  timestamp: number;
  marginClass?: string;
  textClampClass?: string;
  isEmpty: boolean;
  rowSpanClass?: string;
  colSpanClass?: string;
}

const random_profile_image_url = import.meta.env.VITE_RANDOM_PROFILE_URL;
const initial_chat_messages_url = import.meta.env.VITE_CHAT_SERVER_URL;
const websocket_url = import.meta.env.VITE_WEBSOCKET_URL;

const Chaos: React.FC = () => {
  // const dispatch = useAppDispatch();
  // const newMessage = useAppSelector((state) => state.chat.newMessage);
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [messageModal, setMessageModal] = useState({
    isOpen: false,
    message: {} as any,
  });

  const isMobile = useMediaQuery("(max-width:768px)");

  const getGridDimensions = () => {
    if (window.innerWidth >= 1200) {
      return { numColumns: 5, numRowsPerColumn: 4, totalSlots: 20 };
    } else if (window.innerWidth >= 600) {
      return { numColumns: 4, numRowsPerColumn: 5, totalSlots: 9 };
    } else {
      return { numColumns: 2, numRowsPerColumn: 6, totalSlots: 8 };
    }
  };

  const [gridConfig, setGridConfig] = useState(getGridDimensions);

  const generateRandomStyles = () => {
    return {
      marginClass: `px-${Math.floor(Math.random() * 10) + 1}`,
      colSpanClass: [
        "col-span-1 w-[80%] max-sm:w-[100%]",
        "col-span-1",
        "col-span-2 w-[62.5%] max-sm:w-[100%]",
        "col-span-1 w-[90.5%] max-sm:w-[100%]",
      ][Math.floor(Math.random() * 3)],
      rowSpanClass: ["row-span-1", "row-span-1", "row-span-1", "row-span-2"][
        Math.floor(Math.random() * 3)
      ],
      textClampClass: [
        "line-clamp-3",
        "line-clamp-3",
        "line-clamp-2",
        "line-clamp-2",
      ][Math.floor(Math.random() * 3)],
    };
  };

  const [gridData, setGridData] = useState<MessageItem[]>([]);
  // console.log("/////////////////////////grid data//////////////////////////", gridData);

  const updateGridWithNewMessage = (newMsg: MessageItem) => {
    // console.log("updated with new message", newMsg);
    const audio = new Audio(messageAudio); // Play the message audio tone
    audio.play().catch((error) => console.error("Error playing audio:", error));

    const { totalSlots } = getGridDimensions();

    setGridData((prevData) => {
      // const emptyRows = prevData.filter((item) => item.isEmpty);
      // console.log("girid data", prevData);
      if (prevData.length >= totalSlots) {
        const randomIndex = Math.floor(Math.random() * totalSlots);
        // console.log("random index - randomIndex", totalSlots, randomIndex);
        const temp = [...prevData]
        temp.splice(randomIndex, 1, newMsg);
        return temp
      } else {
        return [...prevData, newMsg]
      }
    });
  };

  // const updateGridWithNewMessage = (newMsg: MessageItem) => {
  //   const audio = new Audio(messageAudio);
  //   audio.play().catch((error) => console.error("Error playing audio:", error));

  //   setGridData((prevData) => [...prevData, newMsg]);
  // };

  const handleResize = useCallback(() => {
    const newConfig = getGridDimensions();
    // adjustGridData(newConfig.totalSlots);
    setGridConfig(newConfig);
  }, []);

  const debouncedHandleResize = useCallback(debounce(handleResize, 300), [
    handleResize,
  ]);

  // console.log("grid data", gridData);

  const openModal = (message: MessageItem) => {
    setMessageModal({
      isOpen: true,
      message,
    });
  };

  const fetchMessages = async () => {
    try {
      const response = await axios.get(initial_chat_messages_url, {
        params: {
          method: 'get_messages',
          room: 'public'  // Replace with the actual room name or parameter you need
        }
      });
      // console.log(">>>>>>>>>>>>>>>>>>>>> response <<<<<<<<<<<<<<<<<<<<<<<", response)
      const { totalSlots } = getGridDimensions();
      const fetchedMessages = response.data.map((msg: any) => {
        const { marginClass, textClampClass, colSpanClass, rowSpanClass } = generateRandomStyles();
        // console.log("profile", msg.sender_pfp + `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 50)}.jpg`);
        return {
          _id: msg._id,
          message: msg.text,
          username: msg.username == "Unknown" || msg.username == "" ? msg.walletAddress : msg.username,
          profilePic: msg.sender_pfp?.length ? msg.sender_pfp : `${random_profile_image_url}/${Math.floor(Math.random() * 50)}.jpg`,
          timestamp: new Date(msg.timestamp).getTime(),
          isEmpty: false,
          marginClass,
          textClampClass,
          colSpanClass,
          rowSpanClass,
        }
      });

      // console.log(">>>>>>>>>>>>>>>>>>>>> fetchedMessages <<<<<<<<<<<<<<<<<<<<<<<", fetchedMessages.reverse())

      setGridData(fetchedMessages.reverse().slice(0, totalSlots));
      // setGridData(fetchedMessages.reverse());
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  useEffect(() => {
    fetchMessages();

    window.addEventListener("resize", debouncedHandleResize);

    const socket = new WebSocket(websocket_url);

    setWs(socket);

    socket.onopen = () => {
      console.log("WebSocket connection established");
    };

    socket.onmessage = (event) => {
      // console.log(">>>>>>>>>>>>>>>>>>>>>>>>event<<<<<<<<<<<<<<<<<<<<<<<<<<<");
      const receivedMessage = JSON.parse(event.data);
      console.log("chaos Received message:", receivedMessage);
      const { marginClass, textClampClass, colSpanClass, rowSpanClass } = generateRandomStyles();
      const messageItem: MessageItem = {
        _id: receivedMessage._id || "",
        message: receivedMessage.message,
        username: receivedMessage.sender_username == "Unknown" || receivedMessage.sender_username == "" ? receivedMessage.sender_wallet_address || receivedMessage.walletAddress : receivedMessage.sender_username,
        profilePic: receivedMessage.sender_pfp?.length ? receivedMessage.sender_pfp : `${random_profile_image_url}/${Math.floor(Math.random() * 50)}.jpg`,
        timestamp: new Date(receivedMessage.timestamp).getTime(),
        isEmpty: false,
        marginClass,
        textClampClass,
        colSpanClass,
        rowSpanClass,
      };

      updateGridWithNewMessage(messageItem);
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      window.removeEventListener("resize", debouncedHandleResize);
      socket.close();
    };
  }, [debouncedHandleResize]);

  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      <MessageShowModal
        {...messageModal}
        onRequestClose={() =>
          setMessageModal({ isOpen: false, message: {} as any })
        }
      />
      <div
        className={`grid grid-cols-${gridConfig.numColumns} gap-4 flex-1 overflow-hidden`}
      >
        {gridData.map((message, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0 }} // Change to fade-in effect
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className={`flex ${message.rowSpanClass} ${message.colSpanClass} cursor-pointer`} // Add cursor-pointer class
            onClick={() => openModal(message)} // Adding the click handler here
          >
            {message.message ? (
              <motion.div
                className={`flex flex-col ${message.marginClass}  m-auto`}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex gap-2 overflow-hidden items-start">
                  <IconButton sx={{ padding: 0 }}>
                    <img
                      src={message.profilePic}
                      alt={message.username}
                      className="w-6 h-6 rounded-full"
                    />
                  </IconButton>
                  <div className="flex-1 flex flex-col justify-start ">
                    <p
                      className={`font-bold max-w-48 text-wrap break-all ${isMobile ? "text-[10px]" : "text-[12px]"
                        }`}
                    >
                      {message.username}
                    </p>
                    <div
                      className={`${message.textClampClass} ${isMobile ? "text-[12px] max-w-48 text-wrap break-all" : "block text-[16px] max-w-48 text-wrap break-all"
                        }`}
                    >
                      {message.message}
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <p className={`${message.textClampClass}`}>&nbsp;</p>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Chaos;