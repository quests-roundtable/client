import React from "react";
import { useParams } from "react-router-dom";
import Game from "./Game";
import { SocketProvider } from "../../context/SocketContext";
import {
  StompSessionProvider,
  useSubscription,
} from "react-stomp-hooks";

function GameWrapper() {
  const { id } = useParams();

  return (
    <div>
      <h1>Lobby: {id}</h1>
      {/* <SocketProvider lobby={id}>
        <Game />
      </SocketProvider> */}
      <StompSessionProvider url={"http://localhost:9090/ws"}>
        <Game/>
      </StompSessionProvider>
    </div>
  );
}

export default GameWrapper;
