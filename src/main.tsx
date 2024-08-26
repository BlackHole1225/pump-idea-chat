if (process.env.NODE_ENV !== 'production') {
  console.error = () => { };
  console.warn = () => { };
}

import React from "react";
import ReactDOM from "react-dom/client";

import 'swiper/css';
import 'react-toastify/dist/ReactToastify.css';
import "./index.css";
import { RecoilRoot } from "recoil";
import { SolanaWalletProvider } from "./components/WalletProvider";
// import { ContextProvider } from './contexts/ContextProvider';
import StoreProvider from "./providers/StoreProvider";

import App from "./App";

// import ErrorPage from "./components/Error.tsx";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <RecoilRoot>
    <SolanaWalletProvider>
    {/* <ContextProvider> */}
      <React.StrictMode>
        <StoreProvider>
          <App />
        </StoreProvider>
      </React.StrictMode>
      {/* </ContextProvider> */}
    </SolanaWalletProvider>
  </RecoilRoot>
);
  