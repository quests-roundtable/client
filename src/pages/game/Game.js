import React, { useState } from "react"
import { useUser } from "../../context/UserContext";
import { usePOSTRequest } from "../../components/hooks";
import { Button, InputGroup, FormControl} from "react-bootstrap";

function Game(props) {
    var [fields, handleFieldChange] = useState({
        message: "",
    });
    const user = useUser();
    
    const setField = (field, value) => {
        handleFieldChange({
          ...fields,
          [field]: value
        })
    }
    
    return (
        <>
        <div style={{width: "50vw", margin: "auto"}}>
            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">Message</InputGroup.Text>
                <FormControl
                    placeholder="message"
                    aria-label="message"
                    aria-describedby="basic-addon1"
                    value={fields.message}
                    onChange={ e => setField("message", e.target.value)}
                />
                <Button variant="outline-dark" type="submit" 
                    onClick={usePOSTRequest("/game/message", fields.message, props.lobby)}>
                    Send message
                </Button>
            </InputGroup>
                
            <div>
                Last Message received: {props.state}
            </div>
        </div>

            <div className="container">
                {/* Add game-info component */}
                <div className="game-info"></div>

                {/* Add player-info component*/}
                <div className="player-info"></div>

                {/* Add player hand component*/}
                <div className="hand"></div>

                {/* Add player components below with the given className */}
                <div className="player1">
                    <div className="rank1"></div>
                </div>
                <div className="player2">
                    <div className="rank1"></div>
                </div>
                <div className="player3">
                    <div className="rank1"></div>
                </div>
                <div className="player4">
                    <div className="rank1"></div>
                </div>

                {/* Add discard component*/}
                <div className="discard"></div>

                {/* Add adventure deck component or an image for the deck inside the div*/}
                <div className="adventure-deck"></div>

                {/* Add game main component*/}
                <div className="quest-event">
                    {/* Add story deck component or an image for the deck inside the div*/}
                    <div className="story-deck"></div>
                    {/* Add event component*/}
                    <div className="event"></div>
                </div>
                
            </div>
            
        </>
    )
    
}

export default React.memo(Game);