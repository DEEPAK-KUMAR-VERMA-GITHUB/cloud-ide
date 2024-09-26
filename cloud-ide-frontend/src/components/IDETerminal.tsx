import { FC, useEffect } from "react";
import { Terminal } from "@xterm/xterm";
// import { FitAddon } from "@xterm/addon-fit";
import { io } from "socket.io-client";

const socket = io("http://localhost:8000");

const IDETerminal: FC = () => {
  useEffect(() => {
    const terminal = new Terminal();
    // const fitAddon = new FitAddon();
    // fitAddon.load(terminal);
    terminal.open(document.getElementById("terminal")!);

    socket.on("output", (data: string) => {
      terminal.write(data);
    });

    terminal.onData((input: string) => {
      socket.emit("input", input);
    });
  }, []);

  return <div id="terminal" className="h-40 w-full bg-black text-white"></div>;
};

export default IDETerminal;
