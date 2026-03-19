import {
  TEMP_IMAGE_STORAGE,
  RENDER_IMAGE_STORAGE,
} from "../config/constant.js";
import filterAnimeService from "./filterAnimeService.js";
import renderImageService from "./renderImageService.js";
import generateContentService from "./generateContentService.js";
import downloadFile from "../utils/downloadFile.js";

const generateImage = async () => {
  try {
    // Select Anime
    const selectedAnime = await filterAnimeService();
    console.log("generateImage:", "selectedAnime:", selectedAnime.title);

    // Download Anime
    await downloadFile(
      selectedAnime.images.jpg.large_image_url,
      TEMP_IMAGE_STORAGE,
    );

    // Render Image
    await renderImageService(TEMP_IMAGE_STORAGE, RENDER_IMAGE_STORAGE);

    // Generate Content
    const [postContent, imageDescription] =
      generateContentService(selectedAnime);

    return [postContent, imageDescription];
  } catch (error) {
    console.error("generateImage:", "Fetch Error:", error);
    throw error;
  }
};

export default generateImage;
