import React, { useState } from "react";
import { Modal, Row, Col, Button } from "react-bootstrap";
import Card from "./Card";

function DiscardDeck({className, discardDeck}) {
    const [showModal, setModal] = useState(false);

    const switchModal = () => {
        setModal(!showModal)
    }

    return(
        <div className={`${className} grid-a`}>
            <Modal dialogClassName="modalf" show={showModal} keyboard={false} onHide={switchModal}>
                <Modal.Header style={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <Modal.Title>Discarded Cards</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        {discardDeck && discardDeck.length > 0 ? 
                            discardDeck.reverse().map((card) => {
                                return(
                                    <Col key={card.id}>
                                        <Card card={card} 
                                            style={{width: "6vw", transition: "250ms"}} />
                                    </Col>
                                )})
                            : <p>Graveyard is empty.</p>
                        }
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-dark" onClick={switchModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <div style={{width: "6.4vw", height: "8.5vw", alignItems:"stretch", 
                borderStyle: "dotted", borderColor: "maroon"}}
                onClick={switchModal}>
                {discardDeck && discardDeck.length > 0 ?
                    <Card card={discardDeck[discardDeck.length-1]} style={{width: "6vw"}} 
                        onClick={() => alert("discrad")}/>
                : <></>
                }
            </div>
        </div>
    )

}

export default DiscardDeck;