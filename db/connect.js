import mongoose from "mongoose";

const connectDB = (url) => {
  console.log(url);
  return mongoose.connect(url);
};

export default connectDB;
