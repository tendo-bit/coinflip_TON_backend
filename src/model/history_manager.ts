import mongoose from "mongoose";

const msgSchema = new mongoose.Schema(
    {
        timestamp: Number,
        user_address: String,
        isHead: Boolean,
        isWin: Boolean,
        flip_amount: Number,
        continuous_doubled_times: Number,
        continuous_doubled_amount: Number
    },
    {
        timestamps: {
            createdAt: "created_at", // Use `created_at` to store the created date
            updatedAt: "updated_at", // and `updated_at` to store the last updated date
        },
    }
);

export const historyModel = mongoose.model("history", msgSchema);
