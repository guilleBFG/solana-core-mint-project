import { type AppType } from "next/app";

import { trpc } from "../utils/trpc";

import "../styles/globals.css";
import WalletContextProvider from "../components/walletContextProvider";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <WalletContextProvider>
      <Component {...pageProps} />
    </WalletContextProvider>
  );
};

export default trpc.withTRPC(MyApp);
