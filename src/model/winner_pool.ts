import mongoose from "mongoose";

const winnerPoolSchema = new mongoose.Schema(
    {
        user: String,
        referrer: String,
        bet_amount: Number,
        payout: Number,
        tx: String,
        pda: String
    },
    {
        timestamps: {
            createdAt: "created_at", // Use `created_at` to store the created date
            updatedAt: "updated_at", // and `updated_at` to store the last updated date
        },
    }
);

export const winnerModel = mongoose.model("winnerPool", winnerPoolSchema);
