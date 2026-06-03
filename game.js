// ============================================================
// game.js: Story State + Logic
// ============================================================

// The player's current position in the story tree
let currentLevel = 0; // 0=intro, 1=level1, 2=level2, 3=ending
let pathLevel1 = null; // "vents" or "paint"
let pathLevel2 = null; // "A1","A2","B1","B2"
let endingIndex = null; // 1–8

// ------------------------------------------------------------
// Story content: every screen's text + buttons
// Each node has: title, body, and an array of choices.
// Each choice has a label and the state changes it causes.
// ------------------------------------------------------------
const STORY = {
  intro: {
    title: "The Pink Mall",
    body: "Lily tumbles through a glowing pink portal and lands in a strange, endless mall. Everything is pink. The guards are pink. The music is pink.\n\nThen she sees her mom — dragged away by two pink guards.\n\nShe has to get her back.",
    choices: [
      {
        label: "Start the rescue →",
        action: () => {
          currentLevel = 1;
        },
      },
    ],
  },

  level1: {
    title: "Level 1 — Choose Your Way",
    body: "Lily looks around. She spots a ceiling vent and a bucket of pink paint left by a worker.\n\nThe guards haven't noticed her yet. She has seconds to decide.",
    choices: [
      {
        label: "Climb into the vents",
        action: () => {
          pathLevel1 = "vents";
          currentLevel = 2;
        },
      },
      {
        label: "Paint herself pink",
        action: () => {
          pathLevel1 = "paint";
          currentLevel = 2;
        },
      },
    ],
  },

  // Level 2 — depends on Level 1 choice
  level2_vents: {
    title: "Level 2 — Inside the Vents",
    body: "Lily crawls through the dusty ceiling tunnels. She can hear the guards below. Through the grate she sees two paths — a glowing computer room and a colourful toy shop.",
    choices: [
      {
        label: "Drop into the Security Room",
        action: () => {
          pathLevel2 = "A1";
          currentLevel = 3;
        },
      },
      {
        label: "Drop into the Toy Store",
        action: () => {
          pathLevel2 = "A2";
          currentLevel = 3;
        },
      },
    ],
  },

  level2_paint: {
    title: "Level 2 — Blending In",
    body: "Pink Lily walks right past the guards. They don't blink. She finds a gold badge on the floor — it says 'MANAGER'. Two ideas come to her at once.",
    choices: [
      {
        label: "Pretend to be the boss",
        action: () => {
          pathLevel2 = "B1";
          currentLevel = 3;
        },
      },
      {
        label: "Cause a huge distraction",
        action: () => {
          pathLevel2 = "B2";
          currentLevel = 3;
        },
      },
    ],
  },

  // 8 endings
  ending_A1a: {
    title: "Ending 1 — Computer Hack",
    body: "Lily finds the security computer. After some button-mashing she figures out the door controls. All the exits click open at once.\n\nShe sprints to her mom's cell, grabs her hand, and they run through the nearest door into blinding sunlight.\n\n🎉 You escaped!",
    choices: [{ label: "Play again", action: resetStory }],
  },
  ending_A1b: {
    title: "Ending 2 — Lights Out",
    body: "Lily finds the power switch and throws it. The mall plunges into darkness. Guards stumble and shout.\n\nUsing her phone torch, Lily finds her mom and they tiptoe past the confused guards in the dark.\n\n🎉 You escaped!",
    choices: [{ label: "Play again", action: resetStory }],
  },
  ending_A2a: {
    title: "Ending 3 — Bubble Gun",
    body: "A bright pink Bubble Blaster 3000 sits on the shelf. Lily grabs it. One pull of the trigger launches a giant bubble that traps three guards at once.\n\nShe frees her mom and they run while the guards slowly drift toward the ceiling.\n\n🎉 You escaped!",
    choices: [{ label: "Play again", action: resetStory }],
  },
  ending_A2b: {
    title: "Ending 4 — Magic Cape",
    body: "Behind a dusty box is a shimmering cape labelled DO NOT SELL. Lily throws it around herself and her mom — they vanish completely.\n\nInvisible, they waltz right past every guard and out the front door.\n\n🎉 You escaped!",
    choices: [{ label: "Play again", action: resetStory }],
  },
  ending_B1a: {
    title: "Ending 5 — Free Prize",
    body: "Lily pins on the badge and barks orders. 'Release the prisoner! Give her the welcome gift basket!'\n\nThe guards obey without question. Lily and her mom stroll out carrying gift bags and waving cheerfully.\n\n🎉 You escaped!",
    choices: [{ label: "Play again", action: resetStory }],
  },
  ending_B1b: {
    title: "Ending 6 — New Boss",
    body: "The guards are so impressed they promote Lily on the spot. She is now Manager of the Pink Mall.\n\nShe sends her mom home safely — but she has to stay. The mall needs her.\n\n🤔 Mom is safe… but is this really an escape?",
    choices: [{ label: "Play again", action: resetStory }],
  },
  ending_B2a: {
    title: "Ending 7 — Candy Slide",
    body: "Lily pulls the lever on the decorative candy fountain. Pink syrup floods the floor. Guards slip everywhere.\n\nLily grabs her mom and they dive into the fountain — which turns out to be a portal — and slide straight back to the real world.\n\n🎉 You escaped!",
    choices: [{ label: "Play again", action: resetStory }],
  },
  ending_B2b: {
    title: "Ending 8 — Fast Bike",
    body: "There's a neon scooter chained near the food court. Lily snaps the chain, pulls her mom on the back, and guns it.\n\nShe spots a window. She does not slow down. They burst through in a shower of pink glass and land — somehow perfectly — back home.\n\n🎉 You escaped!",
    choices: [{ label: "Play again", action: resetStory }],
  },
};

// ------------------------------------------------------------
// getCurrentScene()
// Works out which scene key to show based on the current state.
// Called from sketch.js every frame.
// ------------------------------------------------------------
function getCurrentScene() {
  if (currentLevel === 0) return STORY.intro;
  if (currentLevel === 1) return STORY.level1;
  if (currentLevel === 2) {
    return pathLevel1 === "vents" ? STORY.level2_vents : STORY.level2_paint;
  }
  if (currentLevel === 3) {
    // Pick which of the 8 endings to show
    if (pathLevel2 === "A1")
      return endingIndex === 0 ? STORY.ending_A1a : STORY.ending_A1b;
    if (pathLevel2 === "A2")
      return endingIndex === 0 ? STORY.ending_A2a : STORY.ending_A2b;
    if (pathLevel2 === "B1")
      return endingIndex === 0 ? STORY.ending_B1a : STORY.ending_B1b;
    if (pathLevel2 === "B2")
      return endingIndex === 0 ? STORY.ending_B2a : STORY.ending_B2b;
  }
}

// ------------------------------------------------------------
// handleChoice(i)
// Called from sketch.js when button i is clicked.
// For level 3, records which of the two endings the player
// picked before running the action.
// ------------------------------------------------------------
function handleChoice(i) {
  if (currentLevel === 2) {
    endingIndex = i; // 0 = first ending, 1 = second ending
  }
  let scene = getCurrentScene();
  scene.choices[i].action();
}

// ------------------------------------------------------------
// resetStory()
// Resets everything back to the intro screen.
// ------------------------------------------------------------
function resetStory() {
  currentLevel = 0;
  pathLevel1 = null;
  pathLevel2 = null;
  endingIndex = null;
}
