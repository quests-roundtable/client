import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Game from "./Game";
import { SocketProvider } from "../../context/SocketContext";
import Lobby from "../Lobby";

// const IN_PROGRESS = 1;
const WAITING_LOBBY = 0;

function GameWrapper() {
  const [state, setState] = useState(useLocation().state);
  const { id } = useParams();

  return (
    <SocketProvider lobby={id} setState={setState} >
        {state.gameStatus === WAITING_LOBBY ? (
          <div>
            <h4 style={{paddingBottom: "10px"}}>Lobby | game#{id}</h4>
            <Lobby state={state} lobby={id}/>
          </div>
        ) : (
          <Game state={state} lobby={id}/>
        )
        }
    </SocketProvider>
  );
}

export default React.memo(GameWrapper);
