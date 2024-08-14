import { useState, useEffect, useCallback, useMemo } from "react";
import Marquee from "react-fast-marquee";
import React from "react";
import { Message } from "../../libs/redux/slices/chat-slice";
import { useAppSelector } from "../../libs/redux/hooks";
import { IconButton } from "@mui/material";
import MessageShowModal from "./MessageShowModal";

type SlidePorps = { messages: Message[]; scrollDirection: "left" | "right" };

const Slider = React.memo(({ messages = [], scrollDirection }: SlidePorps) => {
  const websiteTheme = useAppSelector((state) => state.theme.current.styles);
  const [messageModal, setMessageModal] = useState({
    isOpen: false,
    message: {} as any,
  });

  return (
    <Marquee
      speed={40}
      delay={0}
      autoFill
      direction={scrollDirection}
      key={messages.map((msg) => msg._id).join()}
      className="overflow-hidden h-max"
    >
      <div className="flex gap-[30px] h-full">
        <MessageShowModal
          {...messageModal}
          onRequestClose={() =>
            setMessageModal({ isOpen: false, message: {} as any })
          }
        />
        {messages.map((msg: Message) => (
          <React.Fragment key={msg._id}>
            <div className="flex items-center gap-[5px]">
              <p
                className="text-[12px] lg:text-[14px] xl:text-[14px]"
                style={{ color: websiteTheme.text_color }}
              >
                {msg.username}
              </p>
              <div
                className="rounded-full lg:h-[60px] lg:w-[60px] w-[45px] h-[45px] overflow-hidden border-[0.5px]"
                style={{ borderColor: websiteTheme.text_color }}
              >
                <IconButton
                  sx={{ padding: 0 }}
                  onClick={() => {
                    setMessageModal({
                      isOpen: true,
                      message: msg,
                    });
                  }}
                >
                  <img
                    src={msg.profilePic}
                    alt={msg.username}
                    className="w-full h-full rounded-full"
                  />
                </IconButton>
              </div>
              <p className="text-[11px] lg:text-[13px] xl:text-[14px] max-w-[550px] my-auto">
                {msg.message}
              </p>
            </div>
            <div
              className="w-[1px] lg:w-[1px] mx-auto h-[50px] lg:h-[70px]"
              style={{
                backgroundImage: `linear-gradient(to bottom, ${websiteTheme.bgColor}, ${websiteTheme.text_color}, ${websiteTheme.bgColor})`,
              }}
            />
          </React.Fragment>
        ))}
      </div>
    </Marquee>
  );
});

const EquatorTest = () => {
  const [firstRowMessages, setFirstRowMessages] = useState<Message[]>([]);
  const [secondRowMessages, setSecondRowMessages] = useState<Message[]>([]);
  const [thirdRowMessages, setThirdRowMessages] = useState<Message[]>([]);
  const [fourthRowMessages, setFourthRowMessages] = useState<Message[]>([]);

  const initialMessages = useAppSelector((state) => state.chat.initialMessages);
  const newMessage = useAppSelector((state) => state.chat.newMessage);
  const websiteTheme = useAppSelector((state) => state.theme.current.styles);

  const updateFourthRow = useCallback(
    (message: Message) => {
      setFourthRowMessages((prev) => {
        const updated = [...prev, message];
        if (updated.length <= 20) return updated;
        setFirstRowMessages(secondRowMessages);
        setSecondRowMessages(thirdRowMessages);
        setThirdRowMessages(prev.slice(0, 14));
        return updated.slice(-4);
      });
    },
    [secondRowMessages, thirdRowMessages]
  );

  useEffect(() => {
    if (newMessage) updateFourthRow(newMessage);
  }, [newMessage, updateFourthRow]);

  useEffect(() => {
    const [first, second, third, fourth] = [
      initialMessages.slice(0, 14),
      initialMessages.slice(14, 32),
      initialMessages.slice(32, 48),
      initialMessages.slice(48),
    ];
    setFirstRowMessages(first);
    setSecondRowMessages(second);
    setThirdRowMessages(third);
    setFourthRowMessages(fourth);
  }, [initialMessages]);

  const sliderProps = useMemo<SlidePorps[]>(
    () => [
      { messages: firstRowMessages, scrollDirection: "left" },
      { messages: secondRowMessages, scrollDirection: "right" },
      { messages: thirdRowMessages, scrollDirection: "left" },
      { messages: fourthRowMessages, scrollDirection: "right" },
    ],
    [firstRowMessages, secondRowMessages, thirdRowMessages, fourthRowMessages]
  );

  return (
    <div className="w-full flex flex-col justify-end h-full lg:gap-[40px] gap-[60px]">
      {sliderProps.slice(0, 3).map((props, index) => (
        <React.Fragment key={index}>
          <Slider {...props} />
          <div
            className={`w-[50%] h-[1px] ${
              index === 1 ? "mx-auto" : ""
            }`}
            style={{
              backgroundImage: `linear-gradient(to right, ${websiteTheme.bgColor}, ${websiteTheme.text_color}, ${websiteTheme.bgColor})`,
            }}
          />
        </React.Fragment>
      ))}
      {/* <Slider {...sliderProps[3]} /> */}
    </div>
  );
};

export default EquatorTest;
