import React, { useState } from "react";
import Card from "./Card";
import { Modal, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useUser } from "../../context/UserContext";



function PlayerHand({ state, lobby }) {

    console.log("state:", state);
    console.log("lobby:", lobby);
    const { user } = useUser();

    const player = state.gameEvent.player ? state.gameEvent.player.find(player => player.id == user.id) : null;
    const cards = player ? player.cards : [];

    console.log(cards);

    return (
        <> 
            <Row>
                {cards.map((card) => <Col key={card.id}><Card type={card.type} /></Col>)}
            </Row>


            <div style={{ "position": "fixed", "bottom": 0, "right": 0 }}>
                <Button onClick={() => axios.post("/test/test1", lobby)}>11 Cards</Button>
                <Button onClick={() => axios.post("/test/test2", lobby)}>12 Cards</Button>
                <Button onClick={() => axios.post("/test/test3", lobby)}>13 Cards</Button>
            </div>
        </>
    )
}


export default PlayerHand;