import React from "react";
import Card from "./Card";
import { Modal, Button, Row, Col } from "react-bootstrap";

function Player({playerNum, player, style}) {

    function getStyle() {
        var style = {
            "width": "6.5vw",
            "transition": "250ms"
        }
        return style;
    }

    return(
        <div className={`player${playerNum} grid-a`} style={style}>
            <div className= {`rank${playerNum} grid-a`}>
                <Card card={player.rankCard} style={getStyle()} className="card-static" />
            </div>
        </div>
    )
}

export default Player;