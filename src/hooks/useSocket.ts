import { useEffect, useRef, useState } from "react";
import { WSPayload } from "../types/ws";

export function useSocket() {
  const ws = useRef<WebSocket | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    ws.current = new WebSocket(
      "ws://10.159.71.105:3000?token=mySecret123"
    );

    ws.current.onopen = () => setConnected(true);
    ws.current.onclose = () => setConnected(false);

    return () => ws.current?.close();
  }, []);

  const send = (data: WSPayload) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(data));
    }
  };

  return { connected, send };
}