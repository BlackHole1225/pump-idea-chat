import { useState, useEffect } from "react";
import Marquee from "react-fast-marquee";
import { websiteThemeState } from "../../atoms/website-theme";
import { useRecoilValue } from "recoil";

interface Message {
  _id: any;
  message: string;
  username: string;
  profilePic: string;
}
interface InitialMessage {
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
      className=""
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
                className="text-[46px] max-w-[550px] my-auto font-mono"
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
                className="text-[14px] max-w-[500px] font-mono"
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

const GlobalChat = ({
  initialMessages,
  newMessage,
}: {
  initialMessages: InitialMessage[];
  newMessage: Message[];
}) => {
  const websiteTheme = useRecoilValue(websiteThemeState);
  const [allMessages, setAllMessages] = useState<Message[]>([]);

  useEffect(() => {
    setAllMessages([...initialMessages]);
  }, [initialMessages]);

  useEffect(() => {
    setAllMessages((prevMessages) => {
      const updatedMessages = [...prevMessages, ...newMessage];
      if (updatedMessages.length > 50) {
        updatedMessages.splice(0, updatedMessages.length - 50);
      }
      return updatedMessages;
    });
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
