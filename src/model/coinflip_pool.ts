import mongoose from "mongoose";

const coinflipPoolSchema = new mongoose.Schema(
  {
    coinflip_pool: String,
    claimed: Number,
    creator_player: String,
    creator_mint: String,
    creator_number: Number,
    creator_amount: Number,
    creator_referrer: String,
    joiner_player: String,
    joiner_mint: String,
    joiner_number: String,
    joiner_amount: Number,
    joiner_referrer: String
  },
  {
    timestamps: {
      createdAt: "created_at", // Use `created_at` to store the created date
      updatedAt: "updated_at", // and `updated_at` to store the last updated date
    },
  }
);

export const coinflipModel = mongoose.model("coinflipPool", coinflipPoolSchema);
