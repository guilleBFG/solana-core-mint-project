
import dynamic from 'next/dynamic';
import type { FC } from "react";

// add this
const WalletMultiButtonDynamic = dynamic(
  async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
  { ssr: false }
);

const Connect: FC = () => {
  return <WalletMultiButtonDynamic  className="rounded-xl" />;
};

export default Connect;