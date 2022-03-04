import React, {useState, useEffect} from "react";
import {Back} from "../components/Back";
import axios from "axios";
import "../styles/lobby.css"

function Health() {
    const [health, setHealth] = useState("down");
    useEffect(() => {
        async function onLoad() {
            getHealth();
          }
          onLoad();
    })
    const getHealth = async () => {
        axios.get(`/actuator/health`).then((res) => {
            console.log(res);
            setHealth(res.status === 200 ? "up": "down");
        }).catch(err => alert(err));
        // const res = axios(`http://localhost:9090/actuator/health`);
        // setHealth(res.status);
      }


    return (
        <div className="lobby-div">
            <div className="grid-div">
                <Back className="back-bt"/>
                <h3 className="lobby-margin"><b>Server is {health}.</b></h3>
            </div>
        </div>
    )

}

export default Health;