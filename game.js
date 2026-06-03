// ============================================================
// game.js: Story State + Logic
// ============================================================

let currentLevel = 0;
let pathLevel1 = null; // "vents" or "paint"
let pathLevel2 = null; // "A1", "A2", "B1", "B2"
let pathLevel3 = null; // "a" or "b" (first or second choice)

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
    body: "Pink Lily walks right past the guards. They don't blink. She finds a gold badge on the floor — it says MANAGER. Two ideas come to her at once.",
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

  level3_A1: {
    title: "Level 3 — The Security Room",
    body: "Lily slips into the computer room. Banks of screens show every corner of the mall. She can see her mom in a pink holding cell on Level 2.\n\nTwo options flash in her mind.",
    choices: [
      {
        label: "Hack the computers",
        action: () => {
          pathLevel3 = "a";
          currentLevel = 4;
        },
      },
      {
        label: "Cut the power",
        action: () => {
          pathLevel3 = "b";
          currentLevel = 4;
        },
      },
    ],
  },

  level3_A2: {
    title: "Level 3 — The Toy Store",
    body: "The shelves are packed with strange pink gadgets. Lily's eyes land on two things: a giant Bubble Blaster 3000 and a shimmering cape with a label that reads DO NOT SELL.",
    choices: [
      {
        label: "Grab the Bubble Gun",
        action: () => {
          pathLevel3 = "a";
          currentLevel = 4;
        },
      },
      {
        label: "Try the Magic Cape",
        action: () => {
          pathLevel3 = "b";
          currentLevel = 4;
        },
      },
    ],
  },

  level3_B1: {
    title: "Level 3 — The Big Lie",
    body: "Lily pins on the MANAGER badge and strides up to the guards. They snap to attention immediately. She has their full attention — now what?",
    choices: [
      {
        label: "Demand a reward and leave",
        action: () => {
          pathLevel3 = "a";
          currentLevel = 4;
        },
      },
      {
        label: "Accept the leadership role",
        action: () => {
          pathLevel3 = "b";
          currentLevel = 4;
        },
      },
    ],
  },

  level3_B2: {
    title: "Level 3 — The Distraction",
    body: "Lily pulls a fire alarm. Pink glitter sprays everywhere. Guards run in all directions. In the chaos she spots two escape routes — a bubbling candy fountain and a neon scooter.",
    choices: [
      {
        label: "Hide in the Candy Fountain",
        action: () => {
          pathLevel3 = "a";
          currentLevel = 4;
        },
      },
      {
        label: "Steal the Fast Scooter",
        action: () => {
          pathLevel3 = "b";
          currentLevel = 4;
        },
      },
    ],
  },

  ending_A1a: {
    title: "Ending 1 — Computer Hack",
    body: "Lily mashes the keyboard until the right screen appears. All cell doors click open at once. She sprints to her mom, grabs her hand, and they run through the nearest exit into blinding sunlight.\n\n🎉 You escaped!",
    choices: [{ label: "Play again", action: resetStory }],
  },
  ending_A1b: {
    title: "Ending 2 — Lights Out",
    body: "Lily throws the main power switch. The mall goes completely dark. Guards stumble and shout.\n\nUsing her phone torch, Lily finds her mom and they tiptoe past the confused guards in total silence.\n\n🎉 You escaped!",
    choices: [{ label: "Play again", action: resetStory }],
  },
  ending_A2a: {
    title: "Ending 3 — Bubble Gun",
    body: "One pull of the trigger launches a bubble so big it traps three guards at once. They float helplessly toward the ceiling.\n\nLily frees her mom and they run while the guards slowly drift away.\n\n🎉 You escaped!",
    choices: [{ label: "Play again", action: resetStory }],
  },
  ending_A2b: {
    title: "Ending 4 — Magic Cape",
    body: "Lily throws the cape around herself and her mom. They vanish completely. Invisible, they waltz past every guard and stroll out the front door.\n\n🎉 You escaped!",
    choices: [{ label: "Play again", action: resetStory }],
  },
  ending_B1a: {
    title: "Ending 5 — Free Prize",
    body: "'Release the prisoner and bring the welcome gift basket!' The guards obey without question. Lily and her mom stroll out carrying gift bags and waving cheerfully.\n\n🎉 You escaped!",
    choices: [{ label: "Play again", action: resetStory }],
  },
  ending_B1b: {
    title: "Ending 6 — New Boss",
    body: "The guards are so impressed they promote Lily on the spot. She is now Manager of the Pink Mall.\n\nShe sends her mom home safely — but she has to stay behind. The mall needs her.\n\n🤔 Mom is safe… but is this really an escape?",
    choices: [{ label: "Play again", action: resetStory }],
  },
  ending_B2a: {
    title: "Ending 7 — Candy Slide",
    body: "Lily and her mom dive into the candy fountain. It turns out to be a portal. They slide through rivers of pink sugar and land — with a soft thud — back in their own living room.\n\n🎉 You escaped!",
    choices: [{ label: "Play again", action: resetStory }],
  },
  ending_B2b: {
    title: "Ending 8 — Fast Scooter",
    body: "Lily snaps the chain, pulls her mom on the back, and guns the throttle. She spots a glowing window at the end of the corridor. She does not slow down.\n\nThey burst through in a shower of pink glass and land — somehow perfectly — back home.\n\n🎉 You escaped!",
    choices: [{ label: "Play again", action: resetStory }],
  },
};

function getCurrentScene() {
  if (currentLevel === 0) return STORY.intro;
  if (currentLevel === 1) return STORY.level1;
  if (currentLevel === 2)
    return pathLevel1 === "vents" ? STORY.level2_vents : STORY.level2_paint;
  if (currentLevel === 3) {
    if (pathLevel2 === "A1") return STORY.level3_A1;
    if (pathLevel2 === "A2") return STORY.level3_A2;
    if (pathLevel2 === "B1") return STORY.level3_B1;
    if (pathLevel2 === "B2") return STORY.level3_B2;
  }
  if (currentLevel === 4) {
    if (pathLevel2 === "A1")
      return pathLevel3 === "a" ? STORY.ending_A1a : STORY.ending_A1b;
    if (pathLevel2 === "A2")
      return pathLevel3 === "a" ? STORY.ending_A2a : STORY.ending_A2b;
    if (pathLevel2 === "B1")
      return pathLevel3 === "a" ? STORY.ending_B1a : STORY.ending_B1b;
    if (pathLevel2 === "B2")
      return pathLevel3 === "a" ? STORY.ending_B2a : STORY.ending_B2b;
  }
}

function handleChoice(i) {
  let scene = getCurrentScene();
  scene.choices[i].action();
}

function resetStory() {
  currentLevel = 0;
  pathLevel1 = null;
  pathLevel2 = null;
  pathLevel3 = null;
}
