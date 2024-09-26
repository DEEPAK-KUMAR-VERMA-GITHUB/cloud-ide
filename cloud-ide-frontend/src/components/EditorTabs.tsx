import { FC } from "react";
import CodeEditor from "./CodeEditor";

type OpenFile = {
  fileName: string;
  content: string;
};

type Props = {
  openFiles: OpenFile[];
  currentFile: string;
  onContentChange: (fileName: string, conent: string) => void;
};

const EditorTabs: FC<Props> = ({ openFiles, currentFile, onContentChange }) => {
  return (
    <div>
      {openFiles.map(
        (file) =>
          file.fileName === currentFile && (
            <CodeEditor
              key={file.fileName}
              language="javascript"
              value={file.content}
              onChange={(newContent) =>
                onContentChange(file.fileName, newContent)
              }
            />
          )
      )}
    </div>
  );
};

export default EditorTabs;
