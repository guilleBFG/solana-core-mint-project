import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import React, { useState } from "react";
import { Transaction } from "@solana/web3.js"; 
import { trpc } from "../utils/trpc";

const TransferSol = () => {
  const { connection } = useConnection();
  const wallet = useWallet();
  const [receiverWallet, setReceiverWallet] = useState("");
  const [amount, setAmount] = useState("");
  const { mutateAsync: transferHandler } =
    trpc.connectionRouter.transferSol.useMutation();

  const handleTransfer = async (event: any) => {
    event.preventDefault();

    if (!wallet.publicKey || !connection) return;

    const convertedAmt = parseFloat(amount);

    const tx = await transferHandler({
      amount: convertedAmt,
      receiverAddress: receiverWallet,
      senderAddress: wallet.publicKey.toString(),
    });

    if (tx) {
      const transactionFromJson = Transaction.from(tx.data);
      const latestBlockHash = await connection.getLatestBlockhash();

      console.log(transactionFromJson);
      const signedTx = await wallet.signTransaction?.(transactionFromJson);

      if (signedTx) {
        const signatrue = await connection.sendRawTransaction(
          signedTx.serialize()
        );

        await connection.confirmTransaction({
          blockhash: latestBlockHash.blockhash,
          lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
          signature: signatrue,
        });
        console.log(signedTx);
      }
    }
  };
  return (
    <form className="flex flex-col text-center text-white">
      <div className="text-2xl font-semibold ">Send Sol to your friends</div>
      <div className="inline-flex p-4">
        <label className="mr-4 ">Destination Wallet:</label>
        <input
          required={true}
          className="text-black"
          type="text"
          onChange={(event) => setReceiverWallet(event.target.value)}
        ></input>
      </div>
      <div className="mb-4 inline-flex">
        <label className="mr-6 ml-4">Amount:</label>
        <input
          required={true}
          className="ml-16 text-black"
          type="number"
          onChange={(event) => setAmount(event.target.value)}
        ></input>
        <label className="ml-4">Sol</label>
      </div>

      <button
        className="rounded-full bg-gradient-to-t from-green-300 to-green-600  p-4 font-bold italic text-white"
        onClick={handleTransfer}
      >
        Send Sol to destination wallet
      </button>
    </form>
  );
};

export default TransferSol;
