import React, {useState, useCallback, useContext} from "react"
import { useUser } from "../../context/UserContext";
import { SocketContext } from "../../context/SocketContext";
import { useFields } from "../../components/hooks";
import { Button, InputGroup, FormControl} from "react-bootstrap";
import axios from "axios";
import API from "../../api"

function Game(props) {
    var [fields, handleFieldChange] = useState({
        message: "",
    });
    const { user } = useUser();
    // const client = useContext(SocketContext);

    // const stompClient = useStompClient();
    // useSubscription("/topic/messages", (message) => setLastMessage(message.body));

    const sendMessage = useCallback(() => {
        console.log("Sending message " + fields.message)
        // var tx = client.begin();
        // client.publish({
        //     destination: "/app/recieve",
        //     headers: { transaction: tx.id },
        //     body: fields.message
        // })
        // tx.commit();
        fetch("/game/message", {method: "POST", body: fields.message})
            .then(res => {
                console.log(res)
            }).catch(err => alert(err));
    }, [fields.message]);
    
    const setField = (field, value) => {
        handleFieldChange({
          ...fields,
          [field]: value
        })
    }
    
    return (
        <>
            {/* <div>
                Last Message received: {props.message}
            </div> */}
            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">Message</InputGroup.Text>
                <FormControl
                    placeholder="message"
                    aria-label="message"
                    aria-describedby="basic-addon1"
                    value={fields.message}
                    onChange={ e => setField("message", e.target.value)}
                />
                <Button variant="outline-dark" type="submit" onClick={sendMessage}>Send message</Button>
            </InputGroup>
                {/* <Form.Label>Send Message</Form.Label>
                <Form.Control
                    id="message"
                    type="text"
                    autoFocus
                    value={fields.message}
                    onChange={ e => setField("message", e.target.value) }
                />
                <Button variant="outline-dark" type="submit" onClick={sendMessage}>Send message</Button> */}
            <div>
                Last Message received: {props.state}
            </div>
        </>
    )
    
}

export default React.memo(Game);