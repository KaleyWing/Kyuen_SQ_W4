// ============================================================
// Week 4 Example 1: Multi-File Structure + Rock Paper Scissors
// ============================================================

// ------------------------------------------------------------
// ABOUT THIS FILE
// This project is split across three JavaScript files:
//
//   sketch.js — p5.js entry point: setup(), draw(), mousePressed()
//   game.js   — game logic: choices, results, state variables
//   scenes.js — drawing helpers: blobs, buttons, result text
//
// All three files are loaded in index.html in that order.
// Variables and functions defined in one file are available
// in all others because they share the same global scope.
// ------------------------------------------------------------

// ------------------------------------------------------------
// BLOB ANIMATION TIMERS
// Stored here in sketch.js because they drive the visuals
// but are not part of the game logic.
// Each timer increases every frame to animate the wobble.
// npcBlobT starts at 50 so the blobs wobble differently.
// ------------------------------------------------------------
let playerBlobT = 0;
let npcBlobT = 50;

// ------------------------------------------------------------
// BUTTON LAYOUT
// Shared constants for button position and size.
// Defined once here so sketch.js and scenes.js stay in sync.
// ------------------------------------------------------------
const BTN_Y = 340;
const BTN_W = 140;
const BTN_H = 50;

// ============================================================
// setup()
// Runs once at the very start of the sketch.
// Sets up the canvas and font.
// ============================================================
function setup() {
  createCanvas(800, 450);
  textFont("monospace");
}

// ============================================================
// draw()
// Runs repeatedly in a loop after setup() finishes.
// Calls drawing functions from scenes.js and reads game
// state variables from game.js to decide what to show.
// ============================================================
function draw() {
  // drawBackground() is defined in scenes.js
  drawBackground();

  // --- Player blob (teal, left side) ---
  // drawBlob() is defined in scenes.js
  drawBlob(220, 180, 50, color(0, 200, 180), playerBlobT);

  // --- NPC blob (orange, right side) ---
  drawBlob(580, 180, 50, color(255, 150, 30), npcBlobT);

  // --- Labels ---
  fill(180);
  noStroke();
  textAlign(CENTER);
  textSize(14);
  text("You", 220, 260);
  text("NPC", 580, 260);

  // playerChoice is defined in game.js
  // It is null before the player picks, and set to a choice after
  if (playerChoice !== null) {
    // Show what each side chose
    fill(200);
    textSize(18);
    text(playerChoice.toUpperCase(), 220, 300);
    text(npcChoice.toUpperCase(), 580, 300);

    // drawResultText() and drawButton() are defined in scenes.js
    drawResultText(roundResult);

    drawButton(
      width / 2,
      380,
      180,
      50,
      "Play Again",
      isMouseOver(width / 2, 380, 180, 50),
    );
  } else {
    // --- Choice buttons (only shown before player picks) ---
    let positions = [220, 400, 580]; // x positions for the 3 buttons
    let labels = ["ROCK", "PAPER", "SCISSORS"];

    for (let i = 0; i < 3; i++) {
      drawButton(
        positions[i],
        BTN_Y,
        BTN_W,
        BTN_H,
        labels[i],
        isMouseOver(positions[i], BTN_Y, BTN_W, BTN_H),
      );
    }

    // Prompt
    fill(160);
    textSize(14);
    textAlign(CENTER);
    text("Make your choice", width / 2, 290);
  }

  // Advance blob animations each frame
  playerBlobT += 0.015;
  npcBlobT += 0.015;
}

// ============================================================
// mousePressed()
// A built-in p5.js event function.
// Automatically called once every time the mouse is clicked.
// Checks which button was clicked and calls the appropriate
// game logic function from game.js.
// ============================================================
function mousePressed() {
  if (playerChoice === null) {
    // Check each choice button
    // ROCK, PAPER, SCISSORS constants are defined in game.js
    let positions = [220, 400, 580];
    let choices = [ROCK, PAPER, SCISSORS];

    for (let i = 0; i < 3; i++) {
      if (isMouseOver(positions[i], BTN_Y, BTN_W, BTN_H)) {
        // playerChoose() is defined in game.js
        // It sets playerChoice, npcChoice, and roundResult
        playerChoose(choices[i]);
      }
    }
  } else {
    // Play Again button — resetRound() is defined in game.js
    if (isMouseOver(width / 2, 380, 180, 50)) {
      resetRound();
    }
  }
}
