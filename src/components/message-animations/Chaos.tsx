import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '../../libs/redux/hooks';
import { addNewMessage, Message } from '../../libs/redux/slices/chat-slice';
import { generateRandomHex } from '../../utils';
import debounce from 'lodash/debounce';
import MessageShowModal from './MessageShowModal';
import { IconButton } from '@mui/material';
import messageAudio from '../../assets/msg.mp3'; // Import the message audio

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

// Dummy Area
const messageLengths = [1, 10, 20, 30, 50, 80, 445];

const messages: Record<number, string> = {
  1: "Lorem ipsu",
  10: "Lorem ipsu",
  20: "Lorem ipsum dolor sit am",
  30: "Lorem ipsum dolor sit amet, cons",
  50: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  80: "In publishing and graphic design, Lorem ipsum serves as a placeholder text often utilized to showcase the visual form of a document or typeface, without depending on meaningful content. It’s a standard tool for designers, allowing them to focus on layout and aesthetics before the final text is available.",
  445: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available."
};

const GetRandomParagraph = () => {
  const randomLength = messageLengths[Math.floor(Math.random() * messageLengths.length)];
  return messages[randomLength].slice(0, randomLength);
};

const Chaos: React.FC = () => {
  const dispatch = useAppDispatch();
  const newMessage = useAppSelector((state) => state.chat.newMessage);
  const [messageModal, setMessageModal] = useState({
    isOpen: false,
    message: {} as any
  });

  const initGridData = () => {
    const data = [] as MessageItem[];
    const { totalSlots } = getGridDimensions();
    for (let i = 0; i < totalSlots; i++) {
      const { marginClass, textClampClass, colSpanClass, rowSpanClass } = generateRandomStyles();
      data.push({ ...makeMessage(true), message: '', marginClass, textClampClass, colSpanClass, rowSpanClass });
    }
    return data;
  };

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

  const makeMessage = (isEmpty: boolean = false) => {
    const { textClampClass } = generateRandomStyles();
    const newMsg: MessageItem = {
      _id: generateRandomHex(),
      message: GetRandomParagraph(),
      username: `User_${generateRandomHex(10)}`,
      profilePic: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 50)}.jpg`,
      timestamp: Date.now(),
      isEmpty,
      textClampClass
    };
    return newMsg;
  };

  const [gridData, setGridData] = useState<MessageItem[]>(initGridData());

  const adjustGridData = (newTotalSlots: number) => {
    setGridData((prevData) => {
      const currentTotalSlots = prevData.length;
      if (newTotalSlots > currentTotalSlots) {
        const slotsToAdd = newTotalSlots - currentTotalSlots;
        const newItems = Array.from({ length: slotsToAdd }, () => makeMessage(true));
        return [...prevData, ...newItems];
      } else if (newTotalSlots < currentTotalSlots) {
        const slotsToRemove = currentTotalSlots - newTotalSlots;
        return prevData.slice(0, currentTotalSlots - slotsToRemove);
      }
      return prevData;
    });
  };

  const updateGridWithNewMessage = () => {
    const audio = new Audio(messageAudio); // Play the message audio tone
    audio.play().catch(error => console.error("Error playing audio:", error));

    setGridData((prevData) => {
      const emptyRows = prevData.filter((item) => item.isEmpty);
      if (emptyRows.length > 0) {
        const randomEmptyRow = emptyRows[Math.floor(Math.random() * emptyRows.length)];
        return prevData.map((item) =>
          item._id === randomEmptyRow._id ? { ...item, ...newMessage, isEmpty: false } : item
        );
      } else {
        const randomNonRecentMessage = getRandomNonRecentMessage(prevData);
        return prevData.map((item) =>
          item._id === randomNonRecentMessage._id ? { ...item, ...newMessage, isEmpty: false } : item
        );
      }
    });
  };

  const getRandomNonRecentMessage = (messages: MessageItem[]) => {
    const sortedMessages = [...messages].sort((a, b) => b.timestamp - a.timestamp);
    const mostRecentMessage = sortedMessages[0];
    const nonRecentMessages = sortedMessages.slice(1);
    if (nonRecentMessages.length === 0) return mostRecentMessage;
    return nonRecentMessages[Math.floor(Math.random() * nonRecentMessages.length)];
  };

  const handleResize = useCallback(() => {
    const newConfig = getGridDimensions();
    adjustGridData(newConfig.totalSlots);
    setGridConfig(newConfig);
  }, []);

  const debouncedHandleResize = useCallback(debounce(handleResize, 300), [handleResize]);

  useEffect(() => {
    setGridData(initGridData());
    return () => {
      setGridData(initGridData());
    };
  }, []);

  useEffect(() => {
    if (newMessage) updateGridWithNewMessage();
  }, [newMessage]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(addNewMessage(makeMessage()));
    }, 500);

    window.addEventListener('resize', debouncedHandleResize);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('resize', debouncedHandleResize);
    };
  }, [debouncedHandleResize, dispatch]);

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
            initial={{ opacity: 0 }} // Change to fade-in effect
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            className={`flex items-center ${message.rowSpanClass} ${message.colSpanClass} cursor-pointer`} // Add cursor-pointer class
            onClick={() => openModal(message)} // Adding the click handler here
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
                    <p className="font-bold text-[12px] ">{message.username}</p>
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
