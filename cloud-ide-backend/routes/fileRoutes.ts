import express, { Router } from "express";
import {
  createFileOrFolder,
  deleteFileOrFolder,
} from "../controllers/fileController";

export const fileRouter: Router = express.Router();

fileRouter.post("/create", createFileOrFolder);
fileRouter.delete("/delete", deleteFileOrFolder);
