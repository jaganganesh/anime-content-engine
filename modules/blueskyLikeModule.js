import "dotenv/config";
import { AtpAgent } from "@atproto/api";
import {
  BLUESKY_LIKE_LIMIT,
  BLUESKY_LIKE_TAGS,
  BLUESKY_NSFW_CONTENT,
  NAP_DURATION,
} from "../config/constant.js";
import powerNap from "../utils/powerNap.js";

const getRandomTag = () => {
  const randomIndex = Math.floor(Math.random() * BLUESKY_LIKE_TAGS.length);
  return BLUESKY_LIKE_TAGS[randomIndex];
};

const blueskyLikeModule = async () => {
  const agent = new AtpAgent({ service: "https://bsky.social" });
  const nsfwContent = BLUESKY_NSFW_CONTENT.map((term) => term.toLowerCase());

  try {
    // Authenticate
    const session = await agent.login({
      identifier: process.env.BSKY_USERNAME,
      password: process.env.BSKY_PASSWORD,
    });

    // Decentralized ID
    const botDID = session.data.did;
    const likeTag = getRandomTag();
    const skipTag = nsfwContent.map((term) => `-${term}`).join(" ");
    console.log("blueskyLikeModule:", "currentBotDID:", botDID);
    console.log("blueskyLikeModule:", "currentLikeTag:", likeTag);
    console.log("blueskyLikeModule:", "currentSkipTag:", skipTag);

    const response = await agent.app.bsky.feed.searchPosts({
      q: `${likeTag} ${skipTag}`,
      limit: BLUESKY_LIKE_LIMIT,
    });

    const posts = response.data.posts;
    let likedPostsCount = 0;

    for (const post of posts) {
      // Own Post
      if (post.author.did === botDID) {
        console.log(
          "blueskyLikeModule:",
          "Skipping:",
          "Own Post:",
          post.author.handle,
        );
        continue;
      }

      // Already Liked
      if (post.viewer?.like) {
        console.log(
          "blueskyLikeModule:",
          "Skipping:",
          "Already Liked:",
          post.author.handle,
        );
        continue;
      }

      // Filter and Skip NSFW
      const isFiltered =
        post.labels?.some((l) => nsfwContent.includes(l.val.toLowerCase())) ||
        post.author.labels?.some((l) =>
          nsfwContent.includes(l.val.toLowerCase()),
        ) ||
        post.record?.contentWarning ||
        nsfwContent.some((term) =>
          post.record?.text?.toLowerCase().includes(term),
        );

      if (isFiltered) {
        console.log(
          "blueskyLikeModule:",
          "Skipping:",
          "NSFW content detected via labels:",
          post.author.handle,
        );
        continue;
      }

      // Nap only between successful likes.
      if (likedPostsCount > 0) {
        await powerNap(NAP_DURATION);
      }

      await agent.like(post.uri, post.cid);
      console.log(
        "blueskyLikeModule:",
        "Success:",
        "Liked:",
        post.author.handle,
      );
      likedPostsCount++;
    }
  } catch (error) {
    console.error("blueskyLikeModule:", "Fetch Error:", error);
    throw error;
  }
};
await blueskyLikeModule();
