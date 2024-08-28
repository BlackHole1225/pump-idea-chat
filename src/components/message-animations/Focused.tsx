import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { useAppSelector } from "../../libs/redux/hooks";
import { MessageModal } from "../MessageModal";
import MessageShowModal from "./MessageShowModal";
import { Box, IconButton } from "@mui/material";

import axios from "axios";

const random_profile_image_url = import.meta.env.VITE_RANDOM_PROFILE_URL;
const initial_chat_messages_url = import.meta.env.VITE_CHAT_SERVER_URL;
const websocket_url = import.meta.env.VITE_WEBSOCKET_URL;

interface Message {
  message: string;
  username: string;
  profilePic: string;
}

const MessageComponent: React.FC<Message> = (msg) => {
  const websiteTheme = useAppSelector(state => state.theme.current.styles);
  const [messageModal, setMessageModal] = useState({
    isOpen: false,
    message: {} as any
  });

  const formatMessage = (text: string) => {
    let formattedText = text.replace(/\\n/g, "\n");
    formattedText = formattedText.replace(/\n{5,}/g, "\n\n\n\n");
    return formattedText.split("\n").map((line, index, array) => (
      <React.Fragment key={index}>
        {line}
        {index < array.length - 1 && <br />}
      </React.Fragment>
    ));
  };

  return (
    <motion.div
      className="w-[90%] lg:w-[80%] mx-auto flex flex-col gap-[15px] lg:gap-[20px]"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <MessageShowModal {...messageModal} onRequestClose={() => setMessageModal({ isOpen: false, message: {} as any })} />
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
            {msg.username}
          </p>
          <div className="rounded-full w-7 h-7 overflow-hidden" style={{ marginTop: "3px" }}>
            <IconButton sx={{ padding: 0 }} onClick={() => {
              setMessageModal({
                isOpen: true,
                message: msg
              })
            }}>
              <img src={msg.profilePic} alt={msg.username} className="w-full h-full rounded-full" />
            </IconButton>
          </div>
        </div>
        <div className="w-[70%] lg:w-[60%]">
          <p className="text-[14px] lg:text-[18px] xl:text-[20px] break-all font-mono" style={{ fontFamily: "JetBrains Mono" }}>
            {msg.message.length > 300 ? msg.message.slice(0, 300) : msg.message}
          </p>
        </div>
      </div>
      <div className="lg:hidden flex gap-[10px] items-center">
        <div className="rounded-full w-7 h-7 overflow-hidden" style={{ marginTop: "3px" }}>
          <IconButton sx={{ padding: 0 }} onClick={() => {
            setMessageModal({
              isOpen: true,
              message: msg
            })
          }}>
            <img src={msg.profilePic} alt={msg.username} className="w-full h-full rounded-full" />
          </IconButton>
        </div>
        <div>
          <p
            className="text-[12px] lg:text-[14px] xl:text-[14px] font-mono break-all"
            style={{
              color: websiteTheme.text_color,
              wordBreak: "break-word",
              whiteSpace: "normal",
              fontFamily: "JetBrains Mono",
            }}
          >
            {msg.username}
          </p>
          <div className="lg:w-[60%]">
            <p
              className="text-[14px] lg:text-[13px] xl:text-[14px] font-mono break-all"
              style={{
                color: websiteTheme.text_color,
                wordBreak: "break-word",
                whiteSpace: "normal",
                fontFamily: "JetBrains Mono",
              }}
            >
              {formatMessage(msg.message)}
            </p>
          </div>
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
  const [modalMessage, setModalMessage] = useState<string | null>(null);
  const [modalUsername, setModalUsername] = useState<string | null>(null);
  const [modalPfp, setModalPfp] = useState<string | undefined>();
  const [ws, setWs] = useState<WebSocket | null>(null);

  const [allMessages, setAllMessages] = useState<Message[]>([]);
  // const [newMessage, setNewMessage] = useState<Message | null>(null);

  // const initialMessages = useAppSelector((state) => state.chat.initialMessages);
  // const newMessage = useAppSelector((state) => state.chat.newMessage);
  const websiteTheme = useAppSelector((state) => state.theme.current.styles);

  useEffect(() => {
    scrollToBottom();
  }, [allMessages]);

  const fetchMessages = async () => {
    try {

      const response = await axios.get(initial_chat_messages_url, {
        params: {
          method: 'get_messages',
          room: 'public'  // Replace with the actual room name or parameter you need
        }
      });
      // console.log(">>>>>>>>>>>>>>>>>>>>> response <<<<<<<<<<<<<<<<<<<<<<<", response)
      const fetchedMessages = response.data.map((msg: any) => {
        return {
          _id: msg._id,
          message: msg.text,
          username: msg.username == "Unknown" || msg.username == "" ? msg.walletAddress : msg.username,
          profilePic: msg.sender_pfp?.length ? msg.sender_pfp : `${random_profile_image_url}/${Math.floor(Math.random() * 50)}.jpg`,
          timestamp: new Date(msg.timestamp).getTime(),
          isEmpty: false
        }
      });

      // console.log(">>>>>>>>>>>>>>>>>>>>> fetchedMessages <<<<<<<<<<<<<<<<<<<<<<<", fetchedMessages.reverse())
      setAllMessages(fetchedMessages);
      // setGridData(fetchedMessages.reverse());
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  useEffect(() => {
    fetchMessages();

    const socket = new WebSocket(websocket_url);

    setWs(socket);

    socket.onopen = () => {
      console.log("WebSocket connection established");
    };

    socket.onmessage = (event) => {
      // console.log(">>>>>>>>>>>>>>>>>>>>>>>>event<<<<<<<<<<<<<<<<<<<<<<<<<<<");
      const receivedMessage = JSON.parse(event.data);
      console.log("focussed Received message:", receivedMessage);
      const messageItem: Message = {
        message: receivedMessage.message,
        username: receivedMessage.sender_username == "Unknown" || receivedMessage.sender_username == "" ? receivedMessage.sender_wallet_address || receivedMessage.walletAddress : receivedMessage.sender_username,
        profilePic: receivedMessage.sender_pfp?.length ? receivedMessage.sender_pfp : `${random_profile_image_url}/${Math.floor(Math.random() * 50)}.jpg`
      };

      setAllMessages((prevMessages) => {
        const updatedMessages = [...prevMessages, messageItem];
        return updatedMessages;
      });
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
  }, []);

  const scrollToBottom = () => {
    // messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    const scrollHeight = messagesEndRef.current?.scrollHeight
    messagesEndRef.current?.scrollTo({
      top: scrollHeight,
      behavior: 'smooth'
    })
  };

  const formatMessage = (text: string) => {
    let formattedText = text.replace(/\\n/g, "\n");

    formattedText = formattedText.replace(/\n{5,}/g, "\n\n\n\n");

    return formattedText.split("\n").map((line, index, array) => (
      <React.Fragment key={index}>
        {line}
        {index < array.length - 1 && <br />}
      </React.Fragment>
    ));
  };

  return (
    <Box className="relative overflow-y-auto w-full no-scrollbar h-full" flexGrow='1' ref={messagesEndRef}>
      <div className="w-[90%] lg:w-[80%] mx-auto flex flex-col gap-[15px] lg:gap-[20px] relative">
        {modalMessage && (
          <MessageModal
            message={modalMessage}
            onClose={() => setModalMessage(null)}
            username={modalUsername}
            profilePic={modalPfp}
          />
        )}
        {allMessages?.map?.((msg, index: number) => (
          <React.Fragment key={index}>
            <div className="flex gap-2 lg:gap-5 xl:gap-10 items-center overflow-y-auto">
              <div className="w-full hidden lg:flex gap-2 lg:gap-5 xl:gap-10 items-center mt-2 lg:mt-5 xl:mt-5">
                <div className="flex items-center gap-[10px] w-[30%] lg:w-[20%] justify-end">
                  <p
                    className="text-[12px] lg:text-[14px] xl:text-[14px] text-right text-wrap w-[50px] sm:w-[70%] font-mono"
                    style={{
                      color: websiteTheme.text_color,
                      wordBreak: "break-word",
                      whiteSpace: "normal",
                      fontFamily: "JetBrains Mono",
                    }}
                  >
                    {msg.username}
                  </p>
                  <div className="rounded-full w-7 h-7 overflow-hidden flex-shrink-0 my-100" style={{ marginTop: "3px" }}>
                    <img
                      src={msg.profilePic}
                      className="object-cover w-full h-full rounded-full"
                    />
                  </div>
                </div>
                <div className="w-[70%] lg:w-[60%]">
                  <p className="text-[14px] lg:text-[18px] xl:text-[20px] font-mono break-all" style={{ fontFamily: "JetBrains Mono" }}>
                    {msg.message}
                  </p>
                </div>
              </div>
              <div className="lg:hidden flex gap-[10px] items-center">
                <div className="rounded-full w-7 h-7 overflow-hidden flex-shrink-0" style={{ marginTop: "3px" }}>
                  <img
                    src={msg.profilePic}
                    className="object-cover w-full h-full rounded-full"
                  />
                </div>
                <div>
                  <p
                    className="text-[12px] lg:text-[14px] xl:text-[14px] font-mono"
                    style={{
                      color: websiteTheme.text_color,
                      wordBreak: "break-word",
                      whiteSpace: "normal",
                      fontFamily: "JetBrains Mono",
                    }}
                  >
                    {msg.username}
                  </p>
                  <div className="lg:w-[60%]">
                    <p
                      onClick={() => {
                        if (msg.message.length > 300) {
                          setModalMessage(msg.message);
                          setModalPfp(msg.profilePic);
                          setModalUsername(msg.username);
                        }
                      }}
                      className="text-[15px] lg:text-[18px] xl:text-[20px] font-mono"
                      style={{
                        color: websiteTheme.text_color,
                        wordBreak: "break-word",
                        whiteSpace: "normal",
                        fontFamily: "JetBrains Mono",
                      }}
                    >
                      {formatMessage(
                        msg.message.length > 300
                          ? `${msg.message.slice(0, 100)}...`
                          : msg.message
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="w-[100%] mx-auto h-[1px]"
              style={{
                backgroundImage: `linear-gradient(to right , ${websiteTheme.bgColor} , ${websiteTheme.text_color} , ${websiteTheme.bgColor})`,
              }}
            />
          </React.Fragment>
        ))}
        <div />
      </div>
      <AnimatePresence initial={false}>
        {allMessages.map((msg, index) => (
          <MessageComponent
            message={msg.message}
            username={msg.username}
            profilePic={msg.profilePic}
            key={index}
          />
        ))}
      </AnimatePresence>
    </Box>
  );
};

export default Focused;
