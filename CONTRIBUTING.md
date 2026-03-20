# Contributing to Anime Content Engine

Thank you for your interest in contributing.

This repository is open to improvements in automation, reliability, accessibility, content quality, and developer experience.

# Important Branch Rule

All contribution pull requests must target:

- `develop`

Do not open pull requests directly against:

- `main`

The `main` branch is treated as the release branch. Feature work, fixes, and documentation improvements should go through `develop` first.

# Good Areas to Contribute

You can help by improving:

- Anime filtering rules
- Social post formatting
- Image rendering quality
- Alt text generation
- Bluesky automation reliability
- X publishing reliability
- Workflow setup and CI reliability
- Error handling and retry behavior
- Documentation and onboarding

# Local Setup

1. Fork the repository
2. Clone your fork
3. Install dependencies
4. Create the output directories
5. Add a local `.env`

```bash
git clone https://github.com/your-username/anime-content-engine.git
cd anime-content-engine
npm install
mkdir -p output output/temp
```

# Environment Variables

For local development you may need:

```env
BSKY_USERNAME=your-handle.bsky.social
BSKY_PASSWORD=your-app-password

X_API_KEY=your_x_api_key
X_API_SECRET=your_x_api_secret
X_ACCESS_TOKEN=your_x_access_token
X_ACCESS_TOKEN_SECRET=your_x_access_token_secret
```

# Development Workflow

Recommended steps:

1. Create a branch from `develop`
2. Make a focused change
3. Run prettier and linting
4. Test the affected module locally when possible
5. Open a pull request into `develop`

Example:

```bash
git checkout develop
git pull origin develop
git checkout -b feat/improve-anime-filtering
npm run format
npm run lint
```

# Pull Request Guidelines

Please keep pull requests:

- Small enough to review comfortably
- Focused on one main improvement
- Clearly described
- Targeted to `develop`

Useful things to include in your PR description:

- What changed
- Why it changed
- Which module or workflow is affected
- How you tested it

# Suggested Checks Before Opening a PR

Run:

```bash
npm run format
npm run lint
```

If your change affects posting or engagement modules, also run the relevant module locally when possible:

```bash
node modules/blueskyPostModule.js
node modules/blueskyLikeModule.js
node modules/xPostModule.js
```

# Commit Style

The repository currently follows a simple commit style such as:

- `feat: add ...`
- `feat(x): add ...`
- `refactor: ...`
- `chore: ...`

You do not need to copy this perfectly, but matching the existing style is helpful.

# Documentation Contributions

Documentation improvements are welcome too.

Helpful examples:

- Clarifying setup steps
- Improving environment variable explanations
- Adding workflow notes
- Improving contribution guidance
- Expanding discoverability keywords in the README

# Questions

If you are unsure whether a change fits the project, open an issue or draft pull request first.

Thank you for helping improve Anime Content Engine.
