import mongoose from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { Entry, IEntry } from "../../../models";

type Data =
  | {
      message: string;
    }
  | IEntry;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "PUT":
      return updateEntry(req, res);
    case "GET":
      return getEntryById(req, res);
    case "DELETE":
      return deleteEntryById(req, res);
    default:
      return res.status(400).json({ message: "Método no válido" });
  }
}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect();

  const { id } = req.query;

  const entryToUpdate = await Entry.findById(id);
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "El id no es válido: " + id });
  }

  if (!entryToUpdate) {
    return res
      .status(400)
      .json({ message: "No hay entrada con ese ID: " + id });
  }
  try {
    const {
      description = entryToUpdate.description,
      status = entryToUpdate.status,
    } = req.body;
    const updatedEntry = await Entry.findByIdAndUpdate(
      id,
      { description, status },
      { runValidators: true, new: true }
    );
    await db.disconnect();
    res.status(200).json(updatedEntry!);
  } catch (error: any) {
    console.log(error);
    await db.disconnect();
    return res
      .status(400)
      .json({ message: error.errors.status.message.message });
  }
};

const getEntryById = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  await db.connect();
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "El id no es válido: " + id });
  }
  const entryById = await Entry.findById(id);
  await db.disconnect();

  if (!entryById)
    return res.status(400).json({ message: "No hay entrada con ese ID" + id });
  return res.status(200).json(entryById);
};

const deleteEntryById = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  await db.connect();
  await db.connect();
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "El id no es válido: " + id });
  }
  const entryDeleteById = await Entry.findByIdAndDelete(id);
  if (!entryDeleteById)
    return res.status(400).json({ message: "No hay entrada con ese ID" + id });
  return res.status(200).json(entryDeleteById);
};
