import React from "react"
import { useUser } from "../../context/UserContext";
import PlayerHand from "../../components/game/PlayerHand";
import { Button } from "react-bootstrap";
import PlayerInfo from "../../components/game/PlayerInfo";
import GameInfo from "../../components/game/GameInfo";
import "../../styles/game-layout.css"
import Player from "../../components/game/Player";
import Card from "../../components/game/Card";
import DiscardDeck from "../../components/game/DiscardDeck";
import { usePOSTRequest } from "../../components/hooks";

function Game({state, lobby}) {
    const { user } = useUser();


    // Align the player div based on the user
    const playerAlign = (state.players.length === 2) ? [1, 2, 3, 4] : [1, 3, 2, 4];

    const getPlayerPlacement = () => {
        var aligned = []
        for(let idx = 0; idx < state.players.length; idx++) {
            let player = state.players[idx]
            if(player.id === user.id) {
                return state.players.slice(idx, state.players.length).concat(aligned)
            }
            aligned.push(player)
        }
        return aligned
    }

    const players = getPlayerPlacement();

    return (
        <>
        <div className="container">
            {/* Add game-info component */}
            <GameInfo className="game-info" state={state}/>

            {/* Add player-info component*/}
            <PlayerInfo className="player-info" players={players}/>

            {/* Add player hand component*/}
            <PlayerHand className="hand" state={state} lobby={lobby}/>

            {/* Add player components below with the given className */}
            {playerAlign.map((num, idx) => {
                if(players[idx]) {
                    return(
                        <Player key={idx} playerNum={num} player={players[idx]}/>
                    )
                } else {
                    return(
                        <div className={`player${num}`}>
                            <div className={`rank${num}`}></div>
                        </div>
                    )
                }
            })}

            {/* Add discard component*/}
            <DiscardDeck className="discard" discardDeck={state.discardDeck}/>

            {/* Add adventure deck component or an image for the deck inside the div*/}
            <div className="adventure-deck grid-a" 
                onClick={usePOSTRequest("/game/round/draw", user.id, lobby)}>
                <Card card={{typeId: "adventure"}} style={{width: "6vw"}}/>
            </div>

            {/* Add game main component*/}
            <div className="quest-event">
                {/* Add story deck component or an image for the deck inside the div*/}
                <div className="story-deck grid-a">
                    <Card card={{typeId: "story"}} style={{width: "6vw"}}/>
                </div>
                {/* Add event component*/}
                <div className="event"></div>
            </div>
                
        </div>

            {/* <div style={{ "position": "fixed", "bottom": 0, "right": "50%" }}>
                <Button onClick={() => fetch(
                    `/test/test1`, { method: "POST", body: lobby }
                )}>11 Cards</Button>
                <Button onClick={() => fetch(
                    `/test/test2`, { method: "POST", body: lobby }
                )}>12 Cards</Button>
                                <Button onClick={() => fetch(
                    `/test/test3`, { method: "POST", body: lobby }
                )}>13 Cards</Button>
            </div> */}
            
        </>
    )
    
}

export default React.memo(Game);