import React, { useState } from "react"
import { useUser } from "../../context/UserContext";
import PlayerInfo from "../../components/game/PlayerInfo";
import "../../styles/game-layout.css"

function Game(props) {
    const user = useUser();
    
    return (
        <>
        <div className="container">
            {/* Add game-info component */}
            <div className="game-info"></div>

            {/* Add player-info component*/}
            <PlayerInfo className="player-info" players={props.state.players}/>

            {/* Add player hand component*/}
            <div className="hand"></div>

            {/* Add player components below with the given className */}
            <div className="player1">
                <div className="rank1"></div>
            </div>
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
            
        </>
    )
    
}

export default React.memo(Game);