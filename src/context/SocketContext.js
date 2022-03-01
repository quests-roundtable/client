import React, {
  createContext,
  useEffect,
  useCallback,
  useContext,
} from "react";
import { Client } from '@stomp/stompjs';

const wsclient = new Client({
  brokerURL: 'ws://localhost:9090/ws',
  debug: function (str) {
    console.log(str);
  },
  reconnectDelay: 5000,
  heartbeatIncoming: 4000,
  heartbeatOutgoing: 4000,
});

const SocketContext = createContext(wsclient);

const SocketProvider = React.memo(({ children, lobby, setState }) => {
  // const [lastMessage, setLastMessage] = useState("None");
  const client = useContext(SocketContext)
  const messageHandler = useCallback((message) => {
    console.log(message)
    if(message.body) {
      setState(JSON.parse(message.body));
    } else {
      console.log("No message data.")
    }
  }, [setState])

  useEffect(() => {
    client.onConnect = function (frame) {
      client.subscribe(`/topic/game#${lobby}`, messageHandler);
    };
    
    client.onStompError = function (frame) {
      // Will be invoked in case of error encountered at Broker
      console.log('Broker reported error: ' + frame.headers['message']);
      console.log('Additional details: ' + frame.body);
    };

    console.log("rerendered provider")
    
    client.activate();
  }, [client, messageHandler, lobby])

  return (
    <SocketContext.Provider value={{ lobby }}>
      {children}
    </SocketContext.Provider>
  );
})

export { SocketContext, SocketProvider };
