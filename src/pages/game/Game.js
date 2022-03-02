import React, { useState } from "react"
import { useUser } from "../../context/UserContext";
import PlayerHand from "../../components/game/PlayerHand";
import { Button } from "react-bootstrap";
import PlayerInfo from "../../components/game/PlayerInfo";
import "../../styles/game-layout.css"
import Player from "../../components/game/Player";

function Game({state, lobby}) {
    const user = useUser();

    const playerAlign = () => {
        var numPlayers = state.players.length
        if (numPlayers === 2) {
            return [1, 2]
        } else {
            return [1, 3, 2, 4]
        } 
    }

    return (
        <>
        <div className="container">
            {/* Add game-info component */}
            <div className="game-info"></div>

            {/* Add player-info component*/}
            <PlayerInfo className="player-info" players={state.players}/>

            {/* Add player hand component*/}
            <PlayerHand className="hand" state={state} lobby={lobby}/>

            {/* Add player components below with the given className */}
            <Player className="player1" player={state.players[0]}></Player>
            <div className="player2">
                <div className="rank2"></div>
            </div>
            <div className="player3">
                <div className="rank3"></div>
            </div>
            <div className="player4">
                <div className="rank4"></div>

            </div>

            {/* Add discard component*/}
            <div className="discard"></div>

            {/* Add adventure deck component or an image for the deck inside the div*/}
            <div className="adventure-deck"></div>

            {/* Add game main component*/}
            <div className="quest-event">
                {/* Add story deck component or an image for the deck inside the div*/}
                <div className="story-deck"></div>
                {/* Add event component*/}
                <div className="event"></div>
            </div>
                
            </div>

            <div style={{ "position": "fixed", "bottom": 0, "right": "50%" }}>
                <Button onClick={() => fetch(
                    `/test/test1`, { method: "POST", body: lobby }
                )}>11 Cards</Button>
                <Button onClick={() => fetch(
                    `/test/test2`, { method: "POST", body: lobby }
                )}>12 Cards</Button>
                                <Button onClick={() => fetch(
                    `/test/test3`, { method: "POST", body: lobby }
                )}>13 Cards</Button>
            </div>
            
        </>
    )
    
}

export default React.memo(Game);