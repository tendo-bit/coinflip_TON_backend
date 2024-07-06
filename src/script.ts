import * as anchor from "@project-serum/anchor";
import { associatedAddress, TOKEN_PROGRAM_ID } from "@project-serum/anchor/dist/cjs/utils/token";
import { Program, Wallet, web3 } from "@project-serum/anchor";
import {
  addMessage,
  addOrUpdateUser,
  addWinner,
  createGame,
  enterGame,
  getLastMessage,
  getLastPda,
  getLastWinners,
  getTimes,
  getTotalSum,
  getTotalBetAmountAndPayout,
  getUser,
  getUsers,
  init,
  getCoinflipPools,
  createCoinflip,
  joinCoinflip,
  claimCoinflip,
  getLastHistory,
  addHistory
} from "./db";
import {
  Connection,
  PartiallyDecodedInstruction,
  ParsedInstruction,
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
  LAMPORTS_PER_SOL,
  ComputeBudgetProgram
} from "@solana/web3.js";
import { bs58 } from "@project-serum/anchor/dist/cjs/utils/bytes";
import { IDL, Jackpot } from "./jackpot";
import WalletSeed from "./backend-wallet.json";
import { Server } from "socket.io";

export const SOLANA_MAINNET =
  "https://mainnet.helius-rpc.com/?api-key=e2aaf324-f61f-44af-8bf9-d3beab7a03a0";
export const SOLANA_DEVNET = "https://api.devnet.solana.com";
export const solConnection = new Connection(SOLANA_MAINNET, "confirmed");
export const VAULT_SEED = "vault-authority";
export const GLOBAL_AUTHORITY_SEED = "global-authority";
export const REFERRAL_SEED = "referral";
export const SPL_ESCROW_SEED = "spl-escrow";

export const jupAddress = new anchor.web3.PublicKey("JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN") // decimals 6
export const bonkAddress = new anchor.web3.PublicKey("DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263") // decimals 5
export const wifAddress = new anchor.web3.PublicKey("EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm") // decimals 6
export const popcatAddress = new anchor.web3.PublicKey("7GCihgDB8fe6KNjn2MYtkzZcRjQy3t9GHdC8uHYmW2hr") // decimals 9

export const PROGRAM_ID = process.env.PROGRAM_ID;

const programId = new anchor.web3.PublicKey(PROGRAM_ID);

const wallet = new Wallet(
  Keypair.fromSecretKey(Uint8Array.from(WalletSeed), { skipValidation: true })
);
const newProvider = new anchor.AnchorProvider(solConnection, wallet, {});
var program = new anchor.Program(IDL, programId, newProvider) as Program;

export const NONCE_LIST = ["WPNHsFPy", "21fNLyZJ", "6nZocsAR", "TyVAUGgt", "3AMzyLe7", "YzXfBfPP"];

export const getLastPdaIx = async () => {
  try {
    init();
    const result = await getLastPda();
    return result;
  } catch (e) {
    console.log(e, " : error from get pda");
    return false;
  }
};

export const getLastMsgIx = async () => {
  try {
    init(); 
    const result = await getLastMessage();
    return result;
  } catch (e) {
    console.log(e, " : error from add Msg");
    return false;
  }
};

export const getLastHistoryIx = async () => {
  try {
    init(); 
    const result = await getLastHistory();
    return result;
  } catch (e) {
    console.log(e, " : error from add Msg");
    return false;
  }
};

export const getUserIx = async (user_address: string) => {
  try {
    init();
    const result = await getUser(user_address);
    return result;
  } catch (e) {
    console.log(e, " : error from add Msg");
    return false;
  }
}

export const getUsersIx = async () => {
  try {
    init();
    const result = await getUsers();
    return result;
  } catch (e) {
    console.log(e, " : error from add Msg");
    return false;
  }
}

export const getCoinflipPoolsIx = async () => {
  try {
    init();
    const result = await getCoinflipPools();
    return result;
  } catch (e) {
    console.log(e, " : error from add Msg");
    return false;
  }
}

