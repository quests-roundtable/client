import React from "react";

export default function Card({ card, style }) {

  // console.log(process.env.PUBLIC_URL);

  return (
    <img className="card" style={style} src={`http://localhost:3000/cards/${card.typeId}.png`} />
  )
}