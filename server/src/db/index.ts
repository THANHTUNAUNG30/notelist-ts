import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    const DB_CONNECTION_STRING = 
      process.env.NODE_ENV === "development"
        ? process.env.MONGODB_LOCAL_URI!
        : process.env.MONGODB_URI!;

    const dbResponse = await mongoose.connect(DB_CONNECTION_STRING);
    console.log("DB connected successfully:", dbResponse.connection.host);
  } catch (error) {
    console.error("DB connection error:", error);
    process.exit(1);
  }
};
