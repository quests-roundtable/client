import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Game from "./Game";
import { SocketProvider } from "../../context/SocketContext";

function GameWrapper() {
  const [state, setState] = useState('No server message here.');
  const { id } = useParams();

  console.log("Game Wrapper Rendered")
  return (
    <SocketProvider lobby={id} setState={setState} >
      <div>
        <h4 style={{paddingBottom: "10px"}}>Lobby | game#{id}</h4>
        <Game state={state} lobby={id}/>
      </div>
    </SocketProvider>
  );
}

export default React.memo(GameWrapper);
