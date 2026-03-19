import "dotenv/config";
import fs from "fs/promises";
import { AtpAgent, RichText } from "@atproto/api";
import { RENDER_IMAGE_STORAGE } from "../config/constant.js";
import generateImageService from "../services/generateImageService.js";

const blueskyPostModule = async () => {
  const agent = new AtpAgent({ service: "https://bsky.social" });
  try {
    // Generate Image
    const [postContent, imageDescription] = await generateImageService();

    // Authenticate
    await agent.login({
      identifier: process.env.BSKY_USERNAME,
      password: process.env.BSKY_PASSWORD,
    });

    // Publish Post
    const imageBuffer = await fs.readFile(RENDER_IMAGE_STORAGE);
    const uploadRes = await agent.uploadBlob(imageBuffer, {
      encoding: "image/jpeg",
    });
    const rt = new RichText({ text: postContent });
    await rt.detectFacets(agent);
    await agent.post({
      text: rt.text,
      langs: ["en"],
      facets: rt.facets,
      embed: {
        $type: "app.bsky.embed.images",
        images: [
          {
            image: uploadRes.data.blob,
            alt: imageDescription,
          },
        ],
      },
    });
  } catch (error) {
    console.error("blueskyPostModule:", "Fetch Error:", error);
    throw error;
  }
};
await blueskyPostModule();
