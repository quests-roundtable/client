import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form} from "react-bootstrap";
import { useFields } from "../components/hooks";
import { setUsername } from "../components/SetUsername";
import { useUser } from "../context/userContext";


function JoinLobby(){

    var [fields, handleFieldChange] = useFields({
        lobbyName: "",
    });

    const { userId } = useUser();
    const navigate = useNavigate();

    // todo: lobby name validation? 

    function handleSubmit(){
        navigate(`/game/${lobbyName}`);
    }


    const joinGameLobby = useCallback(() => {
        if (userId) {
            fetch(
                // todo: join lobby endpoint
            ).then((res) => res.json()).then((lobby) => navigate(`/game/${lobby.id}`));
        }
    }, [userId, navigate]);

    return (
        <div>
            <SetUsername/>
            <Form onSubmit={handleSubmit}> 
                <Form.Label>Lobby Name</Form.Label>
                <FormControl
                    id="lobbyName"
                    autoFocus
                    value={fields.lobbyName}
                    onChange={handleFieldChange}
                />
                <Button type="submit">Join Lobby</Button>
            </Form>
        </div>
    )
}

export default JoinLobby;