// Jikan API
export const JIKAN_ENDPOINT = "https://api.jikan.moe/v4/random/anime";
export const ALLOWED_SHOW_TYPE = ["TV", "Movie", "Special"];
export const BLOCKED_SHOW_RATING = [
  "R+ - Mild Nudity",
  "Rx - Hentai",
  "G - All Ages",
  "PG - Children",
];

// Delays
export const REQUEST_TIMEOUT = 15000;
export const NAP_DURATION = 3000;

// Storage
export const OUTPUT_PATH = "output";
export const TEMP_PATH = "output/temp";
export const TEMP_IMAGE_STORAGE = `${TEMP_PATH}/image.jpg`;
export const RENDER_IMAGE_STORAGE = `${OUTPUT_PATH}/image.jpg`;
