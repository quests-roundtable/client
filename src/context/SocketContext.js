import React, {
  createContext,
  useEffect,
  useState,
  useCallback,
  useContext,
} from "react";
import SockJsClient from 'react-stomp';

const SocketContext = createContext(null);

function SocketProvider({ children, lobby }) {
  const [lastMessage, setLastMessage] = useState({});

  const sendMessage = (msg) => {
    this.clientRef.sendMessage('/ws', msg);
  }

  return (
    <div>
      <SockJsClient url='http://localhost:9090/ws' topics={[`/topic/messages`]}
            onMessage={(msg) => { console.log(msg); setLastMessage(msg) }}
            ref={ (client) => { this.clientRef = client }} />

      <SocketContext.Provider
        value={{ lastMessage, lobby, sendMessage }}
      >
        {children}
      </SocketContext.Provider>
    </div>
  );
}

function useSocket() {
  return useContext(SocketContext);
}

export { useSocket, SocketProvider };
