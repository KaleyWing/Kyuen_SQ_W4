// ============================================================
// scenes.js: Drawing Functions
// ============================================================

// ------------------------------------------------------------
// drawBackground()
// Pink mall background image with a soft pink overlay.
// ------------------------------------------------------------
function drawBackground() {
  if (mallBg) {
    push();
    tint(255, 180); // 70% opacity
    image(mallBg, 0, 0, width, height);
    pop();
  }

  // Top to bottom gradient overlay: deep pink → soft pink
  push();
  for (let y = 0; y < height; y++) {
    let c = lerpColor(color(80, 10, 50), color(200, 80, 140), y / height);
    stroke(red(c), green(c), blue(c), 100);
    line(0, y, width, y);
  }
  pop();
}

// ------------------------------------------------------------
// drawStoryPanel(scene)
// Draws the white card with the scene title and body text.
// scene is the object returned by getCurrentScene() in game.js.
// ------------------------------------------------------------
function drawStoryPanel(scene) {
  push();

  // Card background
  // Responsive margins and panel height
  let margin = min(40, width * 0.06);
  let panelY = margin;
  let panelH = min(220, height * 0.35);

  fill(255, 245, 250, 230);
  noStroke();
  rect(margin, panelY, width - margin * 2, panelH, 12);

  // Title
  fill(160, 20, 80);
  textFont("monospace");
  textSize(max(14, min(22, width * 0.03)));
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  text(scene.title, margin + 20, panelY + 16);

  // Body — wrapped inside the card
  fill(60, 20, 40);
  textSize(max(12, min(16, width * 0.02)));
  textStyle(NORMAL);
  textLeading(20);
  text(
    scene.body,
    margin + 20,
    panelY + 44,
    width - margin * 2 - 40,
    panelH - 56,
  );

  pop();
}

// ------------------------------------------------------------
// drawChoiceButtons(scene)
// Draws one button per choice in the current scene.
// ------------------------------------------------------------
function drawChoiceButtons(scene) {
  let margin = min(40, width * 0.06);
  let panelH = min(220, height * 0.35);
  let btnW = min(300, width * 0.5);
  let btnH = max(40, min(60, height * 0.08));
  let startY = margin + panelH + 30;
  let gap = btnH + 10;

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
