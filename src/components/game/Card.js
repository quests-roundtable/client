import React from "react";

export default function Card({ card, style, className = "card" }) {
  return (
    <img className={className} style={style} src={`http://localhost:3000/cards/${card.typeId}.png`} />
  )
}