import { FC, useEffect, useRef } from "react";
import { Terminal } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import { io } from "socket.io-client";
import debounce from "lodash.debounce";

const IDETerminal: FC = () => {
  const terminalRef = useRef(null);
  const terminal = new Terminal();
  const fitAddon = new FitAddon();

  useEffect(() => {
    terminal.loadAddon(fitAddon);
    terminal.open(terminalRef.current!);
    fitAddon.fit();

    const debouncedFit = debounce(() => {
      fitAddon.fit();
    }, 300);

    const handleResize = () => debouncedFit();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [terminal, fitAddon]);

  useEffect(() => {
    const socketUrl =
      process.env.REACT_APP_SOCKET_URL || "http://localhost:8000";
    const socket = io(socketUrl);
    socket.on("output", (data: string) => {
      terminal.write(data);
    });

    terminal.onData((input: string) => {
      socket.emit("input", input);
    });

    socket.on("error", (error: Error) => {
      console.error(`Socket error: ${error.message}`);
      // reconnect socket
      socket.active;
    });

    terminal.focus();

    return () => {
      socket.off("output");
    };
  }, []);

  return (
    <div ref={terminalRef} className="h-40 w-full bg-black text-white"></div>
  );
};

export default IDETerminal;
