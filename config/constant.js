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

// Brand
export const BRAND_COLOR = "#FF8000";
export const BRAND_LOGO = "../resources/images/logo.png";

// Logo Box
export const LOGO_SIZE_RATIO = 0.15;
export const MIN_LOGO_SIZE = 35;
export const LOGO_PADDING_RATIO = 0.025;
export const MIN_LOGO_PADDING = 8;
export const LOGO_BOX_RADIUS_RATIO = 0.04;
export const MIN_LOGO_BOX_RADIUS = 12;

// Output
export const JPEG_QUALITY = 0.8;

// Hashtags
export const CORE_TAGS = ["Anime", "AnimeRecs"];
export const ROTATION_TAGS = [
  "AnimeCommunity",
  "Otaku",
  "AnimeOfTheDay",
  "AnimeRecommendation",
  "MustWatch",
];

// Bluesky
export const BLUESKY_LIKE_LIMIT = 10;
export const BLUESKY_LIKE_TAGS = [
  "#Anime",
  "#AniSky",
  "#AnimeSky",
  "#AnimeRecs",
  "#AnimeRecommendations",
];
export const BLUESKY_NSFW_CONTENT = [
  "porn",
  "sex",
  "sexual",
  "nude",
  "nudity",
  "nsfw",
  "hentai",
  "censored",
  "uncensored",
  "aiart",
  "adult only",
];
