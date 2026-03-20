# Anime Content Engine

![Stars](https://img.shields.io/github/stars/jaganganesh/anime-content-engine?style=flat)
![Forks](https://img.shields.io/github/forks/jaganganesh/anime-content-engine?style=flat)
![License](https://img.shields.io/github/license/jaganganesh/anime-content-engine)
![Last Commit](https://img.shields.io/github/last-commit/jaganganesh/anime-content-engine)
![Node](https://img.shields.io/badge/Node.js-24-339933?logo=node.js&logoColor=white)
[![Sponsor](https://img.shields.io/badge/Sponsor-GitHub%20Sponsors-ea4aaa?logo=githubsponsors&logoColor=white)](https://github.com/sponsors/jaganganesh)

An automated **anime content engine** that generates branded **anime social media posts** with poster images, captions, hashtags, and image alt text for **Bluesky** and **X**.

If you are building an **anime bot**, **anime recommendation bot**, **social media automation project**, **Bluesky bot**, **X posting bot**, or **content automation workflow**, this repository is a practical starter project.

This engine currently:

- Fetches random anime entries from the **Jikan API**
- Filters blocked ratings and unsupported anime types
- Downloads official anime poster artwork
- Renders a branded image with a built-in logo overlay
- Generates post text, hashtags, and image descriptions
- Publishes posts to **Bluesky**
- Publishes posts to **X**
- Likes anime-related posts on **Bluesky** through a separate automation workflow
- Runs on schedules through **GitHub Actions**

If this project helps you, consider starring the repo and sponsoring the work.

# Table of Contents

- [About Anime Content Engine](#about-anime-content-engine)
- [Why This Project Is Useful](#why-this-project-is-useful)
- [Features](#features)
- [How the Automation Works](#how-the-automation-works)
- [Anime Filtering Rules](#anime-filtering-rules)
- [Generated Post Format](#generated-post-format)
- [GitHub Actions Automation](#github-actions-automation)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [SEO and Discoverability Keywords](#seo-and-discoverability-keywords)
- [Why This Repository Exists](#why-this-repository-exists)
- [Contributing](#contributing)
- [Support and Sponsorship](#support-and-sponsorship)
- [License](#license)

# About Anime Content Engine

**Anime Content Engine** is a **Node.js anime automation project** built to turn random anime discovery into ready-to-publish social content.

Instead of manually finding an anime title, checking whether it fits your posting rules, downloading poster art, designing a social image, writing a caption, and posting it across platforms, this repository combines those steps into one repeatable workflow.

It is best suited for:

- Anime recommendation pages
- Anime community bots
- Social media automation experiments
- Branded poster generation workflows
- Multi-platform content engine projects

The project currently uses:

- **Jikan API** for anime metadata
- **Canvas** for branded poster rendering
- **AT Protocol / Bluesky API** for Bluesky publishing and likes
- **twitter-api-v2** for X publishing
- **GitHub Actions** for scheduled automation

# Why This Project Is Useful

Anime content pages repeat many of the same steps every day:

- Find an anime
- Check whether it matches content rules
- Download a poster
- Create a social-friendly image
- Write short post copy
- Add hashtags
- Publish the result

This repository turns that process into code.

That makes it useful as both:

- A ready-to-run anime content bot project
- A reference implementation for larger anime content automation systems

# Features

Current features include:

- Random anime selection from the Jikan API
- Content-safe anime filtering based on allowed show type and blocked rating
- Poster download with request timeout handling
- Branded poster rendering with a built-in logo overlay
- Generated social post text with rotating hashtags
- Generated image alt text for accessibility
- Bluesky post publishing with rich text facet detection
- Bluesky like automation with NSFW filtering
- X post publishing with image upload and alt text metadata
- Scheduled GitHub Actions workflows for automated posting and engagement

# How the Automation Works

The current image and post generation flow is:

1. Request a random anime from the Jikan API
2. Keep retrying until the anime matches the repository's content rules
3. Download the anime poster image locally
4. Render a branded social image with the project logo
5. Generate post text, hashtags, and an image description
6. Publish the final result to Bluesky or X depending on the selected module

The repository currently includes three automation entry points:

- `modules/blueskyPostModule.js` for Bluesky posting
- `modules/blueskyLikeModule.js` for Bluesky engagement
- `modules/xPostModule.js` for X posting

# Anime Filtering Rules

Before an anime is used for a post, the project applies content rules to keep the output within its current publishing scope.

Allowed anime types:

- TV
- Movie
- Special

Blocked ratings:

- `R+ - Mild Nudity`
- `Rx - Hentai`
- `G - All Ages`
- `PG - Children`

If an anime fails the filter, the bot waits briefly and requests another random anime entry.

# Generated Post Format

Each generated post currently includes:

- Anime title
- Short synopsis
- Rating
- Type
- Rotating hashtags

Current core hashtags:

- `#Anime`
- `#AnimeRecs`

Current rotating hashtags:

- `#AnimeCommunity`
- `#Otaku`
- `#AnimeOfTheDay`
- `#AnimeRecommendation`
- `#MustWatch`

The generated image currently includes:

- The anime poster as the background
- A branded logo box in the lower-right corner
- Generated image alt text for accessibility on supported platforms

# GitHub Actions Automation

This repository currently includes three GitHub Actions workflows.

## Bluesky - Post Content

The Bluesky posting workflow:

- Runs every 6 hours
- Supports manual triggering with `workflow_dispatch`
- Installs native Canvas dependencies
- Creates `output` and `output/temp` before execution
- Runs `node modules/blueskyPostModule.js`

Workflow file:

- `.github/workflows/bluesky-post-content.yml`

## Bluesky - Like Content

The Bluesky like workflow:

- Runs every 1 hour
- Supports manual triggering with `workflow_dispatch`
- Searches anime-related tags
- Skips NSFW content
- Avoids liking its own posts
- Avoids liking posts that were already liked

Workflow file:

- `.github/workflows/bluesky-like-content.yml`

## X - Post Content

The X posting workflow:

- Runs once per day
- Supports manual triggering with `workflow_dispatch`
- Installs native Canvas dependencies
- Creates `output` and `output/temp` before execution
- Runs `node modules/xPostModule.js`

Workflow file:

- `.github/workflows/x-post-content.yml`

# Project Structure

Below is the current project layout.

- `modules/blueskyPostModule.js` - Generates and publishes anime posts to Bluesky
- `modules/blueskyLikeModule.js` - Likes anime-related Bluesky posts while filtering NSFW content
- `modules/xPostModule.js` - Uploads the generated image and publishes the post to X
- `services/getAnimeService.js` - Fetches random anime data from Jikan
- `services/filterAnimeService.js` - Retries requests until a valid anime result is found
- `services/generateContentService.js` - Builds the post text and image description
- `services/generateImageService.js` - Coordinates anime selection, poster download, image render, and content generation
- `services/renderImageService.js` - Renders the final branded poster image with Canvas
- `utils/downloadFile.js` - Downloads poster artwork locally
- `utils/powerNap.js` - Adds randomized delays between retries and engagement operations
- `config/constant.js` - Central configuration for paths, filters, timing, hashtags, and brand settings
- `resources/images/logo.png` - Logo used in the branded image overlay
- `.github/workflows/` - Scheduled automation workflows

# Getting Started

## Requirements

- Node.js 24 recommended
- npm

This project depends on the `canvas` package, which may require native system libraries depending on your operating system.

GitHub Actions currently installs these Linux packages:

- `build-essential`
- `libcairo2-dev`
- `libpango1.0-dev`
- `libjpeg-dev`
- `libgif-dev`
- `librsvg2-dev`

## Installation

1. Clone the repository
2. Install dependencies
3. Create the output folders
4. Add the required credentials

```bash
git clone https://github.com/jaganganesh/anime-content-engine.git
cd anime-content-engine
npm install
mkdir -p output output/temp
```

## Run the Project Locally

Publish a post to Bluesky:

```bash
node modules/blueskyPostModule.js
```

Run Bluesky like automation:

```bash
node modules/blueskyLikeModule.js
```

Publish a post to X:

```bash
node modules/xPostModule.js
```

Useful commands:

```bash
npm run lint
npm run format
```

# Environment Variables

Create a `.env` file with the credentials required for the modules you want to run.

```env
BSKY_USERNAME=your-handle.bsky.social
BSKY_PASSWORD=your-app-password

X_API_KEY=your_x_api_key
X_API_SECRET=your_x_api_secret
X_ACCESS_TOKEN=your_x_access_token
X_ACCESS_TOKEN_SECRET=your_x_access_token_secret
```

These credentials are currently used for:

- Bluesky authentication and publishing
- Bluesky like automation
- X image upload, alt text metadata, and post publishing

# SEO and Discoverability Keywords

This repository is relevant to topics such as:

- anime content engine
- anime bot
- anime recommendation bot
- anime social media automation
- anime poster generator
- Bluesky bot
- Twitter bot
- X bot
- Node.js bot
- Jikan API project
- Canvas social media image generator
- GitHub Actions social media automation
- content automation for anime pages

# Why This Repository Exists

This project was created to:

- Share anime recommendations automatically
- Turn anime discovery into branded social content
- Experiment with multi-platform social media automation
- Combine anime data, image rendering, accessibility, and scheduling in one codebase
- Serve as a reusable foundation for future anime automation experiments

# Contributing

Contributions are welcome.

If you want to contribute:

- Read [CONTRIBUTING.md](./CONTRIBUTING.md)
- Open pull requests against `develop`, not `main`
- Keep changes focused and easy to review
- Run `npm run format && npm run lint` before opening a pull request

Good contribution areas include:

- Better anime filtering rules
- Improved caption generation
- Improved poster design and layout
- More platform integrations
- Better workflow reliability
- Better retry and error handling

# Support and Sponsorship

If you want to support the project:

- Star the repository
- Share the project with other developers or anime communities
- Open issues for bugs and improvement ideas
- Contribute code through pull requests to `develop`
- Sponsor the work through GitHub Sponsors

More details:

- [SUPPORT.md](./SUPPORT.md)
- [GitHub Sponsors](https://github.com/sponsors/jaganganesh)

# License

GNU Affero General Public License v3.0 or later
