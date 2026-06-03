# Week 4 Example 1: Multi-File Structure + Rock Paper Scissors

## What This Example Demonstrates

> **Note for students:** This section is included in example files only to help you study. Do not include it in your Side Quest submissions.

This example introduces multi-file structure by splitting a Rock Paper Scissors game across three JavaScript files, each with a clear responsibility.

- **Multi-file structure** — `sketch.js` handles the p5.js entry point, `game.js` holds all game logic, and `scenes.js` holds all drawing functions; separating concerns makes each file shorter and easier to read
- **Shared global scope** — all `.js` files loaded in `index.html` share the same global scope, so variables and functions defined in one file are available in the others
- **Load order** — files must be loaded in `index.html` in the right order; `game.js` and `scenes.js` are loaded before `sketch.js` because `sketch.js` uses functions from both
- **Constants for strings** — `ROCK`, `PAPER`, and `SCISSORS` are defined as constants rather than typing the strings directly; this prevents typos from causing silent bugs
- **`null` as a default** — `playerChoice` starts as `null` so `sketch.js` can check whether a round is in progress using `if (playerChoice !== null)`
- **`random(array)`** — picks a random element from an array; used here to select the NPC's move each round
- **`rectMode(CENTER)`** — changes how `rect()` is positioned so that `x` and `y` refer to the centre rather than the top-left corner; useful for buttons that need to be centred on a point
- **Hover detection** — `isMouseOver()` checks whether the mouse is inside a button's bounds; passed as `isHovered` to `drawButton()` to change the button colour on hover
- **`mousePressed()`** — fires once per click; used here to check which button was clicked and call the appropriate game logic function

## Setup and Interaction Instructions

To run the sketch locally, open `index.html` in Google Chrome using Live Server.

Click **Rock**, **Paper**, or **Scissors** to play a round against the NPC blob. Click **Play Again** to reset.

**Opening the Chrome Console**

- **Windows:** Press `F12` or `Ctrl + Shift + J`, then click the **Console** tab
- **Mac:** Press `Cmd + Option + J`

The console will show any errors in your sketch.

## Assets

No external assets used. All visuals are generated with p5.js.

## References

N/A
