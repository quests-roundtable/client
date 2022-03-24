import React, { useState } from "react";
import Card from "./Card";
import { Modal, Button, Row, Col } from "react-bootstrap";
import { useUser } from "../../context/UserContext";
import axios from "axios";

function QuestSetup({ state, lobby, player, showSetup, setShowSetup }) {
    const { user } = useUser();
    const cards = player && player.playerHand ? player.playerHand : [];
    const [selected, setSelected] = useState({});
    const [stages, setStages] = useState(new Array(state.quest?.card?.questStages).fill([]))

    function addToSelected(e, card) {
        e.preventDefault();
        var selectedSoFar = Object.keys(selected);
        if (selectedSoFar.indexOf(card.id) === -1) {
            setSelected({ ...selected, [card.id]: card });
        } else {
            const asArray = Object.entries(selected)
            setSelected(Object.fromEntries(asArray.filter(([key, value]) => key != card.id)));
        }
    }

    // if order of cards can be formed into quest stages
    // const canFormQuest = (cardList, numStages) => {
    function canFormQuest() {
        var questCards = stages.reduce((joined, stage) => { return joined.concat(stage) }, [])
        if (questCards.filter((card) => card.type === "Test").length > 1) return false;

        for (let stage of stages) {
            if (stage.length === 0) return false;
            if (stage[0].type === "Weapon") return false;
            if (stage[0].type === "Test" && stage.length > 1) return false;
            if (stage[0].type === "Foe") {
                if (stage.filter((card) => card.type === "Weapon").length != (stage.length - 1)) {
                    return false;
                }
            }

        }
        return true
    }

    function getStyle(card) {
        var selectedSoFar = Object.keys(selected);
        var style = {
            width: "5vw",
            transition: "250ms",
        };
        if (selectedSoFar.includes(card)) {
            style["boxShadow"] = "10px -10px 5px";
        }
        return style;
    }

    const setStage = (idx) => {
        var questStages = []
        stages.map((stage, i) => {
            if (idx == i) {
                questStages.push(stages[i].concat([...Object.values(selected)]))
            } else {
                questStages.push(stages[i])
            }
        })
        setSelected({})
        setStages(questStages)
    }

    const getQuestStages = () => {
        return stages.map((stage) => {
            return stage.map((card) => card.id)
        })
    }

    function POSTRequest(url, object, lobby, playerId = null) {
        setShowSetup(false)
        setSelected({})
        setStages(new Array(state.quest?.card?.questStages).fill([]));

        axios.post(url,
            playerId ?
                {
                    data: object,
                    lobby: lobby,
                    playerId: playerId
                }
                : {
                    data: object,
                    lobby: lobby
                }
        ).then(res => {
            console.log(res)
        }).catch(err => {
            alert(`Error ${err?.response?.status}: ${err?.response?.data?.message}`)
        });
    }


    const questCardTypes = ["Foe", "Weapon", "Test"];
    const choosenCards = stages.reduce((joined, stage) => { return joined.concat(stage) }, [])
    const availableCards = cards.filter((card) =>
        questCardTypes.includes(card.type) && !choosenCards.includes(card)
    )

    return (
        <Modal centered dialogClassName="modalf" show={showSetup} keyboard={false} onHide={() => setShowSetup(false)}>
            <Modal.Header style={{ display: "flex", justifyContent: "center" }}>
                <Modal.Title>Setup Quest</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div style={{ display: "flex", flexFlow: "row wrap", justifyContent: "space-evenly" }}>
                    {stages.map((stage, idx) => {
                        return (
                            <Row key={idx} onClick={selected && Object.keys(selected).length > 0 ?
                                () => setStage(idx) : undefined}
                                style={{ borderStyle: "solid", height: "10vw", width: "50%" }}>
                                <Row style={{ display: "flex", justifyContent: "center" }}>
                                    <b>{`Stage ${idx + 1}`}</b>
                                </Row>
                                <div style={{ display: "flex", justifyContent: "center", justifyItems: "center" }}>
                                    {stage && stage.length > 0 ? (
                                        stage.map((card) => (
                                            <Card key={card.id} card={card} style={getStyle(card.id)} />
                                        ))
                                    ) : (
                                        <></>
                                    )}
                                </div>
                            </Row>
                        )
                    })}
                </div>
                <Row style={{ borderStyle: "solid" }}>
                    {availableCards && availableCards.length > 0 ? (
                        availableCards.map((card) => (
                            <Col key={card.id} onClick={(e) => addToSelected(e, card)}>
                                <Card card={card} style={getStyle(card.id)} />
                            </Col>
                        ))
                    ) : (
                        <></>
                    )}
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    disabled={!canFormQuest()}
                    onClick={() => POSTRequest("/quest/round/sponsor", getQuestStages(), lobby, user.id)}
                    variant="outline-dark">
                    Sponsor
                </Button>
                <Button
                    variant="outline-dark"
                    onClick={() => POSTRequest("/game/round/next", user.id, lobby)}>
                    Decline
                </Button>
                <Button variant="outline-dark" onClick={() => {
                    setStages(new Array(state.quest?.card?.questStages).fill([]));
                    setSelected({})
                }}>
                    Reset
                </Button>
                <Button variant="outline-dark" onClick={() => {
                    setShowSetup(false)
                    setStages(new Array(state.quest?.card?.questStages).fill([]));
                    setSelected({})
                }}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default QuestSetup;
