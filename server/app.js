import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./database/db.js";
import { errorMiddleware } from "./middlewares/errorMiddlewares.js";
import { notifyUsers } from "./services/notifyUsers.js";
import { removeUnverifiedAccounts } from "./services/removeUnverifiedAccount.js";
import authRouter from "./routes/authRouter.js";
import bookRouter from "./routes/bookRouter.js";
import borrowRouter from "./routes/borrowRouter.js";
import userRouter from "./routes/userRouter.js";
import fileUpload from "express-fileupload";



export const app = express();
// Load environment variables from config.env file
config({ path: "./config/config.env" });

// Middleware to parse JSON and URL-encoded bodies
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Allow credentials to be sent

}))// Enable CORS for the frontend URL
app.use(cookieParser()); // Parse cookies
app.use(express.json());// Parse JSON bodies
app.use(express.urlencoded({ extended: true }));   // Parse URL-encoded bodies
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
})); // Enable file uploads

app.use("/api/v1/auth", authRouter); // Use auth routes
app.use("/api/v1/book", bookRouter); // Use book routes
app.use("/api/v1/borrow", borrowRouter); // Use borrow routes `
app.use("/api/v1/user", userRouter); // Use user routes
notifyUsers(); // Start the user notification service
removeUnverifiedAccounts(); // Remove unverified accounts every 30 Minutes

connectDB();

app.use(errorMiddleware); // Use error handling middleware