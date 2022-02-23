import React, {useCallback} from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button } from "react-bootstrap"
import { useUser } from "../context/UserContext";
import { SetUsername } from "../components/SetUsername";
import { Back } from "../components/Back";

function CreateLobby(){
    const { userId } = useUser();
    const navigate = useNavigate();

    const createGameLobby = useCallback(() => {
        if (userId) {
            // const params = {playerId: userId};
            const params = userId;
            fetch(
                `/game/create`, {method: "POST", body: params}
            ).then((res) => res.json()).then((res) => navigate(`/game/${res.game.id}`)).catch(err => alert(err));
        }
    }, [userId, navigate]);

    return (
        <Container>
            <Back/>
            <SetUsername/>
            <Button variant="outline-dark" type="submit" onClick={createGameLobby}>Create Lobby</Button>
        </Container>
    )
}

export default CreateLobby;