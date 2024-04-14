export const personalities = [
  "normal",
  "pirate",
  "robot",
  "baby",
  "old man",
  "alien",
  "caveman",
  "superhero",
  "villan",
  "time traveler",
  "wizard",
  "animal",
  "dog",
  "cat",
];

export const moods = ["normal", "excited", "sad", "angry"];

export const responseSizes = ["short", "medium", "long"];

export const appSettings = [
  {
    id: "personality",
    title: "Personality",
    data: personalities,
  },
  {
    id: "mood",
    title: "Moods",
    data: moods,
  },
  {
    id: "responseSize",
    title: "Response size",
    data: responseSizes,
  },
  {
    id: "tone",
    title: "Tone",
    data: ["Sarcastic", "normal", "condecending"],
  },
];
