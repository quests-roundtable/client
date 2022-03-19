import React from "react";
import { Col, Row } from "react-bootstrap";
import Card from "./Card";
import { QUEST, TOURNAMENT, ROUND, ROUND_END, TEST_STAGE } from "../../util/constants"


function GameBoard({state, roundType}) {
    // null eventcard so it doesn't persist
    return(
        <div className="quest-event">
            <div className="story-deck grid-a">
                <Card card={{ typeId: "story" }} style={{ width: "6vw" }} className="card-static" />
            </div>

            <div className="story-card grid-a">
                {roundType == QUEST && state.quest?.card ? 
                    <Card card={state.quest.card} style={{ width: "6vw" }} />
                    : roundType == TOURNAMENT && state.tournament?.card ?
                    <Card card={state.tournament.card} style={{ width: "6vw" }} />
                    : roundType == ROUND && state.event ?
                        <Card card={state.event} style={{width: "6vw"}}/>
                    : <></>
                }
                
            </div>
            
            <Row className="event">
                {roundType == QUEST && state.quest.questStage ? 
                    state.quest.questStage.map((card, idx) => {
                        return(
                            <Col key={idx}>
                                {state.quest.roundStatus == ROUND_END || 
                                    (card.type === "Test" && state.quest.roundStatus == TEST_STAGE) ?
                                <Card card={card} style={{ width: "6vw" }} />
                                :
                                <Card card={{ typeId: "adventure" }} style={{ width: "6vw" }} className="card-static" />
                                }
                            </Col>
                        )
                    })
                    : <></>
                }
            </Row>
        </div>
)
}

export default GameBoard;