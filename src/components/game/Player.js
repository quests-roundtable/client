import React from "react";
import Card from "./Card";
import { Modal, Button, Row, Col } from "react-bootstrap";

function Player({className, player}) {

    function getStyle() {
        var style = {
            "width": "100%",
            "transition": "250ms"
        }
        return style;
    }
    return(
        <div className={className}>
            <div className="rank1">
                <Row>
                    <Card card={player.rankCard} style={getStyle()} />
                </Row>
            </div>
        </div>
    )
}

export default Player;