import {
  addMessage,
  addOrUpdateUser,
  addWinner,
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
  getLastHistory,
  addHistory,
  getTopStreaks
} from "./db";
import { IDL, Jackpot } from "./jackpot";
import WalletSeed from "./backend-wallet.json";
import { Server } from "socket.io";

export const VAULT_SEED = "vault-authority";
export const GLOBAL_AUTHORITY_SEED = "global-authority";
export const REFERRAL_SEED = "referral";
export const SPL_ESCROW_SEED = "spl-escrow";

export const PROGRAM_ID = process.env.PROGRAM_ID;

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

export const getTopStreaksIx = async () => {
  try {
    init(); 
    const result = await getTopStreaks();
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

export const sleep = (time: number) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};