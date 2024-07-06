export type Jackpot = {
  "version": "0.1.0",
  "name": "valhalla",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mintA",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mintB",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mintC",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mintD",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "globalData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "solVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "splEscrowA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "referralData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "createEscrow",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mintA",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mintB",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mintC",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mintD",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "solVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "splEscrowB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "splEscrowC",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "splEscrowD",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "playGame",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "gamePool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "solVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "splEscrow",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "referralData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "priceFeed",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "ts",
          "type": "u64"
        },
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "referrer",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "enterGame",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "gamePool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "solVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "splEscrow",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "referralData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "priceFeed",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "referrer",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "claimReward",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "gamePool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintA",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mintB",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mintC",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mintD",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "winner",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "winnerSplA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "winnerSplB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "winnerSplC",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "winnerSplD",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "referrer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "referrerSplA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "referrerSplB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "referrerSplC",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "referrerSplD",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "solVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "splEscrowA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "splEscrowB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "splEscrowC",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "splEscrowD",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "referralData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "vaultBump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "createCoinflip",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "coinflipPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "solVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "splEscrow",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "referralData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "priceFeed",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "ts",
          "type": "u64"
        },
        {
          "name": "setNumber",
          "type": "u64"
        },
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "referrer",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "joinCoinflip",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "coinflipPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "solVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "splEscrow",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "referralData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "priceFeed",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "setNumber",
          "type": "u64"
        },
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "referrer",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "claimCoinflip",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "coinflipPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintA",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mintB",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "winnerSplA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "winnerSplB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "referrer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "referrerSplA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "referrerSplB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "solVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "splEscrowA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "splEscrowB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "referralData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "vaultBump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "withdrawFee",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "solVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "splEscrowA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "splEscrowB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "splEscrowC",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "splEscrowD",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "feeWalletSplA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "feeWalletSplB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "feeWalletSplC",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "feeWalletSplD",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "feeWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "vaultBump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "setFee",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalData",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "jackpotFee",
          "type": "u64"
        },
        {
          "name": "coinflipFee",
          "type": "u64"
        },
        {
          "name": "feeWallet",
          "type": "publicKey"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "GlobalData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "superAdmin",
            "type": "publicKey"
          },
          {
            "name": "feeWallet",
            "type": "publicKey"
          },
          {
            "name": "jackpotFee",
            "type": "u64"
          },
          {
            "name": "coinflipFee",
            "type": "u64"
          },
          {
            "name": "availableSplTokens",
            "type": {
              "vec": "publicKey"
            }
          },
          {
            "name": "solFee",
            "type": "u64"
          },
          {
            "name": "splAFee",
            "type": "u64"
          },
          {
            "name": "splBFee",
            "type": "u64"
          },
          {
            "name": "splCFee",
            "type": "u64"
          },
          {
            "name": "splDFee",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "ReferralData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "players",
            "type": {
              "vec": "publicKey"
            }
          },
          {
            "name": "referrers",
            "type": {
              "vec": "publicKey"
            }
          }
        ]
      }
    },
    {
      "name": "GamePool",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "startTs",
            "type": "u64"
          },
          {
            "name": "rand",
            "type": "u64"
          },
          {
            "name": "totalDepositUsd",
            "type": "u64"
          },
          {
            "name": "claimed",
            "type": "u64"
          },
          {
            "name": "winner",
            "type": "publicKey"
          },
          {
            "name": "entrants",
            "type": {
              "vec": "publicKey"
            }
          },
          {
            "name": "depositAmounts",
            "type": {
              "vec": "u64"
            }
          },
          {
            "name": "depositAmountsUsd",
            "type": {
              "vec": "u64"
            }
          },
          {
            "name": "depositMint",
            "type": {
              "vec": "publicKey"
            }
          },
          {
            "name": "solDepositAmount",
            "type": "u64"
          },
          {
            "name": "splADepositAmount",
            "type": "u64"
          },
          {
            "name": "splBDepositAmount",
            "type": "u64"
          },
          {
            "name": "splCDepositAmount",
            "type": "u64"
          },
          {
            "name": "splDDepositAmount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "CoinflipPool",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "startTs",
            "type": "u64"
          },
          {
            "name": "claimed",
            "type": "u8"
          },
          {
            "name": "winner",
            "type": "publicKey"
          },
          {
            "name": "poolAmount",
            "type": "u64"
          },
          {
            "name": "creatorPlayer",
            "type": "publicKey"
          },
          {
            "name": "creatorMint",
            "type": "publicKey"
          },
          {
            "name": "creatorAmount",
            "type": "u64"
          },
          {
            "name": "creatorSetNumber",
            "type": "u64"
          },
          {
            "name": "joinerPlayer",
            "type": "publicKey"
          },
          {
            "name": "joinerMint",
            "type": "publicKey"
          },
          {
            "name": "joinerAmount",
            "type": "u64"
          },
          {
            "name": "joinerSetNumber",
            "type": "u64"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidAdmin",
      "msg": "Invalid Admin Address"
    },
    {
      "code": 6001,
      "name": "AlreadyClaimed",
      "msg": "Already Claimed Game"
    },
    {
      "code": 6002,
      "name": "AlreadyDrawn",
      "msg": "Already Drawn Game"
    },
    {
      "code": 6003,
      "name": "NotWinner",
      "msg": "The Account is Not Winner"
    },
    {
      "code": 6004,
      "name": "NotReferrer",
      "msg": "The Account is Not Referrer"
    },
    {
      "code": 6005,
      "name": "TokenNotAllowed",
      "msg": "Token not allowed"
    },
    {
      "code": 6006,
      "name": "OwnerMismatch",
      "msg": "Owner mismatch"
    },
    {
      "code": 6007,
      "name": "InvalidAmount",
      "msg": "Invalid Bet Amount"
    },
    {
      "code": 6008,
      "name": "InvalidJoiner",
      "msg": "Invalid Joiner"
    },
    {
      "code": 6009,
      "name": "InvalidNumber",
      "msg": "Invalid Bet Number"
    }
  ]
};

