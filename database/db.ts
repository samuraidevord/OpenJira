import mongoose from "mongoose";

/**
 * 0 = disconnected
 * 1 = connected
 * 2 = connecting
 * 3 = disconnecting
 */

export const connect = async () => {
  await mongoose.connect(process.env.MONGO_URL!);
};

export const disconnect = async () => {
  await mongoose.disconnect();
};
