import React, { useState } from "react"
import { usePOSTRequest } from "../components/hooks";
import { Button, InputGroup, FormControl } from "react-bootstrap";
import "../styles/lobby.css"

function Lobby({ state, lobby }) {
    var [fields, handleFieldChange] = useState({
        message: "",
    });

    const setField = (field, value) => {
        handleFieldChange({
            ...fields,
            [field]: value
        })
    }

    function validateStart() {
        return state.players.length >= 2;
    }

    return (
        <>
            <div className="lobby-div" style={{ width: "50vw", margin: "auto" }}>
                <h4 style={{ paddingBottom: "10px" }}>Lobby | game#{lobby}</h4>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">Message</InputGroup.Text>
                    <FormControl
                        placeholder="message"
                        aria-label="message"
                        aria-describedby="basic-addon1"
                        value={fields.message}
                        onChange={e => setField("message", e.target.value)}
                    />
                    <Button variant="outline-dark" type="submit"
                        onClick={usePOSTRequest(`/game/message`, fields.message, state.id)}>
                        Send message
                    </Button>
                </InputGroup>

                <div>
                    Last Message received: {state.message}
                </div>

                <br />
                <div>
                    <b>Players joined: {state.players.length}</b>
                    {state.players.map((player, index) => {
                        return (
                            <li style={{ listStyleType: "none" }} key={index}> {player.name} </li>
                        )
                    })}
                </div>
                <br />

                <Button disabled={!validateStart()} variant="outline-dark"
                    onClick={usePOSTRequest("/game/start", state.id, state.id)}>
                    Start Game
                </Button>

            </div>
        </>
    )

}

export default React.memo(Lobby);