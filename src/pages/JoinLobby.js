import React, {useCallback} from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormControl} from "react-bootstrap";
import { useFields } from "../components/hooks";
import { SetUsername } from "../components/SetUsername";
import { useUser } from "../context/UserContext";
import { Back } from "../components/Back";

function JoinLobby(){

    var [fields, handleFieldChange] = useFields({
        lobbyName: "",
    });

    const { userId } = useUser();
    const navigate = useNavigate();

    // todo: lobby name validation? 

    function handleSubmit(){
        navigate(`/game/${fields.lobbyName}`);
    }


    const joinGameLobby = useCallback(() => {
        if (userId) {
            const params = {playerId: userId, gameId: fields.lobbyName}
            fetch(
                `localhost:9090/game/connect`, {method: "POST", body: params}
            ).then((res) => res.json()).then((lobby) => navigate(`/game/${lobby.id}`));
        }
    }, [userId, navigate, fields.lobbyName]);

    const joinRandomGameLobby = useCallback(()=>{
        if (userId) {
            const params = {playerId: userId}
            fetch(
                `localhost:9090/game/connect/random`, {method: "POST", body: params}
            ).then((res) => res.json()).then((lobby) => navigate(`/game/${lobby.id}`));
        }
    }, [userId, navigate]);

    return (
        <div>
            <Back>Home</Back>
            <SetUsername/>
            <Form onSubmit={handleSubmit}> 
                <Form.Label>Lobby Name</Form.Label>
                <FormControl
                    id="lobbyName"
                    autoFocus
                    value={fields.lobbyName}
                    onChange={handleFieldChange}
                />
                <Button variant="outline-dark" type="submit" onSubmit={joinGameLobby}>Join Lobby</Button>
            </Form>
            <Button variant="outline-dark" type="submit" onSubmit={joinRandomGameLobby}>Join Random Lobby</Button>
        </div>
    )
}

export default JoinLobby;