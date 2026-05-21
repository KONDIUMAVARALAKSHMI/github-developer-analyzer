# GitHub Developer Analyzer

A clean, responsive web app that lets you explore any GitHub user's profile — repos, language stats, followers — and compare two developers side-by-side.

![GitHub Developer Analyzer](./screenshots/preview.png)

<!-- Add screenshots here once the app is running -->

---

## Features

- **Search GitHub users** by username with instant validation
- **Profile overview** — avatar, bio, location, join date, follower stats
- **Top repositories** sorted by stars with language, star, and fork counts
- **Most-used languages** shown as progress bars with GitHub-accurate colors
- **Compare two users** side-by-side with a head-to-head stats panel and shared-language tags
- **Dark mode** with system preference detection and localStorage persistence
- **Skeleton loading UI** matching the real layout to reduce perceived latency
- **Full error handling** — user not found, rate limit, network timeout, invalid input, broken avatar
- **Retry button** on failures
- **Responsive** for mobile and desktop

---

## Tech Stack

| Layer        | Choice                        |
| ------------ | ----------------------------- |
| UI framework | React 18 + Vite               |
| Styling      | Tailwind CSS v3               |
| HTTP         | Axios (with interceptors)     |
| Language     | JavaScript (ES2022)           |
| Fonts        | Space Grotesk + IBM Plex Mono |

---

## Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **npm** v9 or higher

Check your versions:

```bash
node -v
npm -v
```

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/github-developer-analyzer.git
cd github-developer-analyzer

# 2. Install dependencies
npm install

# 3. (Optional) Set up environment variables
cp .env.example .env
# Edit .env and add your GitHub token to raise rate limits from 60 to 5000 req/hr

# 4. Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for production

```bash
npm run build
npm run preview
```

---

## Environment Variables

Copy `.env.example` to `.env`:

```env
VITE_GITHUB_TOKEN=your_github_personal_access_token_here
```

**Why you need this (optional but recommended):**  
Without a token, the GitHub API allows 60 unauthenticated requests/hour. With a PAT (no special scopes needed for public data), it increases to 5,000/hour.

**How to generate a token:**  
GitHub → Settings → Developer Settings → Personal Access Tokens → Tokens (classic)  
No scopes are required for public profile data.

---

## Project Structure

```
github-developer-analyzer/
├── src/
│   ├── components/
│   │   ├── ErrorBoundary.jsx   # React error boundary for runtime crashes
│   │   ├── ErrorCard.jsx       # Normalized error display with retry
│   │   ├── Navbar.jsx          # Top nav with tabs + dark mode toggle
│   │   ├── SearchBar.jsx       # Validated search input
│   │   ├── SkeletonCard.jsx    # Loading placeholder
│   │   └── UserProfile.jsx     # Full profile card with repos + languages
│   ├── hooks/
│   │   ├── useDarkMode.js      # Dark mode state + localStorage sync
│   │   └── useGitHubUser.js    # Fetching state machine for one user
│   ├── pages/
│   │   ├── SearchPage.jsx      # Single-user search view
│   │   └── ComparePage.jsx     # Side-by-side comparison view
│   ├── services/
│   │   └── github.js           # Axios instance, interceptors, API functions
│   ├── utils/
│   │   └── validate.js         # Input validation, formatters, language colors
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── public/
│   └── favicon.svg
├── .env.example
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
├── README.md
└── ANSWERS.md
```

---

## Screenshots

> _Add screenshots after running the app_

| Search                              | Compare                               |
| ----------------------------------- | ------------------------------------- |
| ![Search](./screenshots/search.png) | ![Compare](./screenshots/compare.png) |

---

## Future Improvements

- **Contribution graph** — embed a GitHub contribution calendar (requires GraphQL API)
- **Repo filtering** — filter by language, type (fork/original), or date range
- **Pinned repositories** — GitHub's REST API doesn't expose pinned repos; would need GraphQL
- **Persistent history** — remember recent searches in localStorage
- **Export to PDF/PNG** — snapshot a user card for sharing
- **Rate limit indicator** — show remaining requests in the footer
- **Tests** — add Vitest unit tests for `validate.js` and the custom hooks

---

## Suggested Commit History

```
git commit -m "Initial Vite + React setup"
git commit -m "Configure Tailwind CSS and global styles"
git commit -m "Add GitHub API service with Axios interceptors"
git commit -m "Build SearchBar with client-side validation"
git commit -m "Implement UserProfile card with repos and language bars"
git commit -m "Add useGitHubUser hook and loading state"
git commit -m "Add SkeletonCard loading UI"
git commit -m "Handle API errors: 404, rate limit, timeout, network"
git commit -m "Add ErrorCard component with retry button"
git commit -m "Implement Compare page with head-to-head stats"
git commit -m "Add dark mode with system preference detection"
git commit -m "Add ErrorBoundary for runtime crash safety"
git commit -m "Improve responsive layout for mobile"
git commit -m "Add README and ANSWERS documentation"
```
 
