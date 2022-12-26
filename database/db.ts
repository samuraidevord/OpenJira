import mongoose from "mongoose";

/**
 * 0 = disconnected
 * 1 = connected
 * 2 = connecting
 * 3 = disconnecting
 */

export const connect = async () => {
  await mongoose.connect(
    "mongodb+srv://admin:RrnpBdXszdmKrvnz@open-jira-bbdd.uoxf74n.mongodb.net/entries-bbdd?retryWrites=true&w=majority"
  );
};

export const disconnect = async () => {
  await mongoose.disconnect();
};
