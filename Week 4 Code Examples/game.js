// ============================================================
// game.js: Game Logic
// ============================================================
// This file contains all game logic for Rock Paper Scissors.
// It does not draw anything — drawing is handled by scenes.js.
// Variables defined here are available in sketch.js and scenes.js
// because all files share the same global scope.
// ============================================================

// ------------------------------------------------------------
// CHOICES
// We define the three choices as constants so we never have
// to type the strings "rock", "paper", "scissors" manually
// and risk a typo causing a bug.
// CHOICES is an array used to pick a random NPC move.
// ------------------------------------------------------------
const ROCK     = "rock";
const PAPER    = "paper";
const SCISSORS = "scissors";

const CHOICES = [ROCK, PAPER, SCISSORS];

// ------------------------------------------------------------
// GAME STATE
// These variables track the current choices and result.
// They start as null so sketch.js knows no round is in progress.
// ------------------------------------------------------------
let playerChoice = null; // set when player clicks a button
let npcChoice    = null; // set randomly when player chooses
let roundResult  = null; // "win", "lose", or "draw"

// ------------------------------------------------------------
// getNPCChoice()
// Picks a random choice for the NPC each round.
// random(array) returns a random element from the array.
// ------------------------------------------------------------
function getNPCChoice() {
  return random(CHOICES);
}

// ------------------------------------------------------------
// getResult(player, npc)
// Works out who wins given the two choices.
// Returns "win", "lose", or "draw".
//
// Win conditions are written out explicitly — no clever maths,
// just clear readable comparisons that are easy to follow.
// ------------------------------------------------------------
function getResult(player, npc) {
  if (player === npc) return "draw";

  if (
    (player === ROCK     && npc === SCISSORS) ||
    (player === PAPER    && npc === ROCK)     ||
    (player === SCISSORS && npc === PAPER)
  ) {
    return "win";
  }

  return "lose";
}

// ------------------------------------------------------------
// playerChoose(choice)
// Called from sketch.js when the player clicks a button.
// Sets the player and NPC choices, then works out the result.
// ------------------------------------------------------------
function playerChoose(choice) {
  playerChoice = choice;
  npcChoice    = getNPCChoice();
  roundResult  = getResult(playerChoice, npcChoice);
}

// ------------------------------------------------------------
// resetRound()
// Called from sketch.js when the Play Again button is clicked.
// Clears all choices so a new round can begin.
// ------------------------------------------------------------
function resetRound() {
  playerChoice = null;
  npcChoice    = null;
  roundResult  = null;
}
