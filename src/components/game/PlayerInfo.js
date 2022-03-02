import React from "react";

function PlayerInfo({className, players}) {
    return(
        <div className={className} style={{borderColor: "red"}}>
            {players.map((player, index) => {
                return(
                    <div key={index} style={{listStyleType: "none", margin: "10px 10px"}}>
                        <li key='0'>{player.name}</li>
                        <li key='1'>{player.shields}</li>
                    </div>
                )
            })}
        </div>
    )
}

export default PlayerInfo;