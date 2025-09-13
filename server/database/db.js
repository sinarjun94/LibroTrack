import mongoose from "mongoose";

export const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "LibraryManagementSystem",
    })
    .then(() => {
      console.log("Database connected successfully");
    })
    .catch((error) => {
      console.error("Database connection failed:", error);
    });
};
