import { useEffect, useRef, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import axios from "axios";
import { useAppSelector } from "../../libs/redux/hooks";
import { IconButton } from "@mui/material";
import messageAudio from "../../assets/msg.mp3";

interface Message {
  _id: string;
  message: string;
  username: string;
  profilePic: string;
}

const MessageComponent: React.FC<Message> = (msg) => {
  const websiteTheme = useAppSelector((state) => state.theme.current.styles);

  return (
    <motion.div
      className="w-[90%] lg:w-[80%] mx-auto flex flex-col gap-[15px] lg:gap-[20px]"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      {/* Message Modal */}
      <div className="hidden lg:flex gap-2 lg:gap-5 xl:gap-10 items-center mt-2 lg:mt-5 xl:mt-5">
        <div className="flex items-center gap-[10px] w-[30%] lg:w-[20%] justify-end">
          <p
            className="text-[12px] text-right text-wrap w-[50px] sm:w-[70%] font-mono"
            style={{
              color: websiteTheme.text_color,
              wordBreak: "break-word",
              whiteSpace: "normal",
              fontFamily: "JetBrains Mono",
            }}
          >
            {msg.username.length > 8
              ? `${msg.username.slice(0, 4)}...${msg.username.slice(-4)}`
              : msg.username}
          </p>
          <div
            className="rounded-full w-7 h-7 overflow-hidden"
            style={{ marginTop: "3px" }}
          >
            <IconButton
              sx={{ padding: 0 }}
            >
              <img
                src={msg.profilePic}
                alt={msg.username}
                className="w-full h-full rounded-full"
              />
            </IconButton>
          </div>
        </div>
        <div className="w-[70%] lg:w-[60%]">
          <p
            className="text-[14px] lg:text-[18px] xl:text-[20px] font-mono"
            style={{ fontFamily: "JetBrains Mono" }}
          >
            {msg.message.length > 300
              ? msg.message.slice(0, 300)
              : msg.message}
          </p>
        </div>
      </div>
      <div
        className="w-[100%] mx-auto h-[1px]"
        style={{
          backgroundImage: `linear-gradient(to right, ${websiteTheme.bgColor}, ${websiteTheme.text_color}, ${websiteTheme.bgColor})`,
        }}
      />
    </motion.div>
  );
};

const Focused = () => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const newMessage = useAppSelector((state) => state.chat.newMessage);

  // Fetch initial messages from the backend
  const fetchMessages = useCallback(async () => {
    try {
      const response = await axios.get('https://7dfinzalu3.execute-api.ap-south-1.amazonaws.com/dev/', {
        params: {
          method: 'get_messages',
          room: 'public'  // Replace with the actual room name or parameter you need
        }
      });
      const fetchedMessages = response.data.map((msg: any) => ({
        _id: msg._id,
        message: msg.text,
        username: msg.wallet_address,
        profilePic: msg.sender_pfp || `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 50)}.jpg`,
      }));
      setMessages(fetchedMessages.reverse());
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  }, []);

  // Scroll to bottom after setting messages
  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);

  // Establish WebSocket connection and handle incoming messages
  useEffect(() => {
    fetchMessages();

    const socket = new WebSocket("wss://i7n8t598il.execute-api.ap-south-1.amazonaws.com/dev");

    socket.onopen = () => {
      console.log("WebSocket connection established");
    };

    socket.onmessage = (event) => {
      const receivedMessage = JSON.parse(event.data);
      console.log("Received message:", receivedMessage);

      const messageItem: Message = {
        _id: receivedMessage._id || "",
        message: receivedMessage.message,
        username: receivedMessage.sender_wallet_address || receivedMessage.walletAddress,
        profilePic: receivedMessage.sender_pfp || `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 50)}.jpg`,
      };

      setMessages((prevMessages) => [...prevMessages, messageItem]);
      const audio = new Audio(messageAudio);
      audio.play().catch((error) => console.error("Error playing audio:", error));
      scrollToBottom();
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      socket.close();
    };

  }, [fetchMessages]);

  useEffect(() => {
    if (newMessage) {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      scrollToBottom();
    }
  }, [newMessage]);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <>
      <div className="w-[90%] lg:w-[80%] mx-auto flex flex-col gap-[15px] lg:gap-[20px] relative">
        <AnimatePresence initial={false}>
        {messages.map((msg) => (
          <MessageComponent
            key={msg._id}  // Use _id as the key for uniqueness
            _id={msg._id}
            message={msg.message}
            username={msg.username}
            profilePic={msg.profilePic}
          />
        ))}

        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>
    </>
  );
};

export default Focused;
