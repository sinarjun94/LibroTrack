import cron from "node-cron";
import { Borrow } from "../models/borrowModel.js";
import { User } from "../models/userModel.js";
import { sendEmail } from "../utils/sendEmail.js";
export const notifyUsers = () => {
  cron.schedule(" */30 * * * *", async () => {
    try {
      const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
      const borrowers = await Borrow.find({
        dueDate: { $lt: oneDayAgo },
        returnDate: null,
        notified: false,
      });
      for (const element of borrowers) {
        if (element.user && element.user.email) {
          console.log(element.user.email);

          await sendEmail({
            email: element.user.email,
            subject: "Book Return Reminder",
            message: `Hi ${element.user.name},

                       Just a quick reminder from LibroTrack: Your borrowed book is due today.
                       Please return it soon to avoid late fees.

                       Thanks for using LibroTrack!`,
          });
          element.notified = true;
          await element.save();
          console.log("Notification sent to user:", element.user.email);
        }
      }
    } catch (error) {
      console.error("Some Error Occurred while notifying users.", error);
    }
  });
};
