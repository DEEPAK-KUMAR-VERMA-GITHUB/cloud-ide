import Editor from "@monaco-editor/react";
import { FC } from "react";

enum ThemeOptions {
  VS_DARK = "vs-dark",
  LIGHT = "light",
}

type Props = {
  language: string;
  value: string;
  onChange: (value: string) => void;
  theme?: ThemeOptions;
};

const CodeEditor: FC<Props> = ({
  language,
  value,
  onChange,
  theme = ThemeOptions.VS_DARK,
}) => {
  return (
    <Editor
      height="90vh"
      language={language}
      value={value}
      onChange={(value) => onChange(value || "")}
      theme={theme}
    />
  );
};

export default CodeEditor;
