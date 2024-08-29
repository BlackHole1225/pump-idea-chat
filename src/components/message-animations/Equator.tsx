import { useState, useEffect } from "react";
import Marquee from "react-fast-marquee";
import { websiteThemeState } from "../../atoms/website-theme";
import { useRecoilValue } from "recoil";
import axios from "axios";

const random_profile_image_url = import.meta.env.VITE_RANDOM_PROFILE_URL;
const initial_chat_messages_url = import.meta.env.VITE_CHAT_SERVER_URL;
const websocket_url = import.meta.env.VITE_WEBSOCKET_URL;

interface Message {
  _id: any;
  message: string;
  username: string;
  profilePic: string;
}

const Slider = ({
  messages,
  scrollDirection,
}: {
  messages: Message[];
  scrollDirection: "left" | "right" | "up" | "down";
}) => {
  const websiteTheme = useRecoilValue(websiteThemeState);
  return (
    <Marquee
      className="overflow-hidden"
      speed={40}
      delay={0}
      autoFill
      direction={scrollDirection}
      key={messages.map((msg) => msg._id).join()}
    >
      <div className="flex gap-[30px] w-full">
        {messages.map((msg: Message) => (
          <>
            <div className="flex items-center gap-[10px]">
              <p
                className="text-[12px] font-mono"
                style={{
                  color: websiteTheme.text_color,
                  fontFamily: "JetBrains Mono",
                }}
              >
                {msg.username}
              </p>
              <div className="rounded-full lg:h-[60px] lg:w-[60px] w-[45px] h-[45px] overflow-hidden">
                <img
                  src={msg.profilePic}
                  className="object-cover w-full h-full"
                />
              </div>
              <p
                className="max-w-[550px] break-all text-wrap my-auto font-mono"
                style={{
                  fontFamily: "JetBrains Mono",
                }}
              >
                {msg.message}
              </p>
            </div>
            <div
              className="w-[1px] lg:w-[1px] mx-auto h-[50px] lg:h-[70px]"
              style={{
                backgroundImage: `linear-gradient(to bottom , ${websiteTheme.bgColor} , ${websiteTheme.text_color} , ${websiteTheme.bgColor} )`,
              }}
            />
          </>
        ))}
        {messages.map((msg: Message) => (
          <>
            <div className="flex items-center gap-[10px]">
              <p
                className="text-[12px] font-mono"
                style={{
                  color: websiteTheme.text_color,
                  fontFamily: "JetBrains Mono",
                }}
              >
                {msg.username}
              </p>
              <div className="rounded-full lg:h-[60px] lg:w-[60px] w-[40px] h-[40px] overflow-hidden">
                <img
                  src={msg.profilePic}
                  className="object-cover w-full h-full"
                />
              </div>
              <p
                className="text-[14px] max-w-[550px] break-all text-wrap font-mono"
                style={{
                  fontFamily: "JetBrains Mono",
                }}
              >
                {msg.message}
              </p>
            </div>
            <div
              className="w-[1px] lg:w-[1px] mx-auto h-[50px] lg:h-[90px]"
              style={{
                backgroundImage: `linear-gradient(to bottom , ${websiteTheme.bgColor} , ${websiteTheme.text_color} , ${websiteTheme.bgColor} )`,
              }}
            />
          </>
        ))}
      </div>
    </Marquee>
  );
};

const GlobalChat = () => {
  const websiteTheme = useRecoilValue(websiteThemeState);
  const [allMessages, setAllMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<Message | null>(null);
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    if (newMessage) {
      setAllMessages((prevMessages) => {
        const updatedMessages = [...prevMessages, newMessage];
        if (updatedMessages.length > 50) {
          updatedMessages.splice(0, updatedMessages.length - 50);
        }
        return updatedMessages;
      });
    }
  }, [newMessage]);

  const distributeMessagesIntoRows = (messages: Message[]) => {
    const rows: Message[][] = [[], [], [], []];
    const chunkSize = Math.ceil(messages.length / 4);
    for (let i = 0; i < messages.length; i++) {
      const chunkIndex = Math.floor(i / chunkSize);
      rows[chunkIndex].push(messages[i]);
    }
    return rows;
  };

  const rows = distributeMessagesIntoRows(allMessages);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(initial_chat_messages_url, {
        params: {
          method: "get_messages",
          room: "public", // Replace with the actual room name or parameter you need
        },
      });
      // console.log(">>>>>>>>>>>>>>>>>>>>> response <<<<<<<<<<<<<<<<<<<<<<<", response)
      const fetchedMessages = response.data.map((msg: any) => {
        return {
          _id: msg._id,
          message: msg.text,
          username:
            msg.username == "Unknown" || msg.username == ""
              ? msg.walletAddress
              : msg.username,
          profilePic: msg.sender_pfp?.length
            ? msg.sender_pfp
            : `${random_profile_image_url}/${Math.floor(
                Math.random() * 50
              )}.jpg`,
          timestamp: new Date(msg.timestamp).getTime(),
          isEmpty: false,
        };
      });

      // console.log(">>>>>>>>>>>>>>>>>>>>> fetchedMessages <<<<<<<<<<<<<<<<<<<<<<<", fetchedMessages.reverse())

      setAllMessages(fetchedMessages);
      // setGridData(fetchedMessages.reverse());
    } catch (error) {
      console.error("Error fetching messages:", error);
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
      console.log("chaos Received message:", receivedMessage);
      const messageItem: Message = {
        _id: receivedMessage._id || "",
        message: receivedMessage.message,
        username:
          receivedMessage.sender_username == "Unknown" ||
          receivedMessage.sender_username == ""
            ? receivedMessage.sender_wallet_address ||
              receivedMessage.walletAddress
            : receivedMessage.sender_username,
        profilePic: receivedMessage.sender_pfp?.length
          ? receivedMessage.sender_pfp
          : `${random_profile_image_url}/${Math.floor(Math.random() * 50)}.jpg`,
      };

      setNewMessage(messageItem);
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

  return (
    <div className="w-full flex flex-col justify-end h-full gap-[40px]">
      <Slider messages={rows[0]} scrollDirection="left" />
      <div
        className="w-[50%] h-[1px]"
        style={{
          backgroundImage: `linear-gradient(to right , ${websiteTheme.bgColor} , ${websiteTheme.text_color} , ${websiteTheme.bgColor} )`,
        }}
      />
      <Slider messages={rows[1]} scrollDirection="right" />
      <div
        className="w-[50%] mx-auto h-[1px]"
        style={{
          backgroundImage: `linear-gradient(to right , ${websiteTheme.bgColor} , ${websiteTheme.text_color} , ${websiteTheme.bgColor} )`,
        }}
      />
      <Slider messages={rows[2]} scrollDirection="left" />
      <div className="flex flex-col items-end">
        <div
          className="w-[50%] h-[1px]"
          style={{
            backgroundImage: `linear-gradient(to right , ${websiteTheme.bgColor} , ${websiteTheme.text_color} , ${websiteTheme.bgColor} )`,
          }}
        />
      </div>
      <Slider messages={rows[3]} scrollDirection="right" />
    </div>
  );
};

export default GlobalChat;
