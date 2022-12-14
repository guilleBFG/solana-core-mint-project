import { z } from "zod";
import * as web3 from "@solana/web3.js";

import { router, publicProcedure } from "../trpc";


export const mainRouter = router({
  example: publicProcedure
    .input(z.object({ text: z.string().nullish() }).nullish())
    .query(({ input }) => {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    }),
  getBalance: publicProcedure
    .input(z.object({ address: z.string().optional() }))
    .query(async ({ input }) => {
      
      if(!input.address) return{address: "", balance: 0}

      const connection = new web3.Connection(web3.clusterApiUrl("devnet"));

      const publicKey = new web3.PublicKey(input.address);

      const newBalance = await connection.getBalance(publicKey);

      return {
        address: input?.address,
        balance: newBalance / web3.LAMPORTS_PER_SOL,
      };
    }),
  airdropSol: publicProcedure
    .input(z.object({ address: z.string(), amount: z.number() }))
    .mutation(async ({ input }) => {
      const connection = new web3.Connection(web3.clusterApiUrl("devnet"));
      const publicKey = new web3.PublicKey(input?.address);

      const airdropSignature = await connection.requestAirdrop(
        publicKey,
        input?.amount * web3.LAMPORTS_PER_SOL
      );

      const latestBlockHash = await connection.getLatestBlockhash();

      await connection.confirmTransaction({
        blockhash: latestBlockHash.blockhash,
        lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
        signature: airdropSignature,
      });

      const newBalance = await connection.getBalance(publicKey);

      return {
        address: input?.address,
        balance: newBalance / web3.LAMPORTS_PER_SOL,
      };
    }),
});