export const getLastWinnerIx = async () => {
  try {
    init();
    const result = await getLastWinners();
    return result;
  } catch (e) {
    console.log(e, " : error from get winner");
    return false;
  }
};

export const getTimesIx = async () => {
  try {
    init();
    const result = await getTimes();
    return result;
  } catch (e) {
    console.log(e, " : error from add Msg");
    return false;
  }
};

export const getTotalSumIx = async () => {
  try {
    init();
    const result = await getTotalSum();

    return result[0].total;
  } catch (e) {
    console.log(e, " : error from add Msg");
    return false;
  }
};

export const getTotalBetAmountAndPayoutIx = async (user_address) => {
  try {
    init();
    return await getTotalBetAmountAndPayout(user_address);
  } catch (e) {
    console.log(e, " : error from add Msg");
    return false;
  }
};

export const addMessageIx = async (user_name: string, msg: string) => {
  try {
    init();
    const result = await addMessage(user_name, msg);
    return result;
  } catch (e) {
    console.log(e, " : error from add Msg");
    return false;
  }
};

export const addHistoryIx = async (user_address : string, isHead : boolean, isWin : boolean, flip_amount : number) => {
  try {
    init();
    const result = await addHistory(user_address, isHead, isWin, flip_amount);
    return result;
  } catch (e) {
    console.log(e, " : error from add History");
    return false;
  }
};

interface UpdateFields {
  user_name?: string;
  avatar?: string;
}

export const addOrUpdateUserIx = async (user_address: string, newUserData: UpdateFields) => {
  try {
    init();
    const result = await addOrUpdateUser(user_address, newUserData);
    return result;
  } catch (e) {
    console.log(e, " : error from update user");
    return false;
  }
};

export const addWinnerIx = async (
  user_name: string,
  referrer: string,
  bet_amount: number,
  payout: number,
  tx: string,
  pda: string
) => {
  try {
    init();
    const result = await addWinner(user_name, referrer, bet_amount, payout, tx, pda);
    return result;
  } catch (e) {
    console.log(e, " : error from add Winner");
    return false;
  }
};

export const performTx = async (txId: string, encodedTx: string, io: Server) => {
  try {
    init();
    const ts = new Date().getTime();
    const txInfo = Transaction.from(Buffer.from(encodedTx, 'base64'));


    let length = txInfo.instructions.length;
    let hash = "";
    let valid = -1;
    let ixId = -1;

    for (let i = 0; i < length; i++) {
      for (let j = 0; j < NONCE_LIST.length; j++) {
        hash = (
          txInfo.instructions[
          i
          ] as unknown as PartiallyDecodedInstruction
        ).data;
        const bytes = bs58.encode(Buffer.from(hash));
        if (hash != undefined && bytes.slice(0, 8) == NONCE_LIST[j]) {
          valid = j;
          break;
        }
      }
      if (valid > -1) {
        ixId = i;
        break;
      }
    }


    let result;

    let signer = txInfo.instructions[ixId].keys[0].pubkey.toBase58();
    let gamePda = txInfo.instructions[ixId].keys[2].pubkey.toBase58();
    let mint = txInfo.instructions[ixId].keys[5].pubkey.toBase58();

    console.log("signer", txInfo.instructions[ixId].keys[0].pubkey);
    console.log("gamePda", gamePda);
    console.log("mint", mint);

    switch (valid) {
      case 0: {
        console.log("Initialize");
        result = { type: "Initialize" };
        break;
      }
      case 1: {
        console.log("PlayGame");
        let bytes = Buffer.from(hash);
        let b = bytes.slice(16, 24).reverse();
        let c = bytes.slice(24);
        let damount = new anchor.BN(b).toNumber().toString();
        let referrer = bs58.encode(c)

        await createGame(
          Math.floor(ts / 1000),
          signer,
          mint,
          damount,
          referrer,
          gamePda,
          io
        );

        break;
      }
      case 2: {
        console.log("EnterGame");
        let bytes = Buffer.from(hash);
        let b = bytes.slice(8, 16).reverse();
        let c = bytes.slice(16);
        let damount = new anchor.BN(b).toNumber().toString();
        let referrer = bs58.encode(c)

        await enterGame(signer, mint, damount, referrer, gamePda, io);

        break;
      }
      case 3: {
        console.log("CreateCoinflip");
        let bytes = Buffer.from(hash);
        let b = bytes.slice(16, 24).reverse();
        let c = bytes.slice(24, 32).reverse();
        let d = bytes.slice(32);
        let number = new anchor.BN(b).toNumber().toString();
        let damount = new anchor.BN(c).toNumber().toString();
        let referrer = bs58.encode(d)

        await createCoinflip(
          signer,
          mint,
          number,
          damount,
          referrer,
          gamePda,
          io
        );

        break;
      }
      case 4: {
        console.log("JoinCoinflip");
        let bytes = Buffer.from(hash);
        let b = bytes.slice(8, 16).reverse();
        let c = bytes.slice(16, 24).reverse();
        let d = bytes.slice(24);
        let number = new anchor.BN(b).toNumber().toString();
        let damount = new anchor.BN(c).toNumber().toString();
        let referrer = bs58.encode(d)

        await joinCoinflip(
          signer,
          mint,
          number,
          damount,
          referrer,
          gamePda,
          io
        );

        break;
      }
      case 5: {
        console.log("CliamCoinflip");

        await claimCoinflip(
          signer,
          txInfo.instructions[ixId].keys[7].pubkey.toBase58(),
          gamePda,
          txId,
          io
        );

        break;
      }
    }

    return true;
  } catch (e) {
    console.log(e, " : error from perform");
    return false;
  }
};

