import axios from "axios";
import { FC, useState } from "react";

export type FileNode = {
  name: string;
  type: "file" | "folder";
  path: string;
  children?: FileNode[];
};

type Props = {
  files: FileNode[];
  onFileSelect: (file: FileNode) => void;
};

const FileExplorer: FC<Props> = ({ files, onFileSelect }) => {
  // A state to track which folders are expanded
  const [expandedFolders, setExpandedFolders] = useState<string[]>([]);
  const [newFileName, setNewFileName] = useState<string>("");
  const [newFolderName, setNewFolderName] = useState<string>("");

  // function to toggle folder expansion
  const toggleFolderExpansion = (folderPath: string) => {
    if (expandedFolders.includes(folderPath)) {
      setExpandedFolders(expandedFolders.filter((path) => path !== folderPath));
    } else {
      setExpandedFolders([...expandedFolders, folderPath]);
    }
  };

  // function to create new file
  const createNewFile = async (parentPath: string) => {
    try {
      await axios.post(
        "/api/v1/create",
        {
          name: newFileName,
          type: "file",
          parentPath,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setNewFileName("");
    } catch (error) {
      console.log(error);
    }
  };

  // function to create new folder
  const createNewFolder = async (parentPath: string) => {
    try {
      await axios.post(
        "/api/v1/create",
        {
          name: newFolderName,
          type: "folder",
          parentPath,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setNewFolderName("");
    } catch (error) {
      console.log(error);
    }
  };
  // function to delete file or folder
  const deleteFileOrFolder = async (filePath: string) => {
    try {
      const response = await axios.delete("/api/v1/delete", {
        data: { pathToDelete: filePath },
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  //   recurusive function to render files and folders
  const renderFileTree = (file: FileNode) => {
    if (file.type === "folder") {
      const isExpanded = expandedFolders.includes(file.path);

      return (
        <li key={file.path}>
          {/* folder name with toggle for expanding/collapsing */}
          <div
            onClick={() => toggleFolderExpansion(file.path)}
            className="cursor-pointer"
          >
            {isExpanded ? "📂" : "📁"} {file.name}
          </div>

          {/* redner folder contents if expanded */}
          {isExpanded && (
            <ul className="ml-4">
              {file.children?.map((child) => renderFileTree(child))}
              {/* Form to add new file or folder */}
              <div>
                <input
                  value={newFileName}
                  onChange={(e) => setNewFileName(e.target.value)}
                  placeholder="New File Name"
                />
                <button onClick={() => createNewFile(file.path)}>
                  Create File
                </button>
              </div>
              <div>
                <input
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  placeholder="New Folder Name"
                />
                <button onClick={() => createNewFolder(file.path)}>
                  Create Folder
                </button>
              </div>
            </ul>
          )}
        </li>
      );
    } else {
      // if it's a file, allow selecting the file
      return (
        <li key={file.path}>
          <span onClick={() => onFileSelect(file)}>📝 {file.name}</span>
          <button onClick={() => deleteFileOrFolder(file.path)}>Delete</button>
        </li>
      );
    }
  };

  return (
    <div className="w-64 bg-gray-100 p-4 h-full">
      <h2 className="text-lg font-semibold">File Explorer</h2>
      <ul>{files.map((file: FileNode) => renderFileTree(file))}</ul>
    </div>
  );
};

export default FileExplorer;