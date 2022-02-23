import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import Game from "./Game";
import { SocketProvider, SocketContext } from "../../context/SocketContext";

function GameWrapper() {
  const [state, setState] = useState('No server message here.');
  const { id } = useParams();
  const client = useContext(SocketContext);

  console.log("rernderd")
  return (
    <SocketProvider lobby={id} setState={setState} >
      <div>
        <h1>Lobby: {id}</h1>
        <Game state={state}/>
      </div>
    </SocketProvider>
  );
}

export default React.memo(GameWrapper);
