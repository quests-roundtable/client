import React, {useState, useEffect} from "react";
import {Back} from "../components/Back";
import axios from "axios";
axios.defaults.withCredentials = true;

function Health() {
    const [health, setHealth] = useState("down");
    useEffect(() => {
        async function onLoad() {
            getHealth();
          }
          onLoad();
    })
    const getHealth = async () => {
        fetch (`http://localhost:9090/actuator/health`, {mode: 'no-cors'}).then((res) => {
            console.log(res);
            setHealth(res.status === 0 ? "up": "down");
        }).catch(err => alert(err));
        // const res = axios(`http://localhost:9090/actuator/health`);
        // setHealth(res.status);
      }


    return (
        <div>
            <Back/>
            {health}
        </div>
    )

}

export default Health;