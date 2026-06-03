// ============================================================
// sketch.js: p5.js Entry Point
// ============================================================

let blobT = 0; // animation timer for Lily's blob

// ============================================================
// setup() — runs once
// ============================================================
function setup() {
  createCanvas(600, 420);
  textFont("monospace");
}

// ============================================================
// draw() — runs every frame
// ============================================================
function draw() {
  // drawBackground() is in scenes.js
  drawBackground();

  // Draw Lily (the player's blob) — top right corner, small
  drawBlob(width - 60, 60, 30, color(255, 180, 210), blobT);

  // Label under Lily
  fill(255, 200, 230);
  noStroke();
  textAlign(CENTER);
  textSize(11);
  text("Lily", width - 60, 100);

  // getCurrentScene() is in game.js — returns the right scene object
  let scene = getCurrentScene();

  // drawStoryPanel() and drawChoiceButtons() are in scenes.js
  drawStoryPanel(scene);
  drawChoiceButtons(scene);

  // Advance blob wobble
  blobT += 0.015;
}

// ============================================================
// mousePressed() — fires on every click
// ============================================================
function mousePressed() {
  let scene = getCurrentScene();

  let btnW = 300;
  let btnH = 44;
  let startY = 250;
  let gap = 54;

  for (let i = 0; i < scene.choices.length; i++) {
    let bx = width / 2;
    let by = startY + i * gap;

    // isMouseOverBtn() is in scenes.js
    if (isMouseOverBtn(bx, by, btnW, btnH)) {
      // handleChoice() is in game.js
      handleChoice(i);
    }
  }
}
