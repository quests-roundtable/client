import React from "react";
import Card from "./Card";
import { QUEST, TOURNAMENT, SPONSOR, ROUND_END } from "../../util/constants";


function Player({playerNum, player, style, roundType, result}) {

    function getStyle() {
        var style = {
            "width": "5vw",
            "transition": "250ms"
        }
        return style;
    }

    const moveInfo = roundType == QUEST ? player.questInfo : 
        roundType == TOURNAMENT ? player.tournamentInfo : null

    return(
        <div className={`player${playerNum} grid-a`} style={style}>
            <div className= {`rank${playerNum} grid-a`} style={{
                borderColor: "darkslategray", borderStyle: (moveInfo ? "solid" : "none")
            }}>
                <Card card={player.rankCard} style={getStyle()} className="card-static" />
            </div>
            <div className={playerNum <= 2 ? "playerMoveH" : "playerMoveV"}>
                {moveInfo?.role && moveInfo.role == SPONSOR ? <b>SPONSOR</b> : <></> }
                {moveInfo?.playerMove ?  
                    roundType == ROUND_END ? 
                    result?.hand.map((card, idx) => {
                        <Card key={idx} card={card} style={getStyle()}/>
                    })
                    : [...Array(moveInfo.numMoveCards)].map((x, i) => {
                        <Card key={i} card={{ typeId: "adventure" }} style={getStyle()}/>
                    })
                : <></>
                }
                <Card card={{ typeId: "adventure" }} style={getStyle()}/>
                <Card card={{ typeId: "adventure" }} style={getStyle()} />
                <Card card={{ typeId: "adventure" }} style={getStyle()} />
            </div>
        </div>
    )
}

export default Player;