import React, {
    createContext,
    useEffect,
    useCallback,
    useContext,
} from "react";
import { Client } from '@stomp/stompjs';

const wsclient = new Client({
    brokerURL: `${process.env.REACT_APP_BACKEND_WS_URL}`,
    debug: function (str) {
        console.log(str);
    },
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
});


const SocketContext = createContext(wsclient);

const SocketProvider = React.memo(({ children, lobby, setState }) => {
    const client = useContext(SocketContext)
    const messageHandler = useCallback((message) => {
        if (message.body) {
            var object = JSON.parse(message.body)
            console.log("object: ", object);
            setState(object);
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
