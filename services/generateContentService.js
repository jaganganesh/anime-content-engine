import { CORE_TAGS, ROTATION_TAGS } from "../config/constant.js";

const generateContentService = async (animeData) => {
  const title =
    animeData.title.length < 80
      ? animeData.title
      : animeData.title.slice(0, 77).trim() + "...";
  const description =
    animeData.synopsis !== ""
      ? animeData.synopsis.length < 150
        ? animeData.synopsis
        : animeData.synopsis.slice(0, 147).trim() + "..."
      : "No description available.";
  const rating = animeData.rating || "N/A";
  const type = animeData.type || "TV";
  const hashtags = [
    ...CORE_TAGS,
    ROTATION_TAGS[Math.floor(Math.random() * ROTATION_TAGS.length)],
  ]
    .map((tag) => `#${tag}`)
    .join(" ");

  const postContent = `
    ${title}
    ${description}\n
    Rating: ${rating}
    Type: ${type}\n
    ${hashtags}
    `.trim();

  const imageDescription = `Poster for ${title}.\n${animeData.synopsis}`.slice(
    0,
    300,
  );

  return [postContent, imageDescription];
};
export default generateContentService;
