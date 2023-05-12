import express from "express";
import { createNote } from "../controllers/note.controller.js";
import { getAllNotes } from "../controllers/note.controller.js";
import { getOneNote } from "../controllers/note.controller.js";
import { updateNote } from "../controllers/note.controller.js";
import { deleteNote } from "../controllers/note.controller.js";
import { verifyToken } from "../controllers/note.controller.js";

const router = express.Router();

router.get("/", verifyToken, getAllNotes);

//get note by id
router.get("/:id", verifyToken, getOneNote);

//Crear Notes
router.post("/", verifyToken, createNote);

router.put("/:id", verifyToken, updateNote);

router.delete("/:id", verifyToken, deleteNote);

export default router;
