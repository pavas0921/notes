import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const verifyToken = (req, res, next) => {
  const token = req.header("Authorization").split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    const { exp: expDate } = decoded;

    if (Date.now() / 1000 > expDate) {
      res.status(401).send;
    } else {
      next();
    }
  } catch (error) {
    res.status(401).send(error);
  }
};

export const getAllNotes = async (req, res) => {
  try {
    const note = await prisma.note.findMany();
    if (note.length >= 1) {
      res.status(200).json(note);
    } else {
      res.status(204).json({ error: true, messageError: "No content" });
    }
  } catch (error) {
    res.status(500).json({ error: true });
  }
};

export const getOneNote = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  try {
    const note = await prisma.note.findUnique({
      where: {
        note_id: +id,
      },
    });
    if (note && Object.keys(note).length > 0) {
      res.status(200).json(note);
    } else {
      res.status(204).json({ error: true, messageError: "No content" });
    }
  } catch (error) {
    res.status(500).send({ error });
  }
};

export const createNote = async (req, res) => {
  try {
    const newnote = await prisma.note.create({
      data: req.body,
    });
    res.status(201).json(newnote);
  } catch (error) {
    res.status(500).json({ error: true });
  }
};

export const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await prisma.note.update({
      where: {
        note_id: +id,
      },
      data: req.body,
    });
    res.json(note);
  } catch (error) {
    res.status(500).json({ error: true });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await prisma.note.delete({
      where: {
        note_id: +id,
      },
    });
    res.json(deleted);
  } catch (error) {
    res.status(500).json({ error: true });
  }
};
