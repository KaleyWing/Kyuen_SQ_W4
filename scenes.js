// ============================================================
// scenes.js: Drawing Functions
// ============================================================

// ------------------------------------------------------------
// drawBackground()
// Pink mall gradient sky.
// ------------------------------------------------------------
function drawBackground() {
  // Top to bottom gradient: deep pink → soft pink
  for (let y = 0; y < height; y++) {
    let c = lerpColor(color(80, 10, 50), color(200, 80, 140), y / height);
    stroke(c);
    line(0, y, width, y);
  }
  noStroke();
}

// ------------------------------------------------------------
// drawStoryPanel(scene)
// Draws the white card with the scene title and body text.
// scene is the object returned by getCurrentScene() in game.js.
// ------------------------------------------------------------
function drawStoryPanel(scene) {
  push();

  // Card background
  fill(255, 245, 250, 230);
  noStroke();
  rect(40, 20, width - 80, 200, 12);

  // Title
  fill(160, 20, 80);
  textFont("monospace");
  textSize(18);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  text(scene.title, 60, 36);

  // Body — wrapped inside the card
  fill(60, 20, 40);
  textSize(13);
  textStyle(NORMAL);
  textLeading(20);
  text(scene.body, 60, 66, width - 120, 160);

  pop();
}

// ------------------------------------------------------------
// drawChoiceButtons(scene)
// Draws one button per choice in the current scene.
// ------------------------------------------------------------
function drawChoiceButtons(scene) {
  let btnW = 300;
  let btnH = 44;
  let startY = 250;
  let gap = 54;

  for (let i = 0; i < scene.choices.length; i++) {
    let bx = width / 2;
    let by = startY + i * gap;
    let hovered = isMouseOverBtn(bx, by, btnW, btnH);

    drawOneButton(bx, by, btnW, btnH, scene.choices[i].label, hovered);
  }
}

// ------------------------------------------------------------
// drawOneButton(x, y, w, h, label, isHovered)
// Draws a single pink-themed button centred at (x, y).
// ------------------------------------------------------------
function drawOneButton(x, y, w, h, label, isHovered) {
  push();
  rectMode(CENTER);
  fill(isHovered ? color(220, 60, 120) : color(180, 30, 90));
  noStroke();
  rect(x, y, w, h, 8);

  fill(255);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(14);
  textFont("monospace");
  textStyle(NORMAL);
  text(label, x, y);
  pop();
}

// ------------------------------------------------------------
// isMouseOverBtn(x, y, w, h)
// Returns true if the mouse is inside the rectangle
// centred at (x, y) with size (w, h).
// ------------------------------------------------------------
function isMouseOverBtn(x, y, w, h) {
  return (
    mouseX > x - w / 2 &&
    mouseX < x + w / 2 &&
    mouseY > y - h / 2 &&
    mouseY < y + h / 2
  );
}
