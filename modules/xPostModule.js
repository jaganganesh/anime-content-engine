import "dotenv/config";
import { RENDER_IMAGE_STORAGE } from "../config/constant.js";
import generateImageService from "../services/generateImageService.js";
import { TwitterApi } from "twitter-api-v2";

const client = new TwitterApi({
  appKey: process.env.X_API_KEY,
  appSecret: process.env.X_API_SECRET,
  accessToken: process.env.X_ACCESS_TOKEN,
  accessSecret: process.env.X_ACCESS_TOKEN_SECRET,
});

const xPostModule = async () => {
  try {
    // Generate Image
    const [postContent, imageDescription] = await generateImageService();

    // Publish Post
    const mediaId = await client.v1.uploadMedia(RENDER_IMAGE_STORAGE);
    await client.v1.createMediaMetadata(mediaId, {
      alt_text: {
        text: imageDescription,
      },
    });
    await client.v2.tweet({
      text: postContent,
      media: { media_ids: [mediaId] },
    });

    console.log("xPostModule:", "Post Success");
  } catch (error) {
    console.error("xPostModule:", "Post Error:", error);
    throw error;
  }
};
await xPostModule();
