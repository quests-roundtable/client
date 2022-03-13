import React, { useCallback, useState } from "react";
import Card from "./Card";
import { Modal, Button, Row, Col } from "react-bootstrap";
import { useUser } from "../../context/UserContext";
import { propTypes } from "react-bootstrap/esm/Image";
import axios from "axios";
import { usePOSTRequest } from "../hooks";
import {
  ROUND,
  QUEST,
  TOURNAMENT,
  WAITING_SPONSOR,
  WAITING_PLAYERS,
  SPONSOR,
  PLAYER,
} from "../../util/constants";

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
      if (selected.filter((card) => card.type === "Test").length > 1) return false;
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
        valid = cardsToQuestStages().length == state?.quest?.card?.questStages;
      }

      return valid;
    }
    return false;
  }

  const cardsToQuestStages = () => {
    var stages = [];
    var stage = [];
    var hand = [...selected];
    if (hand.length === 0) return [];

    // for debugging
    var nameStages = [];
    var nameStage = [];

    while (hand.length > 0) {
      const card = hand.shift();
      if (card.type === "Weapon") {
        stage.push(card.id);
        nameStage.push(card.name);
      } else {
        if (stage.length > 0) {
          stages.push(stage);
          nameStages.push(nameStage);
        }
        stage = [card.id];
        nameStage = [card.name];
      }
    }
    if (stage.length > 0) {
      stages.push(stage);
      nameStages.push(nameStage);
    }

    console.log("Quest Stage:", nameStages);
    console.log("Payload: ", stages);

    return stages;
  };

  function getStyle(card) {
    const selectedSoFar = [...selected];
    var style = {
      width: "5vw",
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
      <Modal centered show={isJoiningQuest()} backdrop="static" keyboard={false}>
        <Modal.Header style={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
          <Modal.Title>{`Join Quest?`} </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
          <Row>
            <Col>
              <Button variant="outline-dark"
                onClick={usePOSTRequest("/quest/round/join", true, lobby, user.id)}>
                Yes
              </Button>
            </Col>
            <Col>
              <Button variant="outline-dark"
                onClick={usePOSTRequest("/quest/round/join", false, lobby, user.id)}>
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
      <Modal centered show={isJoiningTournament()} backdrop="static" keyboard={false}>
        <Modal.Header style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Modal.Title>{`Join Tournament?`} </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
          <Row>
            <Col>
              <Button variant="outline-dark"
                onClick={usePOSTRequest("/tournament/round/join", true, lobby, user.id)}>
                Yes
              </Button>
            </Col>
            <Col>
              <Button variant="outline-dark"
                onClick={usePOSTRequest("/tournament/round/join", false, lobby, user.id)}>
                No
              </Button>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    );
  }

  function renderHand() {
    const sponsorQuestCardTypes = ["Foe", "Weapon", "Test"];
    const playingQuestCardTypes = ["Weapon", "Ally", "Amour"];

    var availableCards = [];
    if(validateTurn()) {
      if (isSponsoringQuest() && validateTurn()) {
        availableCards = cards.filter((card) =>
          sponsorQuestCardTypes.includes(card.type)
        );
      } else if (player.questInfo?.role === PLAYER) {
        availableCards = cards.filter((card) =>
          playingQuestCardTypes.includes(card.type)
        );
      } else {
        availableCards = cards;
      }
    } else {
      availableCards = cards;
    }
    return (
      <Row>
        {availableCards && availableCards.length > 0 ? (
          availableCards.map((card) => (
            <Col key={card.id} onClick={(e) => addToSelected(e, card)}>
              <Card card={card} style={getStyle(card)} />
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
  
  function POSTRequest(url, object, lobby, playerId = null) {
    setSelected([]);
    axios.post(url, 
          playerId ? 
          { data: object, 
            lobby: lobby,
            playerId: playerId}
          : { data: object, 
            lobby: lobby}
          ).then(res => {
            console.log(res)
          }).catch(err => {
            alert(`Error ${err?.response?.status}: ${err?.response?.data?.message}`)
          });
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
              onClick={() => POSTRequest(
                "/quest/round/sponsor", cardsToQuestStages(), lobby, user.id
              )}
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
              disabled={
                roundType == ROUND
                  ? true
                  : (!validateTurn() || player.questInfo?.role === SPONSOR)
              }
              variant="outline-dark"
              onClick={() => POSTRequest(
                getPlayUrl(),
                selected.map((card) => card.id),
                lobby,
                user.id
              )}
            >
              Play
            </Button>
          </div>
          <div style={{ position: "fixed", bottom: 0, left: 10 }}>
            <Button
              disabled={!validateTurn()}
              variant="outline-dark"
              onClick={usePOSTRequest("/game/round/next", user.id, lobby)}
            >
              Pass
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default PlayerHand;
