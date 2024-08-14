import { useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { useNavigate } from "react-router-dom";
// import { ArrowIcon, PhantomIcon } from "./Icons";

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
      <WalletMultiButton
        
        onClick={handleConnect}
      >
        {/* <div className="flex items-center w-full gap-[10px] lg:gap-[20px] xl:gap-[25px] 2xl:gap-[30px]">
          <PhantomIcon />
          <p className="uppercase font-jbm text-[15px] lg:text-[24px]">
            connect your wallet
          </p>
          <ArrowIcon />
        </div> */}
      </WalletMultiButton>
    </WalletModalProvider>
  );
};
