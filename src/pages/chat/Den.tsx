import { Box } from "@mui/material";
import { useAppSelector } from "../../libs/redux/hooks";
import Focused from "../../components/message-animations/Focused";
import Chaos from "../../components/message-animations/Chaos";
import GlobalChat from "../../components/message-animations/Equator";

export default function Den() {
  const settingsModal = useAppSelector(
    (state) => state.chat.settingsModal.motion
  );

  return (
    <Box className="flex flex-col justify-center w-full h-full overflow-hidden ">
      {settingsModal === "focused" ? (
        <Focused />
      ) : settingsModal === "chaos" ? (
        <Chaos />
      ) : (
        <GlobalChat />
      )}
      {/* <Chaos /> */}
    </Box>
  );
}
