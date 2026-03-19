import generateImage from "./services/generateImageService.js";

const runAutomation = async () => {
  try {
    // Generate Image
    const [postContent, imageDescription] = await generateImage();

    console.log("runAutomation:", "postContent:", postContent);
    console.log("runAutomation", "imageDescription:", imageDescription);
  } catch (error) {
    console.error("runAutomation:", "Fetch Error:", error);
    throw error;
  }
};
runAutomation();
