import React from "react";
import { Col, Row, Button } from "react-bootstrap";
import { useUser } from "../../context/UserContext";
import { usePOSTRequest } from "../../components/hooks";

function GameInfo({className, state}) {
    const { user } = useUser();

    const currentPlayer = state.players[state.currentPlayer]

    return(
        <Col className={className} style={{padding: "0.5vw", margin:"0 0%"}}>
            <Row style={{fontSize: "1.3vw", fontStyle: "italic"}}>
                <b>Quests Of The Round Table</b>
                <img src={`http://localhost:3000/title.png`} />
            </Row>
            <Row style={{fontSize: "1vw", paddingTop: "1vw"}}>
                <div>Round</div>
            </Row>
            <Row style={{fontSize: "1vw", paddingTop: "1vw"}}>
                {user.id === currentPlayer.id ?
                    <div> Your Turn </div>
                : <div>Waiting for {currentPlayer.name}</div>
                }
            </Row>
        </Col>
    )
}

export default GameInfo;