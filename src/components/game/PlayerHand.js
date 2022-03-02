import React, { useState } from "react";
import Card from "./Card";
import { Modal, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useUser } from "../../context/UserContext";



function PlayerHand({ state, lobby }) {

    console.log("state:", state);
    console.log("lobby:", lobby);
    const { user } = useUser();

    const player = state.players ? state.players.find(player => player.id == user.id) : null;
    const cards = player ? player.cards : [];

    console.log(cards);
    const params = { lobby: lobby };
    return (
        <>
            <Row>
                {cards && cards.length > 0 ? cards.map((card) => <Col key={card.id}><Card type={card.type} /></Col>) : <></>}
            </Row>


           
        </>
    )
}


export default PlayerHand;