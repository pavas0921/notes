import express from "express";
import { createUser } from "../controllers/user.controller.js";
import { getAllUsers } from "../controllers/user.controller.js";
import { getOneUser } from "../controllers/user.controller.js";
import { updateUser } from "../controllers/user.controller.js";
import { deleteUser } from "../controllers/user.controller.js";
import {
  login,
  generateToken,
  verifyToken,
} from "../controllers/user.controller.js";

const router = express.Router();

//login
router.post("/login", login, generateToken);

router.get("/", verifyToken, getAllUsers);

//get post by id
router.get("/:id", verifyToken, getOneUser);

//Crear Postes
router.post("/", verifyToken, createUser);

router.put("/:id", verifyToken, updateUser);

router.delete("/:id", verifyToken, deleteUser);

export default router;
