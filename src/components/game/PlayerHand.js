import React, { useState } from "react";
import Card from "./Card";
import { Modal, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useUser } from "../../context/UserContext";
import { propTypes } from "react-bootstrap/esm/Image";



function PlayerHand({ className, state, lobby }) {

    console.log("state:", state);
    // console.log("lobby:", lobby);
    const { user } = useUser();

    const player = state.players ? state.players.find(player => player.id == user.id) : null;
    const cards = player && player.playerHand ? player.playerHand : [];
    console.log("cards:", cards);

    const [selected, setSelected] = useState([]);

    function isDiscarding() {
        console.log("isDiscarding");
        if (cards && cards.length > 12) {
            console.log("too many cards!")
        }
        // todo: check for turn
        // return propTypes.currentTurnId === user.id && cards.length() > 12;
        return cards && cards.length > 12;
    }

    function addToSelected(e, card) {
        e.preventDefault();
        var selectedSoFar = [...selected];
        if (selectedSoFar.indexOf(card) === -1) {
            selectedSoFar.push(card);
        } else {
            selectedSoFar = selectedSoFar.filter(function (ele) { return ele !== card });
        }
        setSelected(selectedSoFar);
    }


    function getStyle(card) {
        console.log("getstyle");
        const selectedSoFar = [...selected];
        var style = {
            "width": "100%",
            "transition": "250ms"
        }
        if (selectedSoFar.includes(card)) {
            style["box-shadow"] = "10px -10px 5px";
            console.log("card is selected");
        }
        return style;
    }
    const params = { lobby: lobby };

    return (
        <div className={className}>
            <Modal
                // style={{
                    
                //     "position": "fixed !important",
                //     "width: ": "vw !important",
                //     "height": "vh !important"
                // }}
                dialogClassName="modalf"
                show={isDiscarding()}
                backdrop="static"
                keyboard={false}>
                <Modal.Header>
                    <Modal.Title>Discard: Maximum hand limit (12) exceeded. </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        {cards && cards.length > 0 ?
                            cards.map((card) =>
                                <Col key={card.id} onClick={() => fetch(
                                    `/test/test2`, { method: "POST", body: lobby }
                                )}>
                                    <Card card={card} style={getStyle(card.id)} />
                                </Col>) : <></>}
                    </Row>
                </Modal.Body>

            </Modal>
            <Row>
                {cards && cards.length > 0 ?
                    cards.map((card) =>
                        <Col key={card.id} onClick={((e) => addToSelected(e, card.id))}>
                            <Card card={card} style={getStyle(card.id)} />
                        </Col>) : <></>}
            </Row>

            <div style={{ "position": "fixed", "bottom": 0, "left": 0 }}>
                <Button>Play</Button>
            </div>
        </div>
    )
}


export default PlayerHand;