export const getDataFromSignature = async (sig: string) => {
  try {
    let tx = await solConnection.getParsedTransaction(sig, "confirmed");
    if (tx && !tx.meta.err) {
      let length = tx.transaction.message.instructions.length;
      let hash = "";
      let valid = -1;
      let ixId = -1;

      for (let i = 0; i < length; i++) {
        for (let j = 0; j < NONCE_LIST.length; j++) {
          hash = (
            tx.transaction.message.instructions[
            i
            ] as PartiallyDecodedInstruction
          ).data;
          if (hash != undefined && hash.slice(0, 8) == NONCE_LIST[j]) {
            valid = j;
            break;
          }
        }
        if (valid > -1) {
          ixId = i;
          break;
        }
      }

      let result;

      let accountKeys = (
        tx.transaction.message.instructions[ixId] as PartiallyDecodedInstruction
      ).accounts;
      let signer = accountKeys[0].toBase58();
      let gamePda = accountKeys[1].toBase58();
      console.log("gamePda", gamePda);
      switch (valid) {
        case 0: {
          console.log("Initialize");
          result = { type: "Initialize" };
          break;
        }
        case 1: {
          console.log("PlayGame");
          let bytes = bs58.decode(hash);
          let b = bytes.slice(16, 24).reverse();
          let damount = new anchor.BN(b).toNumber().toString();

          result = {
            signer: signer,
            gamePool: gamePda,
            amount: damount,
            time: tx.blockTime,
            type: "PlayGame",
          };
          break;
        }
        case 2: {
          console.log("EnterGame");
          let bytes = bs58.decode(hash);
          let b = bytes.slice(8, 16).reverse();
          let damount = new anchor.BN(b).toNumber().toString();

          result = {
            signer: signer,
            gamePool: gamePda,
            amount: damount,
            time: tx.blockTime,
            type: "EnterGame",
          };
          break;
        }
        case 3: {
          console.log("ClaimReward");
          const instruction = tx.meta.innerInstructions[0]
            .instructions[0] as ParsedInstruction;
          const damount = instruction.parsed.info.lamports;

          result = {
            signer: signer,
            gamePool: gamePda,
            winner: accountKeys[2].toBase58(),
            amount: damount,
            type: "ClaimReward",
          };
          break;
        }
      }
      return result;
    }
  } catch (e) {
    console.log("SSSSSSSSSSSSSS");
    console.log("error: ", e);
  }
};

