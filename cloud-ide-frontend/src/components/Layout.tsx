import { FC, useState } from "react";
import FileExplorer, { FileNode } from "./FIleExplorer";
import StatusBar from "./StatusBar";
import Tabs from "./Tabs";
import IDETerminal from "./IDETerminal";

const tabs = [
  { name: "index.html", isActive: true },
  { name: "script.js", isActive: false },
];

const files: FileNode[] = [
  {
    name: "src",
    type: "folder",
    path: "/src",
    children: [
      { name: "App.tsx", type: "file", path: "/src/App.tsx" },
      { name: "index.tsx", type: "file", path: "/src/index.tsx" },
    ],
  },
  {
    name: "public",
    type: "folder",
    path: "/public",
    children: [
      { name: "index.html", type: "file", path: "/public/index.html" },
    ],
  },
  { name: "package.json", type: "file", path: "/package.json" },
];

const Layout: FC = () => {
  const [currentFile, setcurrentFile] = useState<string | null>(null);

  const handleFileSelect = (file: FileNode) => {
    setcurrentFile(file.path);
    console.log("Selected file : ", file);
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="flex flex-row flex-grow">
        <FileExplorer files={files} onFileSelect={handleFileSelect} />
        <div className="flex-grow">
          <Tabs tabs={tabs} />
          {/* <div className="p-4">editor content goes here</div> */}
        </div>
      </div>
      <IDETerminal />
      <StatusBar />
    </div>
  );
};

export default Layout;
