import { useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { useNavigate } from "react-router-dom";

import("@solana/wallet-adapter-react-ui/styles.css");

export const SolanaConnect: React.FC = () => {
  const navigate = useNavigate();
  const { publicKey, connect } = useWallet();

  useEffect(() => {
    if (publicKey) {
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