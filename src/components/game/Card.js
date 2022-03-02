import React from "react";

export default function Card({ card, style }) {

  console.log(process.env.PUBLIC_URL);

  return (
    <img className="card" style={style} src={`${process.env.PUBLIC_URL}/cards/${card.type}.png`} />
  )
}