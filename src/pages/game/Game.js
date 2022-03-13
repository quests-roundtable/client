import React, { useCallback } from "react"
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
import GameBoard from "../../components/game/GameBoard";
import { ROUND, QUEST, TOURNAMENT } from "../../util/constants"

function Game({ state, lobby }) {
    const { user } = useUser();


    // Align the player div based on the user
    const playerAlign = (state.players.length === 2) ? [1, 2, 3, 4] : [1, 3, 2, 4];

    const getPlayerPlacement = () => {
        var aligned = []
        for (let idx = 0; idx < state.players.length; idx++) {
            let player = state.players[idx]
            if (player.id === user.id) {
                return state.players.slice(idx, state.players.length).concat(aligned)
            }
            aligned.push(player)
        }
        return aligned
    }

    const players = getPlayerPlacement();

    // Round type
    const getRoundType = () => {
        if(state.quest) {
            return QUEST
        } else if (state.tournament) {
            return TOURNAMENT
        } else {
            return ROUND
        }
    }

    const roundType = getRoundType();

    // Current Player
    const currentPlayer = roundType == ROUND ? state.players[state.currentPlayer] 
                        : roundType == TOURNAMENT ? state.players[state.tournament.currentPlayer]
                        : state.players[state.quest.currentPlayer]

    const validateTurn = () => {
        return user.id === currentPlayer.id
    }

    return (
        <>
            <div className="container">
                {/* Add game-info component */}
                <GameInfo className="game-info" state={state} roundType={roundType}/>

                {/* Add player-info component*/}
                <PlayerInfo className="player-info" players={players}
                    currentPlayer={currentPlayer} />

                {/* Add player hand component*/}
                <PlayerHand className="hand" state={state} lobby={lobby} 
                    roundType={roundType} currentPlayer={currentPlayer}/>

                {/* Add player components below with the given className */}
                {playerAlign.map((num, idx) => {
                    if (players[idx]) {
                        return (
                            <Player key={idx} state= {state} playerNum={num} player={players[idx]} roundType={roundType} 
                                result={state.quest?.roundResult?.results[players[idx].id]}
                                style={{ 
                                    borderColor: (players[idx].id === currentPlayer?.id ? "darkRed" : "black"),
                                    borderStyle: (players[idx].id === currentPlayer?.id ? "solid" : "dashed")
                            }} />
                        )
                    } else {
                        return (
                            <div key={idx} className={`player${num}`}>
                                <div className={`rank${num}`}></div>
                            </div>
                        )
                    }
                })}

                {/* Add discard component*/}
                <DiscardDeck className="discard" discardDeck={state.discardDeck} />

                {/* Add adventure deck component or an image for the deck inside the div*/}
                <div className="adventure-deck grid-a">
                    {/* onClick={validateTurn() ? usePOSTRequest("/game/round/draw", user.id, lobby) : useCallback(() => { })}> */}
                    <Card card={{ typeId: "adventure" }} style={{ width: "6vw" }} className={validateTurn() ? "card-clickable" : "card-disabled"} />

                </div>

                {/* Add game main component*/}
                <GameBoard state={state} roundType={roundType}/>

            </div>

        </>
    )

}

export default React.memo(Game);