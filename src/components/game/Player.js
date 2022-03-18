import React from "react";
import Card from "./Card";
import { QUEST, TOURNAMENT, SPONSOR, ROUND_END } from "../../util/constants";


function Player({ state, playerNum, player, style, roundType, result }) {

    function getStyle() {
        var style = {
            "width": "5vw",
            "transition": "250ms"
        }
        return style;
    }

    const moveInfo = roundType == QUEST ? player.questInfo :
        roundType == TOURNAMENT ? player.tournamentInfo : null

    const event = roundType == QUEST ? state.quest :
        roundType == TOURNAMENT ? state.tournament : null
    // console.log("num special cards:", player.specialCards.length)
    // console.log("showing ", moveInfo?.numMoveCards - player.specialCards.length, " cards")
    return (
        <div className={`player${playerNum} grid-a`} style={style}>
            <div className={`rank${playerNum} grid-a`} style={{
                borderColor: "darkslategray", borderStyle: (moveInfo ? "solid" : "none")
            }}>
                <Card card={player.rankCard} style={getStyle()} />
            </div>
            <div className={playerNum <= 2 ? "playerMoveH" : "playerMoveV"}>
                {moveInfo?.role === SPONSOR ? <b>SPONSOR</b> : <></>}
                <>
                    {!event || event?.roundStatus !== ROUND_END ? player?.specialCards.map((card, idx) => {
                        return (
                            <Card key={idx} card={card} style={getStyle()} />
                        )
                    }) : <></>}
                </>
                {moveInfo?.playerMove ?
                    (event.roundStatus == ROUND_END ?
                        result?.hand.map((card, idx) => {
                            return (
                                <Card key={idx} card={card} style={getStyle()} />
                            )
                        })
                        : (roundType === TOURNAMENT ?
                            (moveInfo?.numMoveCards > 0 ? <Card card={{ typeId: "adventure" }} style={getStyle()} /> : <></>)
                            : [...Array(moveInfo?.numMoveCards - player.specialCards.length) ].map((x, i) => {
                                return (
                                    <Card key={i} card={{ typeId: "adventure" }} style={getStyle()} />
                                )
                            })))
                    : <></>
                }
            </div>
        </div>
    )
}

export default Player;