// TODO: need to check if the winner correct getting after confirmed
export const claimReward = async (pda: PublicKey, io: Server) => {
  // const winnerResult = await getLastWinners();
  const result = await createClaimRewardTx(wallet.publicKey, pda);
  console.log("GAME ENDED:", new Date().toLocaleTimeString());
  io.emit("gameEnded", {
    winner: result.user,
    referrer: result.referrer,
    bet: result.bet,
    payout: result.payout,
    // ts: txId,
    resultHeight: result.resultHeight,
    // lastLogs: winnerResult,
  });
  const txId = await newProvider.sendAndConfirm(result.tx, [], {
    commitment: "confirmed",
  });
  console.log("Signature:", txId);

  await addWinnerIx(result.user, result.referrer, result.bet, result.payout, txId, pda.toBase58());
};

// TODO: check pda info reading step to make working with confirmatin time
export const createClaimRewardTx = async (
  userAddress: PublicKey,
  gamePool: PublicKey
) => {
  const [solVault, bump] = await PublicKey.findProgramAddress(
    [Buffer.from(VAULT_SEED)],
    programId
  );
  const [globalData] = await PublicKey.findProgramAddress(
    [Buffer.from(GLOBAL_AUTHORITY_SEED)],
    programId
  );
  const [referralData] = await PublicKey.findProgramAddress(
    [Buffer.from(REFERRAL_SEED)],
    programId
  );

  const state = await getGamePoolStateByKey(gamePool);
  const totalDeposit = state.totalDepositUsd.toNumber();
  const randPosition = state.rand.toNumber() % totalDeposit;
  let total = randPosition;

  let valid = 0;
  let index = 0;
  for (let i = 0; i < state.depositAmountsUsd.length; i++) {
    if (total > state.depositAmountsUsd[i].toNumber()) {
      total -= state.depositAmountsUsd[i].toNumber();
    } else {
      index = i;
      valid = 1;
      break;
    }
  }
  if (valid != 1) return;

  const winnerSplA = await associatedAddress({ mint: jupAddress, owner: state.entrants[index] });
  const winnerSplB = await associatedAddress({ mint: bonkAddress, owner: state.entrants[index] });
  const winnerSplC = await associatedAddress({ mint: wifAddress, owner: state.entrants[index] });
  const winnerSplD = await associatedAddress({ mint: popcatAddress, owner: state.entrants[index] });

  const referralState = await getReferralStateByKey(referralData);
  const players = referralState.players;
  const referrers = referralState.referrers;

  let j = 0;
  for (let i = 0; i < players.length; i++) {
    if (players[i].toBase58() === state.entrants[index].toBase58()) {
      j = i;
      break;
    }
  }

  const referrerSplA = await associatedAddress({ mint: jupAddress, owner: referrers[j] });
  const referrerSplB = await associatedAddress({ mint: bonkAddress, owner: referrers[j] });
  const referrerSplC = await associatedAddress({ mint: wifAddress, owner: referrers[j] });
  const referrerSplD = await associatedAddress({ mint: popcatAddress, owner: referrers[j] });



  const [splEscrowA] = await PublicKey.findProgramAddress(
    [Buffer.from(SPL_ESCROW_SEED), jupAddress.toBuffer()],
    programId
  );

  const [splEscrowB] = await PublicKey.findProgramAddress(
    [Buffer.from(SPL_ESCROW_SEED), bonkAddress.toBuffer()],
    programId
  );

  const [splEscrowC] = await PublicKey.findProgramAddress(
    [Buffer.from(SPL_ESCROW_SEED), wifAddress.toBuffer()],
    programId
  );

  const [splEscrowD] = await PublicKey.findProgramAddress(
    [Buffer.from(SPL_ESCROW_SEED), popcatAddress.toBuffer()],
    programId
  );

  const tx = new Transaction();
  const computePriceIx = ComputeBudgetProgram.setComputeUnitPrice({
    microLamports: 2000000,
  });
  tx.add(computePriceIx);

  tx.add(
    program.instruction.claimReward(bump, {
      accounts: {
        admin: userAddress,
        globalData,
        gamePool,
        mintA: jupAddress,
        mintB: bonkAddress,
        mintC: wifAddress,
        mintD: popcatAddress,
        winner: state.entrants[index],
        winnerSplA,
        winnerSplB,
        winnerSplC,
        winnerSplD,
        referrer: referrers[j],
        referrerSplA,
        referrerSplB,
        referrerSplC,
        referrerSplD,
        solVault,
        splEscrowA,
        splEscrowB,
        splEscrowC,
        splEscrowD,
        referralData,
        systemProgram: SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
      },
      instructions: [],
      signers: [],
    })
  );

  return {
    tx: tx,
    payout: totalDeposit / LAMPORTS_PER_SOL,
    bet: state.depositAmountsUsd[index].toNumber() / LAMPORTS_PER_SOL,
    user: state.entrants[index].toBase58(),
    referrer: referrers[j].toBase58(),
    resultHeight: randPosition / totalDeposit,
  };
};

