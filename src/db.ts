import database from "mongoose";
import { msgModel } from "./model/msg_manager";
import { historyModel } from "./model/history_manager"
import { gameModel } from "./model/game_pool";
import { claimReward, getCoinflipAccounts, getCoinflipPoolStateByKey, getResult } from "./script";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { Server } from "socket.io";
import {
  CLEAR_COOLDOWN,
  FIRST_COOLDOWN,
  getPendingCount,
  NEXT_COOLDOWN,
  REFUND_TIMEOUT,
  setProcessingStatus
} from "../config";
import { winnerModel } from "./model/winner_pool";
import { userModel } from "./model/user_manager";
import { coinflipModel } from "./model/coinflip_pool";

require("dotenv").config("../.env");

const password = encodeURIComponent("jbx1020!@#");
const DB_CONNECTION = `mongodb+srv://tendo20040203:${password}@k2pcluster.8yme5qw.mongodb.net/?retryWrites=true&w=majority&appName=K2PCluster`;

let endTimer: NodeJS.Timeout;
let newTimer: NodeJS.Timeout;
let refundTimer: NodeJS.Timeout | undefined = undefined;
let endInterval: NodeJS.Timeout | undefined = undefined;
let newInterval: NodeJS.Timeout | undefined = undefined;

export const init = () => {
  if (DB_CONNECTION === undefined) return;
  database.set("strictQuery", false);
  if (database.connection.readyState === database.ConnectionStates.connected)
    return;
  database
    .connect(DB_CONNECTION)
    .then((v) => {
      console.log(`mongodb database connected`);
    })
    .catch((e) => {
      console.error(`mongodb error ${e}`);
    });
};

export const getLastPda = async () => {
  try {
    const item = await gameModel.find().sort({ _id: -1 });
    if (new Date().getTime() >= item[0].end_timestamp) {
      return {
        pda: "",
        endTime: -1,
      };
    } else {
      return {
        pda: item[0].game_pool,
        endTime: item[0].end_timestamp,
      };
    }
  } catch (error) {
    console.log("error in getLastPda");
    return {
      pda: "",
      endTime: -1,
    };
  }
};

export const getLastMessage = async () => {
  try {
    const item = await msgModel.find().sort({ _id: -1 }).limit(50);
    return item;
  } catch (error) {
    console.log("error in getLastMessage!");
  }
};

export const getLastHistory = async () => {
  try {
    const item = await historyModel.find().sort({ _id: -1 }).limit(20);
    return item;
  } catch (error) {
    console.log("error in getLastMessage!");
  }
};

export const addMessage = async (user_name: string, msg: string) => {
  try {
    let ts = new Date();

    const newData = new msgModel({
      user_name: user_name,
      message: msg,
      timestamp: ts,
    });

    newData.save(function (err, book) {
      if (err) return console.error(err);
      console.log(newData, "Saved Successful");
    });
  } catch (error) {
    console.log("error in add message!");
  }
};

export const addHistory = async (user_address : string, isHead : boolean, isWin : boolean, flip_amount : number) => {
  try {
    let ts = new Date();
    let continuous_doubled_times : number;
    let continuous_doubled_amount : number;

    const item = await historyModel.find({ user_address }).sort({ _id: -1 });

    if (!isWin) {
      continuous_doubled_times = 0;
      continuous_doubled_amount = 0;
    } else if (item.length == 0) {
      continuous_doubled_times = 1;
      continuous_doubled_amount = flip_amount;
    } else {
      continuous_doubled_times = item[0].continuous_doubled_times + 1;
      continuous_doubled_amount = item[0].continuous_doubled_amount + flip_amount;
    }

    const newData = new historyModel({
      timestamp: ts,
      user_address,
      isHead,
      isWin,
      flip_amount,
      continuous_doubled_times,
      continuous_doubled_amount
    });

    newData.save(function (err, book) {
      if (err) return console.error(err);
      console.log(newData, "Saved Successful");
    });
  } catch (error) {
    console.log("error in add history!");
  }
};

export const getUser = async (user_address: string) => {
  try {
    const user = await userModel.findOne({user_address});
    return user;
  } catch (error) {
    console.log('error in getUser!')
  }
}

export const getUsers = async () => {
  try {
    const users = await userModel.find();
    return users;
  } catch (error) {
    console.log('error in getUsers!')
  }
}

export const getCoinflipPools = async () => {
  try {
    const pools = await coinflipModel.find({claimed: 0});
    return pools;
  } catch (error) {
    console.log('error in getCoinflipPools!')
  }
}

interface UpdateFields {
  user_name?: string;
  avatar?: string;
}

export const addOrUpdateUser = async (user_address: string, newUserData: UpdateFields) => {
  try {
    const user = await userModel.findOneAndUpdate(
      { user_address },
      {
        $set: newUserData,
      },
      { new: true, upsert: true }
    );
    return user;
  } catch (error) {
    console.error('Error in addOrUpdateUser!', error);
    throw error; // Re-throw the error for further handling
  }
};