export const IDL: Jackpot = {
  "version": "0.1.0",
  "name": "valhalla",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mintA",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mintB",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mintC",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mintD",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "globalData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "solVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "splEscrowA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "referralData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "createEscrow",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mintA",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mintB",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mintC",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mintD",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "solVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "splEscrowB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "splEscrowC",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "splEscrowD",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "playGame",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "gamePool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "solVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "splEscrow",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "referralData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "priceFeed",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "ts",
          "type": "u64"
        },
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "referrer",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "enterGame",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "gamePool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "solVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "splEscrow",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "referralData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "priceFeed",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "referrer",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "claimReward",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "gamePool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintA",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mintB",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mintC",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mintD",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "winner",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "winnerSplA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "winnerSplB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "winnerSplC",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "winnerSplD",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "referrer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "referrerSplA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "referrerSplB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "referrerSplC",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "referrerSplD",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "solVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "splEscrowA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "splEscrowB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "splEscrowC",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "splEscrowD",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "referralData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "vaultBump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "createCoinflip",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "coinflipPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "solVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "splEscrow",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "referralData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "priceFeed",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "ts",
          "type": "u64"
        },
        {
          "name": "setNumber",
          "type": "u64"
        },
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "referrer",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "joinCoinflip",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "coinflipPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "solVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "splEscrow",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "referralData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "priceFeed",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "setNumber",
          "type": "u64"
        },
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "referrer",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "claimCoinflip",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "coinflipPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintA",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mintB",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "winnerSplA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "winnerSplB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "referrer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "referrerSplA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "referrerSplB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "solVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "splEscrowA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "splEscrowB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "referralData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "vaultBump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "withdrawFee",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalData",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "solVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "splEscrowA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "splEscrowB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "splEscrowC",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "splEscrowD",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "feeWalletSplA",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "feeWalletSplB",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "feeWalletSplC",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "feeWalletSplD",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "feeWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "vaultBump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "setFee",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalData",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "jackpotFee",
          "type": "u64"
        },
        {
          "name": "coinflipFee",
          "type": "u64"
        },
        {
          "name": "feeWallet",
          "type": "publicKey"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "GlobalData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "superAdmin",
            "type": "publicKey"
          },
          {
            "name": "feeWallet",
            "type": "publicKey"
          },
          {
            "name": "jackpotFee",
            "type": "u64"
          },
          {
            "name": "coinflipFee",
            "type": "u64"
          },
          {
            "name": "availableSplTokens",
            "type": {
              "vec": "publicKey"
            }
          },
          {
            "name": "solFee",
            "type": "u64"
          },
          {
            "name": "splAFee",
            "type": "u64"
          },
          {
            "name": "splBFee",
            "type": "u64"
          },
          {
            "name": "splCFee",
            "type": "u64"
          },
          {
            "name": "splDFee",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "ReferralData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "players",
            "type": {
              "vec": "publicKey"
            }
          },
          {
            "name": "referrers",
            "type": {
              "vec": "publicKey"
            }
          }
        ]
      }
    },
    {
      "name": "GamePool",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "startTs",
            "type": "u64"
          },
          {
            "name": "rand",
            "type": "u64"
          },
          {
            "name": "totalDepositUsd",
            "type": "u64"
          },
          {
            "name": "claimed",
            "type": "u64"
          },
          {
            "name": "winner",
            "type": "publicKey"
          },
          {
            "name": "entrants",
            "type": {
              "vec": "publicKey"
            }
          },
          {
            "name": "depositAmounts",
            "type": {
              "vec": "u64"
            }
          },
          {
            "name": "depositAmountsUsd",
            "type": {
              "vec": "u64"
            }
          },
          {
            "name": "depositMint",
            "type": {
              "vec": "publicKey"
            }
          },
          {
            "name": "solDepositAmount",
            "type": "u64"
          },
          {
            "name": "splADepositAmount",
            "type": "u64"
          },
          {
            "name": "splBDepositAmount",
            "type": "u64"
          },
          {
            "name": "splCDepositAmount",
            "type": "u64"
          },
          {
            "name": "splDDepositAmount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "CoinflipPool",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "startTs",
            "type": "u64"
          },
          {
            "name": "claimed",
            "type": "u8"
          },
          {
            "name": "winner",
            "type": "publicKey"
          },
          {
            "name": "poolAmount",
            "type": "u64"
          },
          {
            "name": "creatorPlayer",
            "type": "publicKey"
          },
          {
            "name": "creatorMint",
            "type": "publicKey"
          },
          {
            "name": "creatorAmount",
            "type": "u64"
          },
          {
            "name": "creatorSetNumber",
            "type": "u64"
          },
          {
            "name": "joinerPlayer",
            "type": "publicKey"
          },
          {
            "name": "joinerMint",
            "type": "publicKey"
          },
          {
            "name": "joinerAmount",
            "type": "u64"
          },
          {
            "name": "joinerSetNumber",
            "type": "u64"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidAdmin",
      "msg": "Invalid Admin Address"
    },
    {
      "code": 6001,
      "name": "AlreadyClaimed",
      "msg": "Already Claimed Game"
    },
    {
      "code": 6002,
      "name": "AlreadyDrawn",
      "msg": "Already Drawn Game"
    },
    {
      "code": 6003,
      "name": "NotWinner",
      "msg": "The Account is Not Winner"
    },
    {
      "code": 6004,
      "name": "NotReferrer",
      "msg": "The Account is Not Referrer"
    },
    {
      "code": 6005,
      "name": "TokenNotAllowed",
      "msg": "Token not allowed"
    },
    {
      "code": 6006,
      "name": "OwnerMismatch",
      "msg": "Owner mismatch"
    },
    {
      "code": 6007,
      "name": "InvalidAmount",
      "msg": "Invalid Bet Amount"
    },
    {
      "code": 6008,
      "name": "InvalidJoiner",
      "msg": "Invalid Joiner"
    },
    {
      "code": 6009,
      "name": "InvalidNumber",
      "msg": "Invalid Bet Number"
    }
  ]
};
