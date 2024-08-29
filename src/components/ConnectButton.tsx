import { useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import("@solana/wallet-adapter-react-ui/styles.css");

const server_url = import.meta.env.VITE_CHAT_SERVER_URL;

export const SolanaConnect: React.FC = () => {
  const navigate = useNavigate();
  const { publicKey, connect } = useWallet();

  const registerWallet = async () => {
    if (!publicKey) {
      return;
    }
    try {
      const response = await axios.post(server_url, {
        method: "register",
        walletAddress: publicKey.toString(), // Sending the wallet address
      });
      if (response.data.success) {
        navigate("/chat");
      } else {
        console.error("Failed to register wallet:", response.data.message);
        // Handle registration failure (optional)
      }
    } catch (error) {
      console.error("Error registering wallet:", error);
      // Handle error (optional)
    }
  };

  useEffect(() => {
    if (publicKey) {
      registerWallet();
      navigate("/chat");
    }
  }, [publicKey, navigate]);

  const handleConnect = async () => {
    try {
      await connect();
      if (publicKey) {
        navigate("/chat");
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
      // Handle error (optional)
    }
  };

  return (
    <WalletModalProvider>
      <WalletMultiButton onClick={handleConnect}>
        <span
          style={{
            color: "#0000FF",
            fontFamily: "Jetbrains mono",
          }}
        >
          CONNECT N GO RETARD
        </span>
      </WalletMultiButton>
    </WalletModalProvider>
  );
};
