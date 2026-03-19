import { REQUEST_TIMEOUT, JIKAN_ENDPOINT } from "../config/constant.js";

const getAnimeService = async () => {
  try {
    const response = await fetch(JIKAN_ENDPOINT, {
      signal: AbortSignal.timeout(REQUEST_TIMEOUT),
    });

    if (!response.ok) {
      console.error(
        "getAnimeService:",
        "HTTP Error:",
        "Status:",
        response.status,
      );
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    // console.log("getAnimeService:", "Success:", result);

    return result.data;
  } catch (error) {
    console.error("getAnimeService:", "Fetch Error:", error);
    throw error;
  }
};

export default getAnimeService;
