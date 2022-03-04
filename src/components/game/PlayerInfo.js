import React from "react";
import { Row, Col } from "react-bootstrap";

function PlayerInfo({className, players, currentPlayer}) {
    const infoStyle = {
        listStyleType: "none", 
        margin: "0.2vw 0.5vw", 
        fontSize: "0.8vw",
        justifyItems: "center",
        textAlign: "left",
        padding: "0"
    }
    return(
        <Col className={className} style={{width: "90%"}}>
            {players.map((player, index) => {
                return(
                    <Row key={index} style={{border: "double", margin:"0 1%", 
                        borderColor: (player.id === currentPlayer.id ? "maroon" : "black")}}>
                        <Col xs={3} style={{padding: "15% 0 5% 5%"}}>
                            <img className="card-static" style={{width: "90%"}}
                                src={`http://localhost:3000/cards/shields1.png`} />
                        </Col>
                        <Col key='1' style={infoStyle} className="grid-a">
                            <li key='0'>{player.name}</li>
                            <li key='1'><b>Rank:</b> {player.rankCard.name}</li>
                            <li key='2'><b>Shields:</b> {player.shields}</li>
                            <li key='3'><b>BattlePoints:</b> {player.rankCard.battlePoints}</li>
                        </Col> 
                    </Row>                    
                )
            })}
        </Col>
    )
}

export default PlayerInfo;