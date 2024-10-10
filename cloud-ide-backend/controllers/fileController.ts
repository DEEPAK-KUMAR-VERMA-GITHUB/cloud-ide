import { NextFunction, Request, Response } from "express";
import path from "path";
import fs from "fs";

export type FileNode = {
  fileName: string;
  fileType: "file" | "folder";
  filePath: string;
  children?: FileNode[];
  parentPath: string;
};

export const createFileOrFolder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { fileName, fileType, parentPath }: FileNode = req.body;
  const fullPath = path.join(__dirname, parentPath, fileName);

  try {
    if (fileType === "file") {
      await createFile(fullPath);
    } else if (fileType === "folder") {
      await createFolder(fullPath);
    }

    res.status(201).json({
      success: true,
      message: `${fileType} Created Successfully...`,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error creating file or folder" });
  }

  res.status(201).json({
    success: true,
    message: `${fileType} Created Successfully...`,
  });
};

const createFile = async (fullPath: string) => {
  try {
    await fs.promises.access(fullPath, fs.constants.F_OK);
    throw new Error(`File already exists : ${fullPath}`);
  } catch (error) {
    if (error.code === "ENOENT") {
      await fs.promises.writeFile(fullPath, "");
    } else {
      throw error;
    }
  }
};

const createFolder = async (fullPath: string) => {
  try {
    await fs.promises.access(fullPath, fs.constants.F_OK);
    throw new Error(`Folder already exists: ${fullPath}`);
  } catch (error) {
    if (error.code === "ENOENT") {
      await fs.promises.mkdir(fullPath);
    } else {
      throw error;
    }
  }
};

export const deleteFileOrFolder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { pathToDelete } = req.body;

  const fullPath = path.join(__dirname, pathToDelete);

  try {
    await fs.promises.access(fullPath, fs.constants.F_OK);
    await fs.promises.rm(fullPath, { recursive: true, force: true });

    res.status(200).json({
      success: true,
      message: `File/Folder deleted successfully...`,
    });
  } catch (error) {
    if (error.code === "ENOENT") {
      res.status(404).json({
        success: false,
        message: `File/Folder not found: ${fullPath}`,
      });
    } else {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Error deleting file or folder",
      });
    }
  }
};
