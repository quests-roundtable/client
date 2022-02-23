import { useNavigate } from "react-router-dom";
import React from "react";
import { Button } from "react-bootstrap";

function Home() {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Quests of the Round Table</h1>
            <Button onClick={() => navigate("/create")} variant="outline-dark">Create Lobby</Button>
            <Button onClick={() => navigate("/join")} variant="outline-dark">Join Lobby</Button>
            <Button onClick={()=>navigate("/health")} variant="outline-dark">Health Check</Button>
        </div>
    )

}

export default Home;