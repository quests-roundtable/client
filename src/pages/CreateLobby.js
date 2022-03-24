import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap"
import { useUser } from "../context/UserContext";
import { SetUsername } from "../components/SetUsername";
import { Back } from "../components/Back";
import "../styles/lobby.css"

function CreateLobby() {
    const { userId } = useUser();
    const navigate = useNavigate();

    const createGameLobby = useCallback(() => {
        if (userId) {
            const params = userId;
            fetch(
                `/game/create`, { method: "POST", body: params }
            ).then((res) => res.json()).then((res) => navigate(`/game/${res.game.id}`, { state: res.game }))
                .catch(err => alert(err));
        }
    }, [userId, navigate]);

    return (
        <div className="lobby-div">
            <div>
                <Back className="back-bt" />
                <h2 className="lobby-margin"><b>Lobby</b></h2>
            </div>
            <SetUsername />
            <Button className="lobby-bt" variant="outline-dark" type="submit" onClick={createGameLobby}>
                Create Lobby</Button>
        </div>
    )
}

export default CreateLobby;