// TODO: need to check if data correct after confirmed
export const getResult = async (gameKey: PublicKey) => {
  //   let i = 0;
  //   while (i < 5) {
  //     try {

  const [referralData] = await PublicKey.findProgramAddress(
    [Buffer.from(REFERRAL_SEED)],
    programId
  );

  const referralState = await getReferralStateByKey(referralData);
  const players = referralState.players;
  const referrers = referralState.referrers;

  const firstResult = await getGamePoolStateByKey(gameKey);
  // console.log("getResult", firstResult);
  if (!firstResult) return [];
  const gameInfo = [];
  for (let i = 0; i < firstResult.entrants.length; i++) {

    let j = 0;
    for (let k = 0; k < players.length; k++) {
      if (players[k].toBase58() === firstResult.entrants[i].toBase58()) {
        j = k;
        break;
      }
    }
    gameInfo.push({
      player: firstResult.entrants[i].toBase58(),
      referrer: referrers[j],
      mint: firstResult.depositMint[i].toBase58(),
      amount: firstResult.depositAmounts[i].toNumber(),
      amountUsd: firstResult.depositAmountsUsd[i].toNumber()
    });
  }
  return gameInfo;
  //     } catch {
  //       sleep(1000);
  //       i++;
  //       continue;
  //     }
  //   }
  //   return [];
};

