import React, {  useEffect, useRef } from "react"

import { Button, Modal, Row } from "react-bootstrap";

import "../../styles/game-layout.css"

const Logs= ({ messages }) => {
    const messagesEndRef = useRef(null);
    const scrollToBottom = () => {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    };
    useEffect(scrollToBottom, [messages]);
    
    //
    return (
      <div>
        <Button variant="outline-dark" onClick={()=> scrollToBottom()}>Scroll to Bottom</Button>
        {messages.map((message, idx) => (
          <div key={idx}>{message}</div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    );
  };

export default React.memo(Logs);