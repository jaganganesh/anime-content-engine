import filterAnimeService from "./services/filterAnimeService.js";

const runAutomation = async () => {
  try {
    const selectedAnime = await filterAnimeService();
    console.log("runAutomation:", "selectedAnime:", selectedAnime.title);
  } catch (error) {
    console.error("runAutomation:", "Fetch Error:", error);
    throw error;
  }
};
runAutomation();
