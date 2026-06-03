// ============================================================
// sketch.js: p5.js Entry Point
// ============================================================

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

  // getCurrentScene() is in game.js — returns the right scene object
  let scene = getCurrentScene();

  // drawStoryPanel() and drawChoiceButtons() are in scenes.js
  drawStoryPanel(scene);
  drawChoiceButtons(scene);
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
