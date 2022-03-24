import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

export function Back() {
  const navigate = useNavigate();

  return (
    <Button style={{ margin: "5px 10px" }} variant="outline-dark" onClick={() => navigate(`/`)}>
      {`Back `}
    </Button>
  );
}
