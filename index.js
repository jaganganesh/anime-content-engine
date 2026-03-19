import { TEMP_IMAGE_STORAGE } from "./config/constant.js";
import filterAnimeService from "./services/filterAnimeService.js";
import downloadFile from "./utils/downloadFile.js";

const runAutomation = async () => {
  try {
    // Select Anime
    const selectedAnime = await filterAnimeService();
    console.log("runAutomation:", "selectedAnime:", selectedAnime.title);

    // Download Anime
    await downloadFile(
      selectedAnime.images.jpg.large_image_url,
      TEMP_IMAGE_STORAGE,
    );
  } catch (error) {
    console.error("runAutomation:", "Fetch Error:", error);
    throw error;
  }
};
runAutomation();
