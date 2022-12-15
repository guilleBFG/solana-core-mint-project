import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import React, { useState } from "react";
import * as web3 from "@solana/web3.js";


const TransferSol = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [receiverWallet, setReceiverWallet] = useState("");
  const [amount, setAmount] = useState("");

  const handleTransfer = async (event: any) => {
    event.preventDefault();

    const convertedAmt = parseFloat(amount);


    if (!publicKey || !connection) return;

    if (receiverWallet === "" || convertedAmt < 0) return;

    let signature: web3.TransactionSignature = "";

    try {

      const transaction = new web3.Transaction().add(
        web3.SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: new web3.PublicKey(receiverWallet),
          lamports: convertedAmt * web3.LAMPORTS_PER_SOL,
        })
      );

      signature = await sendTransaction(transaction, connection);

      await connection.confirmTransaction(signature, "confirmed");

      console.log(signature);

    } catch (error: any) {
      console.log("error", `Transaction failed! ${error?.message}`, signature);
    }
   

    return;
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
