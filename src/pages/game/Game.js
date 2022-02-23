import React, {useState, useCallback} from "react"
import { useSocket } from "../../context/SocketContext";
import { useUser } from "../../context/UserContext";
import { useFields } from "../../components/hooks";
import { Button, Input} from "react-bootstrap";
import {
    useStompClient,
    useSubscription
  } from "react-stomp-hooks";

function Game(gameState) {
    const [lastMessage, setLastMessage] = useState("No message received yet");
    var [fields, handleFieldChange] = useFields({
        message: "message 100",
    });
    const { user } = useUser();

    const stompClient = useStompClient();
    useSubscription("/topic/messages", (message) => setLastMessage(message.body));

    const sendMessage = useCallback(() => {
        console.log("Sending message")
        stompClient.publish({
            destination: "/app/receive",
            body: "Echo message"
          });
    }, [fields.message])
    
    
    return (
        
        <div>
            Last Message received: {lastMessage}
        </div>
        // </>
        // <>
        //     <Form onSubmit={handleSubmit}> 
        //     <Form.Label>Send Message</Form.Label>
        //     <FormControl
        //         id="message"
        //         autoFocus
        //         value={fields.message}
        //         onChange={handleFieldChange}
        //     />
        //     <Button variant="outline-dark" type="submit" onSubmit={sendMessage}>Send message</Button>
        //     </Form>
        //     <div>
        //         Last Message received: {lastMessage}
        //     </div>
        // </>
    )
    
}

export default Game;