// ============================================================
// scenes.js: Drawing Functions
// ============================================================
// This file contains all drawing helper functions.
// It does not contain any game logic — that lives in game.js.
// Functions defined here are available in sketch.js because
// all files share the same global scope.
// ============================================================

// ------------------------------------------------------------
// drawBackground()
// A simple dark background drawn every frame in draw().
// Calling background() every frame clears the previous frame,
// which is what creates the illusion of animation.
// ------------------------------------------------------------
function drawBackground() {
  background(10);
}

// ------------------------------------------------------------
// drawBlob(x, y, r, col, t)
// Draws a noise blob at the given position and size.
// Called with different arguments for the player and NPC blobs.
//
// x, y — centre position of the blob
// r    — radius of the blob
// col  — p5 color object (e.g. color(0, 200, 180))
// t    — animation time; increases each frame to drive the wobble
// ------------------------------------------------------------
function drawBlob(x, y, r, col, t) {
  push();
  fill(col);
  noStroke();

  beginShape();
  let numPoints = 48; // more points = smoother shape
  for (let i = 0; i < numPoints; i++) {
    let angle = (TWO_PI / numPoints) * i;

    // noise() returns a smooth random value between 0 and 1.
    // We use it to push each vertex slightly in or out.
    let noiseVal = noise(cos(angle) * 0.8 + t, sin(angle) * 0.8 + t);

    // map() converts noise (0–1) to a radius offset (-8 to +8 pixels)
    let nr = r + map(noiseVal, 0, 1, -8, 8);

    // Convert polar coordinates (angle, radius) to x/y
    vertex(x + cos(angle) * nr, y + sin(angle) * nr);
  }
  endShape(CLOSE);

  // Eyes
  fill(10);
  ellipse(x - 9, y - 7, 8, 8);
  ellipse(x + 9, y - 7, 8, 8);

  pop();
}

// ------------------------------------------------------------
// drawButton(x, y, w, h, label, isHovered)
// Draws a rectangular button with a text label.
// isHovered changes the colour when the mouse is over it,
// giving visual feedback that the button is clickable.
//
// x, y        — centre position (uses rectMode(CENTER))
// w, h        — width and height of the button
// label       — text displayed inside the button
// isHovered   — true if the mouse is currently over the button
// ------------------------------------------------------------
function drawButton(x, y, w, h, label, isHovered) {
  push();
  rectMode(CENTER); // x, y are the centre of the rectangle

  // Button background — lighter colour when hovered
  fill(isHovered ? color(80, 80, 100) : color(40, 40, 60));
  stroke(isHovered ? color(180, 180, 220) : color(80, 80, 100));
  strokeWeight(2);
  rect(x, y, w, h, 8); // rounded corners

  // Button label — centred inside the button
  fill(255);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(18);
  text(label, x, y);

  pop();
}

// ------------------------------------------------------------
// isMouseOver(x, y, w, h)
// Returns true if the mouse cursor is currently inside the
// rectangle defined by centre (x, y) and dimensions (w, h).
// Used alongside drawButton() to detect clicks.
// ------------------------------------------------------------
function isMouseOver(x, y, w, h) {
  return (
    mouseX > x - w / 2 &&
    mouseX < x + w / 2 &&
    mouseY > y - h / 2 &&
    mouseY < y + h / 2
  );
}

// ------------------------------------------------------------
// drawResultText(result)
// Draws the round result in the centre of the canvas.
// result is "win", "lose", or "draw" — set in game.js.
// ------------------------------------------------------------
function drawResultText(result) {
  push();
  textAlign(CENTER, CENTER);
  noStroke();

  if (result === "win") {
    fill(0, 220, 180);
    textSize(48);
    text("You Win!", width / 2, height / 2 - 20);
  } else if (result === "lose") {
    fill(255, 120, 30);
    textSize(48);
    text("You Lose!", width / 2, height / 2 - 20);
  } else {
    fill(220, 220, 220);
    textSize(48);
    text("Draw!", width / 2, height / 2 - 20);
  }

  pop();
}
