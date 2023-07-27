import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import "express-async-errors";
import connectDB from "./db/connect.js";
import authRoute from "./routes/authRoutes.js";
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";

const app = express();
dotenv.config();
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}
app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/api/v1/auth", authRoute);

//middleware
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 8000;

const start = async () => {
  try {
    await connectDB(process.env.DB_URL);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
