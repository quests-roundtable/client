import React from "react";
import { Col, Row, Button } from "react-bootstrap";
import { useUser } from "../../context/UserContext";
import { usePOSTRequest } from "../../components/hooks";
import { ROUND, QUEST, TOURNAMENT, ROUND_END, SPONSOR, TEST_STAGE } from "../../util/constants"

function GameInfo({className, state, roundType}) {
    const { user } = useUser();

    const currentPlayer = roundType == ROUND ? state.players[state.currentPlayer] 
                        : roundType == TOURNAMENT ? state.players[state.tournament.currentPlayer]
                        : state.players[state.quest.currentPlayer]

    const player = state.players
        ? state.players.find((player) => player.id == user.id)
        : null;

    const roundEnd = state.quest?.roundStatus === ROUND_END ?
                        state.quest.roundResult?.results[player.id] 
                        : (state.tournament?.roundStatus === ROUND_END ?
                        state.tournament.roundResult?.results[player.id] : null)

    return(
        <Col className={className} style={{padding: "0.5vw", margin:"0 0%"}}>
            <Row style={{fontSize: "1.3vw", fontStyle: "italic"}}>
                <b>Quests Of The Round Table</b>
                <img style={{height: 80}}src={`http://localhost:3000/title.png`} />
            </Row>
            <Row style={{fontSize: "1vw", paddingTop: "0.5vw"}}>
                <div>
                    {roundType == QUEST ?
                        `Quest | Stage ${state.quest?.currentStage}`
                        : roundType == TOURNAMENT ?
                        `${state.tournament?.card?.name}`
                        : "Round"
                    }
                </div>
            </Row>
            <Row style={{fontSize: "1vw", paddingTop: "0.5vw"}}>
                <div>
                    {roundEnd ? `${(roundEnd.success ? "Victorious" : "Defeated")}`
                        : roundType === QUEST && player.questInfo?.role === SPONSOR ? "Sponsoring Quest"
                        : roundType === QUEST && state.quest?.roundStatus === TEST_STAGE ? `${state.quest?.questStage[0]?.name}`
                        : state.event ?
                        "Event Info"
                        : <></>
                    }
                </div>
            </Row>
            <Row style={{fontSize: "1vw", paddingTop: "0.5vw"}}>
                {user.id === currentPlayer.id ?
                    <div> Your Turn </div>
                : <div>Waiting for {currentPlayer.name}</div>
                }
            </Row>
        </Col>
    )
}

export default GameInfo;