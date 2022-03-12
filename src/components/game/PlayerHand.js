import React, { useState } from "react";
import Card from "./Card";
import { Modal, Button, Row, Col } from "react-bootstrap";
import { useUser } from "../../context/UserContext";
import { propTypes } from "react-bootstrap/esm/Image";
import axios from "axios";
import { usePOSTRequest } from "../hooks";
import { ROUND, QUEST, TOURNAMENT, WAITING_SPONSOR, WAITING_PLAYERS } from "../../util/constants";

function PlayerHand({ className, state, lobby, roundType, currentPlayer }) {
  const { user } = useUser();
  const player = state.players
    ? state.players.find((player) => player.id == user.id)
    : null;
  const cards = player && player.playerHand ? player.playerHand : [];
  const [selected, setSelected] = useState([]);

  const moveInfo =
    roundType == QUEST
      ? player.questInfo
      : roundType == TOURNAMENT
      ? player.tournamentInfo
      : null;

  const validateTurn = () => {
    return user.id === currentPlayer.id;
  };

  const isJoiningQuest = () => {
    return (
      validateTurn() &&
      roundType === QUEST &&
      state.quest.roundStatus === WAITING_PLAYERS
    );
  };

  const isJoiningTournament = () => {
    return (
      validateTurn() &&
      roundType === TOURNAMENT &&
      state.tournament.roundStatus === WAITING_PLAYERS
    );
  };

  const isEndOfQuestStage = () => {
    return (
      validateTurn() &&
      state.currentPlayer === state.sponsorIndex &&
      state.roundStatus == WAITING_PLAYERS
    );
  };

  const isSponsoringQuest = () => {
    return (
      validateTurn() &&
      roundType === QUEST &&
      state.quest.roundStatus === WAITING_SPONSOR
    );
  };

  const isDiscarding = () => {
    return cards && cards.length > 12;
  };

  function addToSelected(e, card) {
    e.preventDefault();
    var selectedSoFar = [...selected];
    if (selectedSoFar.indexOf(card) === -1) {
      selectedSoFar.push(card);
    } else {
      selectedSoFar = selectedSoFar.filter(function (ele) {
        return ele !== card;
      });
    }
    setSelected(selectedSoFar);
  }

  // basic check if player has enough cards to sponsor quest
  const canSponsor = (numStages) => {
    const validQuestStages = ["Foe", "Test"];
    const questCards = selected.filter((card) =>
      validQuestStages.includes(card.type)
    );
    const testCards = selected.filter((card) => card.type === "Test");
    console.log("questcards.length", questCards.length, "numstages", numStages);
    return questCards.length === numStages && testCards.length <= 1;
  };

  // if order of cards can be formed into quest stages
  // const canFormQuest = (cardList, numStages) => {
  function canFormQuest() {
    if (selected.length > 0) {
      if (selected[0].type === "Weapon") return false;
      var previous = null;
      var valid = true;
      selected.forEach((card) => {
        if (previous !== null) {
          if (previous.type === "Test" && card.type === "Weapon") valid = false;
        }
        previous = card;
      });

      // check if number of stages is valid
      if (valid) {
        valid =
          cardsToQuestStages().length ==
          state?.quest?.card?.questStages;
      }

      return valid;
    }
    return false;
  }

  const cardsToQuestStages = () => {
    var stages = [];
    var hand = [...selected];
    var stage = [];
    while (hand.length > 0) {
      const card = hand.shift();
      if (card.type === "Weapon") {
        stage.push(card.id);
      } else {
        if (stage.length > 0) stages.push(stage);
        stage = [card.id];
      }
    }
    return stages;
  };

  function getStyle(card) {
    const selectedSoFar = [...selected];
    var style = {
      width: "100%",
      transition: "250ms",
    };
    if (selectedSoFar.includes(card)) {
      style["boxShadow"] = "10px -10px 5px";
    }
    return style;
  }

  function renderDiscardModal() {
    return (
      <Modal
        centered
        dialogClassName="modalf"
        show={isDiscarding()}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Modal.Title>Discard: Maximum hand limit (12) exceeded. </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            {cards && cards.length > 0 ? (
              cards.map((card) => (
                <Col
                  key={card.id}
                  onClick={() =>
                    axios.post(`/game/round/discard`, {
                      data: card.id,
                      lobby: lobby,
                      playerId: user.id,
                    })
                  }
                >
                  <Card card={card} style={getStyle(card.id)} />
                </Col>
              ))
            ) : (
              <></>
            )}
          </Row>
        </Modal.Body>
      </Modal>
    );
  }

  function renderJoinQuestModal() {
    return (
      <Modal
        centered
        show={isJoiningQuest()}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Modal.Title>{`Join Quest?`} </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <Button
                onClick={usePOSTRequest("/quest/round/join", user.id, lobby)}
              >
                Yes
              </Button>
            </Col>
            <Col>
              <Button
                onClick={usePOSTRequest("/game/round/next", user.id, lobby)}
              >
                No
              </Button>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    );
  }

  function renderJoinTournamentModal() {
    return (
      <Modal
        centered
        show={isJoiningTournament()}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Modal.Title>{`Join Tournament?`} </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <Button
                onClick={usePOSTRequest(
                  "/tournament/round/join",
                  user.id,
                  lobby
                )}
              >
                Yes
              </Button>
            </Col>
            <Col>
              <Button
                onClick={usePOSTRequest("/game/round/next", user.id, lobby)}
              >
                No
              </Button>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    );
  }

  function renderHand() {
    const questCardTypes = ["Foe", "Weapon", "Test"];
    // todo: do we want to limit sponsor cards automatically?
    const availableCards = isSponsoringQuest()
      ? cards.filter((card) => questCardTypes.includes(card.type))
      : cards;
    // const availableCards = cards
    return (
      <Row>
        {availableCards && availableCards.length > 0 ? (
          availableCards.map((card) => (
            <Col key={card.id} onClick={(e) => addToSelected(e, card.id)}>
              <Card card={card} style={getStyle(card.id)} />
            </Col>
          ))
        ) : (
          <></>
        )}
      </Row>
    );
  }

  function getPlayUrl() {
    if (state.quest) {
      return "/quest/round/play";
    } else if (state.tournament) {
      return "/tournament/round/play";
    } else if (state.event) {
      return "/event/round/play";
    }
    return "/game/round/next";
  }


  return (
    <div className={className}>
      {renderJoinQuestModal()}
      {renderJoinTournamentModal()}
      {renderDiscardModal()}
      {renderHand()}
      {isSponsoringQuest() ? (
        <>
          <div style={{ position: "fixed", bottom: 0, left: 80 }}>
            <Button
              disabled={!validateTurn() || !canFormQuest()}
              onClick={usePOSTRequest(
                "/quest/round/sponsor", cardsToQuestStages(), lobby, user.id)}
              variant="outline-dark"
            >
              Sponsor
            </Button>
          </div>
          <div style={{ position: "fixed", bottom: 0, left: 0 }}>
            <Button
              variant="outline-dark"
              disabled={!validateTurn()}
              onClick={usePOSTRequest("/game/round/next", user.id, lobby)}
            >
              Decline
            </Button>
          </div>
        </>
      ) : (
        <>
            <div style={{ position: "fixed", bottom: 0, left: 80 }}>
                <Button
                    disabled={roundType == ROUND ? true : !validateTurn()} variant="outline-dark"
                    onClick={usePOSTRequest(
                        getPlayUrl(), selected, lobby, user.id)}>
                    Play
                </Button>
            </div>
            <div style={{ position: "fixed", bottom: 0, left: 10 }}>
            <Button
                disabled={!validateTurn()} variant="outline-dark"
                onClick={usePOSTRequest("/game/round/next", user.id, lobby)}>
                Pass
            </Button>
            </div>
        </>
      )}
    </div>
  );
}

export default PlayerHand;
