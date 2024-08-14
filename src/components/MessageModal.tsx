import React from "react";
import { useRecoilValue } from "recoil";
import { websiteThemeState } from "../atoms/website-theme";
interface ModalProps {
  message: string;
  username: string | null;
  profilePic: string | undefined;
  onClose: () => void;
}

export const MessageModal: React.FC<ModalProps> = ({
  message,
  onClose,
  username,
  profilePic,
}) => {
  const websiteTheme = useRecoilValue(websiteThemeState);
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
    <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white p-4 rounded-lg w-[80%] mx-auto  overflow-y-auto-auto">
        <div className="rounded-full h-[50px] w-[50px] overflow-hidden flex-shrink-0 mx-auto">
          <img src={profilePic} className="object-cover w-full h-full" />
        </div>

        <p
          className="text-[14px] lg:text-[14px] xl:text-[16px] text-center mt-[10px]"
          style={{
            color:
              websiteTheme.bgColor === "#ffffff"
                ? "#000000"
                : websiteTheme.bgColor,
          }}
        >
          {username}
        </p>
        <div
          className=" w-[40%] h-[1px] mx-auto mt-[10px]"
          style={{
            color: websiteTheme.bgColor,
            backgroundColor: websiteTheme.bgColor,
          }}
        />
        <div
          className="mb-4 mt-[10px] "
          style={{
            color:
              websiteTheme.bgColor === "#ffffff"
                ? "#000000"
                : websiteTheme.bgColor,
          }}
        >
          {formatMessage(message)}
        </div>
        <button
          onClick={onClose}
          className={` w-[100%] p-[5px] mx-auto uppercase font-jbm `}
          style={{
            backgroundColor:
              websiteTheme.bgColor === "#ffffff"
                ? "#000000"
                : websiteTheme.bgColor,
            color:
              websiteTheme.bgColor === "#ffffff"
                ? "#ffffff"
                : websiteTheme.text_color,
          }}
        >
          Back to chat
        </button>
      </div>
    </div>
  );
};
