import { type NextPage } from "next";
import Head from "next/head";
import { useWallet } from "@solana/wallet-adapter-react";

import Connect from "../components/connect";
import AirdropSol from "../components/airdropSol";

const Home: NextPage = () => {
  const { connected } = useWallet();

  return (
    <>
      <Head>
        <title>NFT minter</title>
        <meta name="description" content="NFT minter" />
      </Head>

      <main className="flex min-h-screen flex-col  items-center   bg-gradient-to-b from-[#023d6d] to-[#151d2c]">
        <nav className="flex  w-full justify-end">
          <div className="mr-4 inline-flex items-center text-xl text-white">
            {!connected ? (
              <div className="p-4">Connect your wallet</div>
            ) : (
              <div className="p-4">Wallet connected</div>
            )}
            <Connect />
          </div>
        </nav>
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <AirdropSol/>
        </div>
      </main>
    </>
  );
};

export default Home;
