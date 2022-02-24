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
            
        </>
    )
    
}

export default React.memo(Game);