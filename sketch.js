// ============================================================
// sketch.js: p5.js Entry Point
// ============================================================

let mallBg;
let fsButton;

function preload() {
  mallBg = loadImage(
    "assets/images/Pink Mall.webp",
    () => {},
    (err) => {
      console.warn("Failed to load Pink Mall.webp:", err);
      mallBg = null;
    },
  );
}

// ============================================================
// setup() — runs once
// ============================================================
function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont("monospace");
  // Fullscreen button (user gesture required by browsers)
  fsButton = createButton("Enter Fullscreen");
  fsButton.style("padding", "8px 12px");
  fsButton.style("background", "#c84a79");
  fsButton.style("color", "#fff");
  fsButton.style("border", "none");
  fsButton.style("border-radius", "6px");
  fsButton.position(windowWidth - 160, 12);
  fsButton.mousePressed(() => {
    let isFs = fullscreen();
    if (!isFs) {
      fullscreen(true);
      fsButton.hide();
    } else {
      fullscreen(false);
      fsButton.html("Enter Fullscreen");
    }
  });
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  if (fsButton) fsButton.position(windowWidth - 160, 12);
}

function keyPressed() {
  if (key === "f" || key === "F") {
    fullscreen(!fullscreen());
    if (fullscreen()) fsButton && fsButton.hide();
    else fsButton && fsButton.show();
  }
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
  // Compute same responsive button metrics as in drawChoiceButtons()
  let margin = min(40, width * 0.06);
  let panelH = min(220, height * 0.35);
  let btnW = min(300, width * 0.5);
  let btnH = max(40, min(60, height * 0.08));
  let startY = margin + panelH + 30;
  let gap = btnH + 10;

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
