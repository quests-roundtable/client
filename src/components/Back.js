import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

export function Back() {
  const navigate = useNavigate();

  return (
    <Button variant="outline-dark" onClick={() => navigate(`/`)}>
      {`Back `}
    </Button>
  );
}
