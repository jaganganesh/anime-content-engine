import {
  ALLOWED_SHOW_TYPE,
  BLOCKED_SHOW_RATING,
  NAP_DURATION,
} from "../config/constant.js";
import getAnimeService from "./getAnimeService.js";
import powerNap from "../utils/powerNap.js";

const isApprovedAnime = (anime) => {
  return Boolean(
    anime &&
    ALLOWED_SHOW_TYPE.includes(anime.type) &&
    !BLOCKED_SHOW_RATING.includes(anime.rating) &&
    anime.images?.jpg?.large_image_url,
  );
};

const filterAnimeService = async () => {
  while (true) {
    try {
      const currentAnime = await getAnimeService();
      if (isApprovedAnime(currentAnime)) {
        console.log(
          "filterAnimeService:",
          "Safe Anime:",
          currentAnime.title,
          currentAnime.type,
          currentAnime.rating,
        );

        return currentAnime;
      } else {
        console.warn(
          "filterAnimeService:",
          "Rejected Anime",
          currentAnime?.title,
          currentAnime?.type,
          currentAnime?.rating,
        );

        await powerNap(NAP_DURATION);
        continue;
      }
    } catch (error) {
      console.error("filterAnimeService:", "Fetch Error:", error);

      await powerNap(NAP_DURATION);
      continue;
    }
  }
};
export default filterAnimeService;
