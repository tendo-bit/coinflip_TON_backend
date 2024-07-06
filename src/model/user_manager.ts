import mongoose from "mongoose";

const msgSchema = new mongoose.Schema(
    {
        user_name: String,
        user_address: String,
        avatar: String
    },
    {
        timestamps: {
            createdAt: "created_at", // Use `created_at` to store the created date
            updatedAt: "updated_at", // and `updated_at` to store the last updated date
        },
    }
);

export const userModel = mongoose.model("user", msgSchema);
