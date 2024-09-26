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

  // function to toggle folder expansion
  const toggleFolderExpansion = (folderPath: string) => {
    if (expandedFolders.includes(folderPath)) {
      setExpandedFolders(expandedFolders.filter((path) => path !== folderPath));
    } else {
      setExpandedFolders([...expandedFolders, folderPath]);
    }
  };

  //   recurusive function to render files and folders
  const rednerFileTree = (file: FileNode) => {
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
              {file.children?.map((child) => rednerFileTree(child))}
            </ul>
          )}
        </li>
      );
    } else {
      // if it's a file, allow selecting the file
      return (
        <li
          key={file.path}
          onClick={() => onFileSelect(file)}
          className="cursor-pointer hover:bg-gray-200 p-1"
        >
          📝 {file.name}
        </li>
      );
    }
  };

  return (
    <div className="w-64 bg-gray-100 p-4 h-full">
      <h2 className="text-lg font-semibold">File Explorer</h2>
      <ul>{files.map((file: FileNode) => rednerFileTree(file))}</ul>
    </div>
  );
};

export default FileExplorer;
