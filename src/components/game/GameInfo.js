import React from "react";
import { Col, Row, Button } from "react-bootstrap";
import { useUser } from "../../context/UserContext";
import { usePOSTRequest } from "../../components/hooks";
import { QUEST, TOURNAMENT } from "../../util/constants"

function GameInfo({className, state, roundType}) {
    const { user } = useUser();

    const currentPlayer = state.players[state.currentPlayer]

    return(
        <Col className={className} style={{padding: "0.5vw", margin:"0 0%"}}>
            <Row style={{fontSize: "1.3vw", fontStyle: "italic"}}>
                <b>Quests Of The Round Table</b>
                <img src={`http://localhost:3000/title.png`} />
            </Row>
            <Row style={{fontSize: "1vw", paddingTop: "1vw"}}>
                <div>
                    {roundType == QUEST ?
                        `Quest | Stage ${state.quest?.currentStage}`
                        : roundType == TOURNAMENT ?
                        `${state.tournament?.card?.name}`
                        : "Round"
                    }
                </div>
            </Row>
            <Row style={{fontSize: "1vw", paddingTop: "1vw"}}>
                {user.id === currentPlayer.id ?
                    <div> Your Turn </div>
                : <div>Waiting for {currentPlayer.name}</div>
                }
            </Row>

            <Row style={{fontSize: "1vw", paddingTop: "1vw"}}>
                <div>Event Info</div>
            </Row>
        </Col>
    )
}

export default GameInfo;