export const getLastWinners = async () => {
  try {
    const item = await winnerModel.find().sort({ _id: -1 }).limit(50);
    return item;
  } catch (error) {
    console.log("error in getLastWinners!");
  }
};

export const getTimes = async () => {
  try {
    const item = await winnerModel.count();
    return item;
  } catch (error) {
    console.log("error in getTimes!", error);
  }
};

export const getTotalSum = async () => {
  try {
    return winnerModel.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$payout" },
        },
      },
    ]);
  } catch (error) {
    console.log("error in getTotalSum!");
  }
};

export const getTotalBetAmountAndPayout = async (user: string) => {
  try {
    const result = await winnerModel.aggregate([
      {
        $match: { user: user } // Match the given user
      },
      {
        $group: {
          _id: "$user",
          totalBetAmount: { $sum: "$bet_amount" },
          totalPayout: { $sum: "$payout" }
        }
      }
    ]);

    if (result.length > 0) {
      return result[0];
    } else {
      return { totalBetAmount: 0, totalPayout: 0 };
    }
  } catch (error) {
    console.error("Error getting total bet amount and payout:", error);
    throw error;
  }
};

export const addWinner = async (
  user_name: string,
  referrer: string,
  bet_amount: number,
  payout: number,
  tx: string,
  pda: string
) => {
  try {
    const newData = new winnerModel({
      user: user_name,
      referrer,
      bet_amount: bet_amount,
      payout: payout,
      tx: tx,
      pda: pda
    });

    newData.save(function (err, book) {
      if (err) return console.error(err);
      console.log(newData, "Saved Successful");
    });
  } catch (error) {
    console.log("error in add message!");
  }
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const createGame = async (
  startTimestamp: number,
  signer: string,
  mint: string,
  amount: string,
  referrer: string,
  gamePool: string,
  io: Server
) => {
  try {
    const newData = new gameModel({
      start_timestamp: startTimestamp,
      game_pool: gamePool,
      entrants: 1,
      players: [{ address: signer, referrer, mint, amount: parseFloat(amount) }],
    });

    // timeout for refund
    if (refundTimer) clearTimeout(refundTimer);
    refundTimer = setTimeout(async () => {
      console.log("---> refunding claim reward");
      await claimReward(new PublicKey(gamePool), io);

      clearTimeout(newTimer);
      newTimer = setTimeout(async () => {
        console.log("---> refunding new game ready");
        if (getPendingCount() === 0) {
          console.log("New GAME DATA:", new Date().toLocaleTimeString());
          io.emit("newGameReady", 0, []);
        }
      }, CLEAR_COOLDOWN);

      const filter = { game_pool: gamePool };
      const update = {
        end_timestamp: new Date().getTime(),
      };
      await gameModel.findOneAndUpdate(filter, update, {
        new: true,
      });
      console.log(" --> save refunding data on DB");
    }, REFUND_TIMEOUT);

    newData.save(function (err, book) {
      if (err) return console.error(err);
      console.log(newData, "Saved Successful");
    });
    const gameData = {
      start_ts: startTimestamp,
      game_pool: gamePool,
    };
    let lresult: any[] = [];
    while (!lresult || !lresult.length) {
      lresult = await getResult(new PublicKey(gamePool));
      await delay(1000);
    }
    /// Input manually if can't read from PDA
    if (!lresult || !lresult.length)
      lresult = [
        {
          player: signer,
          referrer,
          mint,
          amount: parseFloat(amount),
        },
      ];
    console.log(" --> startGameData:", lresult);

    io.emit("startGame", gamePool, 0, lresult, startTimestamp);
  } catch (error) {
    console.error(error);
    console.log("error in createGame!");
  }
};

export const enterGame = async (
  signer: string,
  mint: string,
  amount: string,
  referrer: string,
  gamePool: string,
  io: Server
) => {
  try {
    const ts = new Date();
    const filter = { game_pool: gamePool };
    const fresult = await getResult(new PublicKey(gamePool));
    console.log(" --> enterGameData:", fresult);
    const item = await gameModel.find(filter);

    if (refundTimer) clearTimeout(refundTimer);

    let last_ts = 0;
    console.log("Get Last Timestamp ++++++");
    if (item[0].entrants == 1) {
      last_ts = ts.getTime() + FIRST_COOLDOWN;
    } else {
      last_ts = item[0].end_timestamp + NEXT_COOLDOWN;
    }

    if (fresult.length === 1 && signer === fresult[0].player) {
      last_ts = 0;
    }

    let players = item[0].players ?? [];
    let updated = false;
    for (let idx in players) {
      if (players[idx].address === signer) {
        players[idx].amount += parseFloat(amount);
        updated = true;
        break;
      }
    }

    if (!updated) {
      players.push({
        address: signer,
        referrer,
        mint,
        amount: parseFloat(amount),
      });
    }

    const update = {
      end_timestamp: last_ts,
      entrants: 2,
      players,
    };

    if (!(fresult.length === 1 && signer === fresult[0].player)) {
      await gameModel.findOneAndUpdate(filter, update, {
        new: true,
      });
      console.log("Write data on DB");
    }

    if (last_ts != 0) {
      clearTimeout(endTimer);
      clearTimeout(newTimer);
      if (endInterval) {
        clearInterval(endInterval);
        endInterval = undefined;
      }
      if (newInterval) {
        clearInterval(newInterval);
        newInterval = undefined;
      }

      let timer = setTimeout(async () => {
        if (getPendingCount() === 0) {
          console.log("Claim Reward");
          setProcessingStatus(true);
          await claimReward(new PublicKey(gamePool), io);
          setProcessingStatus(false);
        } else {
          setProcessingStatus(true);
          endInterval = setInterval(async () => {
            console.log("---> pending claim reward");
            if (getPendingCount() === 0) {
              console.log("Claim Reward");
              clearInterval(endInterval);
              endInterval = undefined;
              console.log("--> claim Tx");
              await claimReward(new PublicKey(gamePool), io);
              setProcessingStatus(false);

              clearTimeout(newTimer);
              newTimer = setTimeout(async () => {
                console.log("---> pending sent new game ready");
                if (getPendingCount() === 0) {
                  console.log(
                    "New GAME DATA:",
                    new Date().toLocaleTimeString()
                  );
                  io.emit("newGameReady", 0, []);
                }
              }, CLEAR_COOLDOWN);
            }
          }, 1000);
        }
      }, last_ts - new Date().getTime());

      newTimer = setTimeout(async () => {
        if (getPendingCount() === 0) {
          console.log("New GAME DATA", new Date().toLocaleTimeString());
          io.emit("newGameReady", 0, []);
        }
      }, last_ts - new Date().getTime() + CLEAR_COOLDOWN);

      endTimer = timer;
    }
    const lresult = await getResult(new PublicKey(gamePool));
    // const lresult = update.players.map((player) => {
    //   return {
    //     player: player.address,
    //     referrer,
    //     mint,
    //     amount: player.amount,
    //   };
    // });
    console.log(" --> endTimeUpdated:", lresult);

    io.emit("endTimeUpdated", gamePool, last_ts, lresult);
  } catch (error) {
    console.error(error);
    console.log("error in enterGame!");
  }
};

export const createCoinflip = async (
  signer: string,
  mint: string,
  number: string,
  amount: string,
  referrer: string,
  pda: string,
  io: Server
) => {
  try {
    const newData = new coinflipModel({
      coinflip_pool: pda,
      claimed: 0,
      creator_player: signer,
      creator_mint: mint,
      creator_number: number,
      creator_amount: amount,
      creator_referrer: referrer
    });


    newData.save(function (err, book) {
      if (err) return console.error(err);
      console.log(newData, "Saved Successful");
    });

    let lresult: any[] = [];
    while (!lresult || !lresult.length) {
      lresult = await getCoinflipAccounts();
      await delay(1000);
    }

    io.emit("coinflip", lresult);
  } catch (error) {
    console.error(error);
    console.log("error in createCoinflip!");
  }
};

export const joinCoinflip = async (
  signer: string,
  mint: string,
  number: string,
  amount: string,
  referrer: string,
  pda: string,
  io: Server
) => {
  try {
    const filter = { coinflip_pool: pda };
    const newData = new coinflipModel({
      joiner_player: signer,
      joiner_mint: mint,
      joiner_number: number,
      joiner_amount: amount,
      joiner_referrer: referrer
    });
    await gameModel.findOneAndUpdate(filter, newData, {
      new: true,
    });
    
    let pool = await getCoinflipPoolStateByKey(new PublicKey(pda));
    while (pool.winner.toBase58() === '11111111111111111111111111111111') {
      pool = await getCoinflipPoolStateByKey(new PublicKey(pda));
      await delay(1000);
    }

    let lresult: any[] = [];
    while (!lresult || !lresult.length) {
      lresult = await getCoinflipAccounts();
      await delay(1000);
    }

    io.emit("joinedCoinflip", lresult, pool.winner.toBase58());
  } catch (error) {
    console.error(error);
    console.log("error in joinCoinflip!");
  }
};

export const claimCoinflip = async (
  signer: string,
  referrer: string,
  pda: string,
  txId: string,
  io: Server
) => {
  try {
    const pool = await getCoinflipPoolStateByKey(new PublicKey(pda));
    const newData = new winnerModel({
      user: signer,
      referrer,
      bet_amount: pool.poolAmount.toNumber() / LAMPORTS_PER_SOL / 2,
      payout: pool.poolAmount.toNumber() / LAMPORTS_PER_SOL,
      tx: txId,
      pda: pda
    });

    newData.save(function (err, book) {
      if (err) return console.error(err);
      console.log(newData, "Saved Successful");
    });

    let lresult: any[] = [];
    while (!lresult || !lresult.length) {
      lresult = await getCoinflipAccounts();
      await delay(1000);
    }

    io.emit("coinflip", lresult);
  } catch (error) {
    console.error(error);
    console.log("error in claimCoinflip!");
  }
};