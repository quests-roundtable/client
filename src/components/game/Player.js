import React from "react";
import Card from "./Card";
import { Modal, Button, Row, Col } from "react-bootstrap";

function Player({className, player}) {
    return(
        <div className={className}>
            <div className="rank1">
                <Row>
                    <Card type="Rank_01" />
                </Row>
            </div>
        </div>
    )
}

export default Player;