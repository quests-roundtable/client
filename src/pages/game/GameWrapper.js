import React from "react";
import {useParams} from "react-router-dom";
import Game from "./Game";
import { SocketProvider } from "../../context/SocketContext";

function GameWrapper() {
    const { id } = useParams();
    
    return (
        <SocketProvider lobby={id}>
            <Game />
        </SocketProvider>
    );
}

export default GameWrapper;