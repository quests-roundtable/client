import React, { useLayoutEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import Game from "./Game";
import { SocketProvider } from "../../context/SocketContext";
import Lobby from "../Lobby";

const WAITING_LOBBY = 0;

function GameWrapper() {
  const [state, setState] = useState(useLocation().state);
  const { id } = useParams();

  useLayoutEffect(() => {
    fetch(
      `/game/${id}`, { method: "GET" }
    ).then((res) => res.json()).then((data) => setState(data))
  }, [])

  return (
    <SocketProvider lobby={id} setState={setState} >
      {state.gameStatus === WAITING_LOBBY ? (
        <div>
          <Lobby state={state} lobby={id} />
        </div>
      ) : (
        <Game state={state} lobby={id} />
      )
      }
    </SocketProvider>
  );
}

export default React.memo(GameWrapper);
