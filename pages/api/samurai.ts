// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../database";
import { Entry, IEntry } from "../../models";
import mongoose from "mongoose";
type Data = IEntry[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  return getEntries(res);
}

const getEntries = async (res: NextApiResponse<Data>) => {
  await mongoose.connect(
    "mongodb+srv://admin:RrnpBdXszdmKrvnz@open-jira-bbdd.uoxf74n.mongodb.net/entries-bbdd?retryWrites=true&w=majority"
  );
  const entries = await Entry.find().sort({ createdAt: "ascending" });
  await mongoose.disconnect();
  return res.status(200).json(entries);
};
