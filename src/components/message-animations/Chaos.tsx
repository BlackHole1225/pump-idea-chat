import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import debounce from 'lodash/debounce';
import MessageShowModal from './MessageShowModal';
import { IconButton } from '@mui/material';
import messageAudio from '../../assets/msg.mp3';
import axios from "axios";

// Define MessageItem
interface MessageItem {
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

const Chaos: React.FC = () => {
  const [gridData, setGridData] = useState<MessageItem[]>([]);
  const [messageModal, setMessageModal] = useState({
    isOpen: false,
    message: {} as any
  });

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
      colSpanClass: ['col-span-1 w-[80%] max-sm:w-[100%]', 'col-span-1', 'col-span-2 w-[62.5%] max-sm:w-[100%]', 'col-span-1 w-[90.5%] max-sm:w-[100%]'][Math.floor(Math.random() * 3)],
      rowSpanClass: ['row-span-1', 'row-span-1', 'row-span-1', 'row-span-2'][Math.floor(Math.random() * 3)],
      textClampClass: ['line-clamp-3', 'line-clamp-3', 'line-clamp-2', 'line-clamp-2'][Math.floor(Math.random() * 3)],
    };
  };

  const generateRandomHex = (length = 16) => {
    let result = '';
    const characters = '0123456789abcdef';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  const makeMessage = (isEmpty: boolean = false): MessageItem => {
    const { textClampClass } = generateRandomStyles();
    return {
      _id: generateRandomHex(),
      message: "",
      username: `User_${generateRandomHex(10)}`,
      profilePic: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 50)}.jpg`,
      timestamp: Date.now(),
      isEmpty,
      textClampClass
    };
  };

  const adjustGridData = (newTotalSlots: number) => {
    setGridData((prevData) => {
      const currentTotalSlots = prevData.length;
      if (newTotalSlots > currentTotalSlots) {
        const slotsToAdd = newTotalSlots - currentTotalSlots;
        const newItems = Array.from({ length: slotsToAdd }, () =>
          makeMessage(true)
        );
        return [...prevData, ...newItems];
      } else if (newTotalSlots < currentTotalSlots) {
        const slotsToRemove = currentTotalSlots - newTotalSlots;
        return prevData.slice(0, currentTotalSlots - slotsToRemove);
      }
      return prevData;
    });
  };

  const fetchMessages = async (room = "public") => {
    try {
      const response = await axios.get(
        "https://7dfinzalu3.execute-api.ap-south-1.amazonaws.com/dev/",
        {
          params: {
            method: "get_messages",
            room: room,
          },
        }
      );

      console.log("Fetching messages...");
      console.log(response.data);

      const fetchedMessages = response.data.map((msg: any) => ({
        _id: msg._id,
        message: msg.text,
        username: msg.wallet_address,
        profilePic:
          msg.sender_pfp || `https://randomuser.me/api/portraits/men/${Math.floor(
            Math.random() * 50
          )}.jpg`,
        timestamp: new Date(msg.timestamp).getTime(),
        isEmpty: false,
        marginClass: `m-${Math.floor(Math.random() * 10) + 1}`,
        textClampClass: generateRandomStyles().textClampClass,
      }));

      setGridData(fetchedMessages.reverse());
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const updateGridWithNewMessage = (newMsg: MessageItem) => {
    const audio = new Audio(messageAudio);
    audio.play().catch(error => console.error("Error playing audio:", error));

    setGridData((prevData) => [...prevData, newMsg]);
  };

  const handleResize = useCallback(() => {
    const newConfig = getGridDimensions();
    adjustGridData(newConfig.totalSlots);
    setGridConfig(newConfig);
  }, []);

  const debouncedHandleResize = useCallback(debounce(handleResize, 300), [handleResize]);

  useEffect(() => {
    fetchMessages();

    window.addEventListener("resize", debouncedHandleResize);
    const socket = new WebSocket(
      "wss://i7n8t598il.execute-api.ap-south-1.amazonaws.com/dev"
    );

    socket.onopen = () => {
      console.log("WebSocket connection established");
    };

    socket.onmessage = (event) => {
      const receivedMessage = JSON.parse(event.data);
      console.log("Received message:", receivedMessage);

      const messageItem: MessageItem = {
        _id: receivedMessage._id || "",
        message: receivedMessage.message,
        username: receivedMessage.sender_wallet_address || receivedMessage.walletAddress,
        profilePic:
          receivedMessage.sender_pfp || `https://randomuser.me/api/portraits/men/${Math.floor(
            Math.random() * 50
          )}.jpg`,
        timestamp: new Date(receivedMessage.timestamp).getTime(),
        isEmpty: false,
        textClampClass: generateRandomStyles().textClampClass,
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

  const openModal = (message: MessageItem) => {
    setMessageModal({
      isOpen: true,
      message
    });
  };

  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      <MessageShowModal {...messageModal} onRequestClose={() => setMessageModal({ isOpen: false, message: {} as any })} />
      <div className={`grid grid-cols-${gridConfig.numColumns} gap-4 flex-1 overflow-hidden`}>
        {gridData.map((message) => (
          <motion.div
            key={message._id}
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            className={`flex items-center ${message.rowSpanClass} ${message.colSpanClass} cursor-pointer`}
            onClick={() => openModal(message)} 
          >
            {message.message ? (
              <motion.div className={`flex flex-col ${message.marginClass}  m-auto`}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex gap-2 overflow-hidden items-start">
                  <IconButton sx={{ padding: 0 }}>
                    <img src={message.profilePic} alt={message.username} className="w-6 h-6 rounded-full" />
                  </IconButton>
                  <div className="flex-1 flex flex-col justify-start ">
                    <p className="font-bold text-[12px] ">{message.username.length > 8
                        ? `${message.username.slice(
                            0,
                            4
                          )}...${message.username.slice(-4)}`
                        : message.username}</p>{" "}
                    <p className={`${message.textClampClass} text-[14px]`}>{message.message}</p>
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
