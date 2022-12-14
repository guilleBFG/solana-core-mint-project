import { useWallet } from "@solana/wallet-adapter-react";
import React from "react";
import { trpc } from "../utils/trpc";

const AirdropSol = () => {
  const { publicKey } = useWallet();
  const airdropRequest = trpc.connectionRouter.airdropSol.useMutation();
  const walletBalance = trpc.connectionRouter.getBalance.useQuery({
    address: publicKey?.toString(),
  });

  const requestAirdrop = async () => {
    if (!publicKey) return;

    await airdropRequest.mutateAsync({
      address: publicKey.toString(),
      amount: 1,
    });

    walletBalance.refetch();
  };

  return (
    <>
      <button
        className="rounded-full bg-gradient-to-t from-blue-300 to-blue-900  p-4 text-2xl text-white"
        onClick={requestAirdrop}
      >
        Airdrop 1 Sol
        {/*hello.data ? hello.data.greeting : "Loading tRPC query..."*/}
      </button>
      

      {publicKey && !walletBalance.isFetching ?  <div className="text-white">{walletBalance.data?.balance}</div> : <div className="text-white">Loading balance...</div>}
      
    </>
  );
};

export default AirdropSol;
