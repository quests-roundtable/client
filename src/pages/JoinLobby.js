import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button, InputGroup, FormControl } from "react-bootstrap";
import { useFields } from "../components/hooks";
import { SetUsername } from "../components/SetUsername";
import { useUser } from "../context/UserContext";
import { Back } from "../components/Back";
import "../styles/lobby.css"
import axios from "axios";

function JoinLobby() {

    var [fields, handleFieldChange] = useFields({
        lobbyName: "",
    });

    const { userId } = useUser();
    const navigate = useNavigate();

    const joinGameLobby = useCallback(() => {
        if (userId) {
            const params = { userId: userId, gameId: fields.lobbyName }
            axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/game/connect`, params
            ).then(
                (res) => res.data
            ).then(
                (lobby) => navigate(`/game/${lobby.game.id}`, { state: lobby.game })
            ).catch((err) => alert(`Error ${err?.response?.status}: ${err?.response?.data?.message}`))
        }
    }, [userId, navigate, fields.lobbyName]);

    const joinRandomGameLobby = useCallback(() => {
        if (userId) {
            const params = { userId: userId, gameId: null }
            console.log(userId)
            axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/game/connect/random`, params
            ).then(
                (res) => res.data
            ).then(
                (lobby) => navigate(`/game/${lobby.game.id}`, { state: lobby.game })
            ).catch((err) => alert(`Error ${err?.response?.status}: ${err?.response?.data?.message}`))
        }
    }, [userId, navigate]);

    function validateForm() {
        return fields.lobbyName.length === 4;
    }

    return (
        <div className="lobby-div">
            <div>
                <Back className="back-bt" />
                <h2 className="lobby-margin"><b>Lobby</b></h2>
            </div>
            <SetUsername />
            <div style={{ width: "40vw", margin: "5px auto" }}>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">Lobby Id</InputGroup.Text>
                    <FormControl
                        id="lobbyName"
                        placeholder="4-digit lobbyId"
                        aria-label="lobbyName"
                        aria-describedby="basic-addon1"
                        value={fields.lobbyName}
                        onChange={handleFieldChange}
                    />
                    <Button disabled={!validateForm()} variant="outline-dark" type="submit" onClick={joinGameLobby}>
                        Join Lobby</Button>
                </InputGroup>
            </div>
            <Button className="lobby-bt" variant="outline-dark" type="submit" onClick={joinRandomGameLobby}>
                Join Random Lobby</Button>
        </div>
    )
}

export default JoinLobby;