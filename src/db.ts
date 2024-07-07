import database from "mongoose";
import { msgModel } from "./model/msg_manager";
import { historyModel } from "./model/history_manager"
import { gameModel } from "./model/game_pool";
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
    const item = await historyModel.find().sort({ _id: -1 }).limit(10);
    return item;
  } catch (error) {
    console.log("error in getLastMessage!");
  }
};

export const getTopStreaks = async () => {
  try {
    const item = await historyModel.find().sort({ continuous_doubled_amount: -1 });

    const uniqueRecordsMap = [];
    const uniqueRecords = [];

    for (const record of item) {
      if (!uniqueRecordsMap.includes(record.user_address)) {
        uniqueRecordsMap.push(record.user_address);
        uniqueRecords.push(record);
      }

      // Break the loop if we have collected 20 unique records
      if (uniqueRecords.length === 10) {
        break;
      }
    }

    return uniqueRecords;
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