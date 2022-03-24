import React from "react";

export default function Card({ card, style, className = "card" }) {
  return (
    <img className={className} style={style} src={`/cards/${card.typeId}.png`} />
  )
}