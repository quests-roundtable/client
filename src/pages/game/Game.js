import React from "react"
import { useSocket } from "../../context/SocketContext";
import { useUser } from "../../context/UserContext";

function Game() {
    const {lastJsonMessage, sendJsonMessage} = useSocket();
    const { user } = useUser();


    const isUserTurn = user && user.id && lastJsonMessage && lastJsonMessage.currentTurn && lastJsonMessage.currentTurn == user.id;
    
}

export default Game;