'use client';
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import type { FC } from "react";

const Connect: FC = () => {
  return <WalletMultiButton className="rounded-xl" />;
};

export default Connect;