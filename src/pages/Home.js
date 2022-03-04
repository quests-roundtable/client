import { useNavigate } from "react-router-dom";
import React from "react";
import { Button } from "react-bootstrap";
import "../styles/home.css"

function Home() {
    const navigate = useNavigate();

    return (
        <div className="home-div">
            <h1><b>Quests of the Round Table</b></h1>
            <Button className="home-bt" onClick={() => navigate("/create")} variant="outline-dark">
                Create Lobby</Button>
            <Button className="home-bt" onClick={() => navigate("/join")} variant="outline-dark">
                Join Lobby</Button>
            <Button className="home-bt" onClick={()=>navigate("/health")} variant="outline-dark">
                Health Check</Button>
        </div>
    )

}

export default Home;