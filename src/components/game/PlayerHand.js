import React, { useState } from "react";
import Card from "./Card";
import { Modal, Button, Row, Col } from "react-bootstrap";
import { useUser } from "../../context/UserContext";
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
  IN_PROGRESS,
  TEST_STAGE,
  MORDRED
} from "../../util/constants";
import QuestSetup from "./QuestSetup";

function PlayerHand({ className, state, lobby, roundType, currentPlayer }) {
  const { user } = useUser();
  const player = state.players
    ? state.players.find((player) => player.id == user.id)
    : null;
  const cards = player && player.playerHand ? player.playerHand : [];
  const [selected, setSelected] = useState([]);
  const [showSetup, setShowSetup] = useState(false);
  const [showMordred, setShowMordred] = useState(false);
  const handleCloseMordred = () => setShowMordred(false);
  const handleShowMordred = () => setShowMordred(true);

  const moveInfo =
    roundType == QUEST
      ? player.questInfo
      : roundType == TOURNAMENT
        ? player.tournamentInfo
        : null;

  const validateTurn = () => {
    return user.id === currentPlayer.id;
  };

  const isPlayable = () => {
    return (state.quest?.roundStatus === IN_PROGRESS || state.tournament?.roundStatus === IN_PROGRESS
      || state.quest?.roundStatus === TEST_STAGE) && selected.length > 0;
  }

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
                    axios.post(`${process.env.REACT_APP_BACKEND_URL}/game/round/discard`, {
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
        <Modal.Header style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Modal.Title>{`Join Quest?`} </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
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
        <Modal.Body style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
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


  const canMordred = () => {
    return validateTurn && cards.filter(card => card.typeId == MORDRED).length > 0
  }

  function renderMordredModal() {
    var allyCards = []
    // get ally cards from all other players

    const opponents = state.players.filter(player => player.id !== user.id);
    const currentPlayer = state.players.filter(player => player.id === user.id)[0];
    const mordred = currentPlayer?.playerHand?.find(card => card.typeId == MORDRED);

    for (const opponent of opponents) {
      for (const specialCard of opponent.specialCards) {
        if (specialCard.type == "Ally") {
          allyCards.push({ card: specialCard, playerId: opponent.id })
        }
      }
    }
    return (
      <Modal centered show={showMordred} onHide={handleCloseMordred}>
        <Modal.Header style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Modal.Title>{`Mordred: Select opponent Ally to remove.`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            {allyCards && allyCards.length > 0 ? (
              allyCards.map((allyCard) => (
                <Col
                  key={allyCard.card.id}
                  onClick={() => {
                    axios.post(`${process.env.REACT_APP_BACKEND_URL}/game/round/mordred`, {
                      data: allyCard.card.id + "#" + mordred.id + "#" + allyCard.playerId,
                      lobby: lobby,
                      playerId: user.id,
                    })
                    handleCloseMordred();
                  }

                  }
                >
                  <Card card={allyCard.card} style={getStyle(allyCard.card.id)} />
                </Col>
              ))
            ) : (
              <>No opponent Ally cards in play. </>
            )}
          </Row>
        </Modal.Body>
      </Modal>
    )
  }

  function renderHand() {
    const playingQuestCardTypes = ["Weapon", "Ally", "Amour"];

    var availableCards = [];
    if (validateTurn()) {
      if ((player.questInfo?.role === PLAYER && state.quest.roundStatus === IN_PROGRESS)
        || roundType === TOURNAMENT) {
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
      if (state.quest.roundStatus === TEST_STAGE) { return "/quest/round/bid"; }
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
    axios.post(`${process.env.REACT_APP_BACKEND_URL}${url}`,
      playerId ?
        {
          data: object,
          lobby: lobby,
          playerId: playerId
        }
        : {
          data: object,
          lobby: lobby
        }
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
      {canMordred() ? <div style={{ position: "fixed", bottom: 40, left: 10 }}>
        <Button
          variant="outline-dark"
          disabled={!validateTurn() || !canMordred()}
          onClick={handleShowMordred}
        >
          Mordred
        </Button>
      </div> : <></>}

      {renderMordredModal()}
      {isSponsoringQuest() ? (
        <>
          <QuestSetup state={state} lobby={lobby} player={player} showSetup={showSetup}
            setShowSetup={setShowSetup} />
          <div style={{ position: "fixed", bottom: 0, left: 80 }}>
            <Button
              disabled={!validateTurn()}
              onClick={(() => setShowSetup(true))}
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
                  : (!validateTurn() || player.questInfo?.role === SPONSOR || !isPlayable())
              }
              variant="outline-dark"
              onClick={() => POSTRequest(
                getPlayUrl(),
                selected.map((card) => card.id),
                lobby,
                user.id
              )}
            >
              {(state.quest?.roundStatus === TEST_STAGE && validateTurn()) ? "Bid" : "Play"}
            </Button>
          </div>
          <div style={{ position: "fixed", bottom: 0, left: 10 }}>
            <Button
              disabled={!validateTurn()}
              variant="outline-dark"
              onClick={usePOSTRequest(
                (state.quest?.roundStatus === TEST_STAGE ? "/quest/round/test/pass"
                  : "/game/round/next"),
                user.id, lobby)}
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
