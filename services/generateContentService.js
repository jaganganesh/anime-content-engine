import { CORE_TAGS, ROTATION_TAGS } from "../config/constant.js";

const generateContentService = (animeData) => {
  const title =
    animeData.title.length <= 73
      ? animeData.title
      : animeData.title.slice(0, 70).trim() + "...";
  const description =
    animeData.synopsis !== ""
      ? animeData.synopsis.length <= 100
        ? animeData.synopsis
        : animeData.synopsis.slice(0, 97).trim() + "..."
      : "No description available.";
  const rating = animeData.rating || "N/A";
  const type = animeData.type || "TV";
  const hashtags = [
    ...CORE_TAGS,
    ROTATION_TAGS[Math.floor(Math.random() * ROTATION_TAGS.length)],
  ]
    .map((tag) => `#${tag}`)
    .join(" ");

  const postContent = [
    title,
    description,
    "",
    `Rating: ${rating}`,
    `Type: ${type}`,
    "",
    hashtags,
  ].join("\n");

  const imageDescription = `Poster for ${title}.\n${animeData.synopsis}`.slice(
    0,
    300,
  );

  return [postContent, imageDescription];
};
export default generateContentService;
