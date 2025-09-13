import cron from "node-cron";
import { User } from "../models/userModel.js";

export const removeUnverifiedAccounts = () => {
  cron.schedule("*/30 * * * *", async () => {
    try {
      const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000); // correct 30 min
      const result = await User.deleteMany({
        accountVerified: false, // ensure field name consistency with your User schema
        createdAt: { $lt: thirtyMinutesAgo },
      });

      if (result.deletedCount > 0) {
        console.log(`Removed ${result.deletedCount} unverified accounts.`);
      }
    } catch (error) {
      console.error("Error removing unverified accounts:", error);
    }
  });
};
