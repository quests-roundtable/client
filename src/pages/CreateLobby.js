import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button } from "react-bootstrap"
import { useUser } from "../context/userContext";
import { SetUsername} from "../components/SetUsername";

function CreateLobby(){
    const { userId } = useUser();
    const navigate = useNavigate();

    const createGameLobby = useCallback(() => {
        if (userId) {
            fetch(
                // todo: create lobby endpoint
            ).then((res) => res.json()).then((lobby) => navigate(`/game/${lobby.id}`));
        }
    }, [userId, navigate]);

    return (
        <Container>
            <SetUsername/>
            <Button title="Create Lobby" onClick={createGameLobby}/>
        </Container>
    )
}

export default CreateLobby;