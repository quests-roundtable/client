import React from "react";

export default function Card({type}){
    // console.log(`../../cards/${type}.jpg`);
    console.log(process.env.PUBLIC_URL);
    return(
        <img style={{"width": "100%"}}src={`${process.env.PUBLIC_URL}/cards/${type}.jpg`} />
        // <h1>test</h1>
    )
}