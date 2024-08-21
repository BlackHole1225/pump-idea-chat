import { useEffect, useContext } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { useNavigate } from "react-router-dom";
import MyContext from "../context/MyContext";

// import styled from "styled-components";

// const CustomWalletButton = styled(WalletMultiButton)`
//   .wallet-adapter-button {
//     width: 100% !important;
//     text-align: center;
//     justify-content: center;
//     background-color: white;
//   }
// `;

// const CustomWalletProvider = styled(WalletModalProvider)`
//   .wallet-adapter-button {
//     width: 100% !important;
//     text-align: center;
//     justify-content: center;
//     background-color: white;
//   }
// `;

// import { ArrowIcon, PhantomIcon } from "./Icons";

import("@solana/wallet-adapter-react-ui/styles.css");

export const SolanaConnect: React.FC = () => {
  const navigate = useNavigate();
  const { publicKey, connect } = useWallet();
  const context = useContext(MyContext);

  if (!context) {
    throw new Error('SolanaConnect must be used within a MyContextProvider');
  }

  const { setIsFirst } = context;

  useEffect(() => {
    if (publicKey) {
      setIsFirst(false); // Update isFirst before navigating
      navigate("/chat");
    }
  }, [publicKey, navigate, setIsFirst]);

  const handleConnect = async () => {
    try {
      await connect();
      if (publicKey) {
        setIsFirst(false); // Update isFirst before navigating
        navigate("/chat");
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
      // Handle error (optional)
    }
  };

  return (
    <WalletModalProvider>
      <WalletMultiButton
        onClick={handleConnect}
      >
        CONNECT N GO RETARD
      </WalletMultiButton>
    </WalletModalProvider>
  );
};