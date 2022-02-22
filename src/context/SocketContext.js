import React, { createContext, useEffect, useState, useCallback, useContext } from "react";
import useWebSocket from "react-use-websocket";


const SocketContext = createContext(null);

function SocketProvider({ children, lobby }) {
    // const [lastMessages, setLastMessages] = useState({});

    // todo: socket endpoint
    const SocketUrl = `ws://localhost:4000`

    const {
        sendJsonMessage,
        lastJsonMessage,
        readyState
    } = useWebSocket(SocketUrl, {
        onOpen: () =>
            console.log(`Connection to lobby ${lobby} opened/`),
        shouldReconnect: () => true,
        onError: () => setError(`Lobby ${lobby} does not exist.`),
    });

    // useEffect(() => {
    //     if (lastJsonMessage)
    //         setLastMessages((prev) => ({
    //             ...prev,
    //             lastJsonMessage,
    //         }));
    // }, [lastJsonMessage]);

    return (
        <SocketContext.Provider
            value={{ sendJsonMessage, lastJsonMessage, readyState, lobby }}>
            {children}
        </SocketContext.Provider>
    )
}

function useSocket(){
    return useContext(SocketContext);
}

export { useSocket, SocketProvider }