import React, { useState } from "react";
import Card from "./Card";
import { Modal, Button, Row, Col } from "react-bootstrap";
import { useUser } from "../../context/UserContext";
import { propTypes } from "react-bootstrap/esm/Image";
import axios from "axios";



function PlayerHand({ className, state, lobby }) {
    const currentPlayer = state.players[state.currentPlayer]
    const validateTurn = () => {
        return user.id === currentPlayer.id
    }
    const { user } = useUser();

    const player = state.players ? state.players.find(player => player.id == user.id) : null;
    const cards = player && player.playerHand ? player.playerHand : [];

    const [selected, setSelected] = useState([]);

    function isDiscarding() {
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
        const selectedSoFar = [...selected];
        var style = {
            "width": "100%",
            "transition": "250ms"
        }
        if (selectedSoFar.includes(card)) {
            style["boxShadow"] = "10px -10px 5px";
        }
        return style;
    }
    const params = { lobby: lobby };

    return (
        <div className={className}>
            <Modal
                centered
                dialogClassName="modalf"
                show={isDiscarding()}
                backdrop="static"
                keyboard={false}>
                <Modal.Header style={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <Modal.Title>Discard: Maximum hand limit (12) exceeded. </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        {cards && cards.length > 0 ?
                            cards.map((card) =>
                                <Col key={card.id} onClick={() => axios.post(
                                    `/game/round/discard`, 
                                    { data: card.id, lobby: lobby, playerId: user.id})}>
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

            <div style={{ "position": "fixed", "bottom": 0, "left": 80 }}>
                <Button disabled={!validateTurn()} onClick={() => {alert(selected)}} variant="outline-dark">Play</Button>
            </div>
        </div>
    )
}


export default PlayerHand;