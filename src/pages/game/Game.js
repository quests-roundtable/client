import React, {useState, useCallback, useContext} from "react"
import { useUser } from "../../context/UserContext";
import { SocketContext } from "../../context/SocketContext";
import { useFields } from "../../components/hooks";
import { Button, Input, Form} from "react-bootstrap";
import axios from "axios";
import API from "../../api"

function Game(props) {
    var [fields, handleFieldChange] = useState({
        message: "",
    });
    const { user } = useUser();
    const client = useContext(SocketContext);

    // const stompClient = useStompClient();
    // useSubscription("/topic/messages", (message) => setLastMessage(message.body));

    const sendMessage = useCallback(() => {
        console.log("Sending message")
        var tx = client.begin();
        client.publish({
            destination: "/app/recieve",
            headers: { transaction: tx.id },
            body: fields.message
        })
        tx.commit();
        // API.post("/game/message", fields.message)
        //     .then(res => {
        //         console.log(res)
        //     })
    }, [fields.message, client]);
    
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
            <Form onSubmit={sendMessage}> 
                <Form.Label>Send Message</Form.Label>
                <Form.Control
                    id="message"
                    type="text"
                    autoFocus
                    value={fields.message}
                    onChange={ e => setField("message", e.target.value) }
                />
                <Button variant="outline-dark" type="submit">Send message</Button>
            </Form>
            <div>
                Last Message received: {props.message}
            </div>
        </>
    )
    
}

export default React.memo(Game);