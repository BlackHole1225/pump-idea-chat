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
import { SolanaWalletProvider } from "./components/WalletProvider.tsx";
import StoreProvider from "./providers/StoreProvider/index.tsx";
import App from "./App.tsx";

// import ErrorPage from "./components/Error.tsx";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <RecoilRoot>
    <SolanaWalletProvider>
      <React.StrictMode>
        <StoreProvider>
          <App />
        </StoreProvider>
      </React.StrictMode>
    </SolanaWalletProvider>
  </RecoilRoot>
);
