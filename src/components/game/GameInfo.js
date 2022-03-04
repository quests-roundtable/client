import React from "react";
import { Col, Row } from "react-bootstrap";

function GameInfo({className, state}) {

    return(
        <Col className={className} style={{padding: "0.5vw"}}>
            <Row style={{fontSize: "2vw"}}>
                <b>Quests of the Round Table</b>
            </Row>
            <Row style={{fontSize: "1vw", paddingTop: "0.5vw"}}>
                <div>Round</div>
            </Row>
            <Row style={{fontSize: "1vw", paddingTop: "0.5vw"}}>
                <div>Player Turn</div>
            </Row>
        </Col>
    )
}

export default GameInfo;