export const getCoinflipAccounts = async () => {
  type CoinflipDataRaw = anchor.IdlAccounts<Jackpot>['CoinflipPool'];
  let accounts: anchor.ProgramAccount<CoinflipDataRaw>[] = []

  try {
    const result = await newProvider.connection.getProgramAccounts(programId);
    const coinflipDiscriminator = anchor.BorshAccountsCoder.accountDiscriminator('CoinflipPool');
    result.forEach(({ pubkey, account }) => {
      const discriminator = account.data.slice(0, 8);

      if (coinflipDiscriminator.compare(discriminator) === 0) {

        accounts.push({
          publicKey: pubkey,
          account: program.coder.accounts.decode<CoinflipDataRaw>(
            'CoinflipPool',
            account.data
          ),
        });
      }
    });

    const users = await getUsers();

    let gamesList: {
      pda: string,
      winner: string,
      creator: string,
      creator_player: string,
      creator_name: string,
      creator_mint: string,
      creator_amount: number,
      creator_number: number,
      joiner: string,
      joiner_player: string,
      joiner_name: string,
      joiner_mint: string,
      joiner_amount: number,
      joiner_number: number,
      pool_amount: number,
    }[] = [];
    if (accounts && accounts.length > 0) {
      accounts
        .filter((item: any) => item.account.claimed === 0)
        .map((item: any) => {
          const user1 = users.find(user => user.user_address === item.account.creatorPlayer.toBase58());
          const user2 = users.find(user => user.user_address === item.account.joinerPlayer.toBase58());
          // console.log(user1, user2, users)
          gamesList.push({
            pda: item.publicKey.toBase58(),
            winner: item.account.winner.toBase58(),
            creator: user1 ? user1.avatar ? user1.avatar : '/img/default.png' : '/img/default.png',
            creator_player: item.account.creatorPlayer.toBase58(),
            creator_name: user1 ? user1.user_name ? user1.user_name : item.account.creatorPlayer.toBase58().slice(0, 3) + "..." + item.account.creatorPlayer.toBase58().slice(-3) :item.account.creatorPlayer.toBase58().slice(0, 3) + "..." + item.account.creatorPlayer.toBase58().slice(-3),
            creator_mint: item.account.creatorMint.toBase58(),
            creator_amount: item.account.creatorAmount.toNumber(),
            creator_number: item.account.creatorSetNumber.toNumber(),
            joiner: user2 ? user2.avatar ? user2.avatar : '/img/default.png' : '/img/default.png',
            joiner_player: item.account.joinerPlayer.toBase58(),
            joiner_name: user2 ? user2.user_name ? user2.user_name : item.account.joinerPlayer.toBase58().slice(0, 3) + "..." + item.account.joinerPlayer.toBase58().slice(-3) : item.account.joinerPlayer.toBase58().slice(0, 3) + "..." + item.account.joinerPlayer.toBase58().slice(-3),
            joiner_mint: item.account.joinerMint.toBase58(),
            joiner_amount: item.account.joinerAmount.toNumber(),
            joiner_number: item.account.joinerSetNumber.toNumber(),
            pool_amount: item.account.poolAmount.toNumber()
          })
        })
    }
    return gamesList;
  } catch (error) {
    console.log(error);
    return accounts;
  }

}

export const getGamePoolStateByKey = async (
  gameKey: PublicKey
): Promise<GamePool | null> => {
  try {
    const gameState = await program.account.gamePool.fetch(gameKey);
    return gameState as unknown as GamePool;
  } catch {
    return null;
  }
};

export const getCoinflipPoolStateByKey = async (
  gameKey: PublicKey
): Promise<CoinflipPool | null> => {
  try {
    const gameState = await program.account.coinflipPool.fetch(gameKey);
    return gameState as unknown as CoinflipPool;
  } catch {
    return null;
  }
};

export const getReferralStateByKey = async (
  referralKey: PublicKey
): Promise<ReferralData | null> => {
  try {
    const referralState = await program.account.referralData.fetch(referralKey);
    return referralState as unknown as ReferralData;
  } catch {
    return null;
  }
};

export const sleep = (time: number) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

export interface GamePool {
  startTs: anchor.BN;
  rand: anchor.BN;
  totalDepositUsd: anchor.BN;
  claimed: anchor.BN;
  winner: PublicKey;
  entrants: PublicKey[];
  depositAmounts: anchor.BN[];
  depositAmountsUsd: anchor.BN[];
  depositMint: PublicKey[];
  solDepositAmount: anchor.BN;
  splADepositAmount: anchor.BN;
  splBDepositAmount: anchor.BN;
  splCDepositAmount: anchor.BN;
  splDDepositAmount: anchor.BN;
}

export interface CoinflipPool {
  startTs: anchor.BN;
  claimed: anchor.BN;
  winner: PublicKey;
  poolAmount: anchor.BN;
  creatorPlayer: PublicKey;
  creatorMint: PublicKey;
  creatorAmount: anchor.BN
  creatorSetNumber: anchor.BN;
  joinerPlayer: PublicKey;
  joinerMint: PublicKey;
  joinerAmount: anchor.BN
  joinerSetNumber: anchor.BN;
}

export interface ReferralData {
  players: PublicKey[];
  referrers: PublicKey[];
}
