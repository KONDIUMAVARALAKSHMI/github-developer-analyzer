# ANSWERS.md

---

## 1. How to run

On a fresh machine you'll need Node.js v18+ and npm v9+. Then:

```bash
git clone <repo-url>
cd github-developer-analyzer
npm install
npm run dev
```

That's it. Opens at http://localhost:5173.

Optional: copy `.env.example` to `.env` and add a GitHub PAT (`VITE_GITHUB_TOKEN`) if you want 5,000 API requests/hour instead of the default 60. The app works without it — you'll just hit the rate limit faster if you're searching a lot.

No Docker, no global installs, no build step required to just run locally.

---

## 2. Stack choice

**React + Vite + Tailwind + Axios** felt like the obvious pick here. Vite is dramatically faster than CRA — `npm run dev` is up in under a second. Tailwind means I can iterate on UI without writing a single CSS file. Axios has interceptors which were specifically useful here: I could normalize all error responses in one place (`services/github.js`) instead of sprinkling try/catch logic across every component.

I chose plain JavaScript over TypeScript deliberately. TypeScript would've been better for a real production codebase, but for a 5-file API wrapper and a few components, it adds setup overhead without much payoff. The time saved went into better error handling and UI polish instead.

**What would've been a worse choice:** Using `fetch` directly without Axios. The timeout handling in `fetch` requires `AbortController` boilerplate that you have to write every time. Axios handles timeouts with a single config option and gives you interceptors for free. For a project that specifically asks you to handle slow APIs and rate limits, the centralized interceptor pattern is cleaner than alternatives.

Another bad choice would've been Next.js. This app has no SSR requirements, no file-based routing needs, and adding the Next.js overhead for a single-page tool would have been over-engineering.

---

## 3. One real edge case

**Edge case: Broken avatar image fallback**

File: `src/components/UserProfile.jsx`, near the top of the component.

```jsx
const [avatarError, setAvatarError] = useState(false);

const avatarSrc = avatarError
  ? `https://ui-avatars.com/api/?name=${encodeURIComponent(user.login)}&background=0d9488&color=fff&size=128`
  : user.avatar_url;
```

And on the `<img>` tag:

```jsx
onError={() => setAvatarError(true)}
```

GitHub avatars occasionally return 404s or fail to load — especially for older accounts, deleted Gravatar-linked avatars, or in certain network conditions. Without this, you'd see a broken image icon in the middle of an otherwise clean profile card. With it, the app falls back to a generated initials avatar from ui-avatars.com using the username. The background color matches the app's brand teal so it doesn't look like an afterthought.

---

## 4. AI usage

I used Claude (Sonnet) during this project in a few places:

**1. Initial Axios interceptor structure**  
I asked: "What's the cleanest way to normalize GitHub API errors in an Axios interceptor?" It gave me the basic structure with `error.response.status` checks. I changed it to also extract the `x-ratelimit-reset` header and convert it to a human-readable time — Claude's version just said "rate limit exceeded" without telling you when it resets, which felt unhelpful when you're staring at an error.

**2. Tailwind CSS animation for skeleton shimmer**  
I asked for a shimmer animation for skeleton loaders. The output used a keyframe animation with `background-size` trick I wasn't immediately familiar with. I kept the core approach but tweaked the dark mode version — Claude's generated dark skeleton used `#1f2937` which was too close to the card background in my dark palette, so I bumped it to `#3f3f46` for better contrast.

**3. `timeAgo` utility function**  
Used Claude to help draft a relative time formatter utility. The output was fine and I kept it mostly as-is. I added the `'just now'` fallback at the bottom because the original threw for very recent dates (< 60 seconds).

---

## 5. Honest gap

The language stats aren't accurate. I count how many repos use each language, not the actual bytes of code per language like GitHub does. So if someone has 20 JavaScript repos and 1 massive Rust project, my chart would show JS winning, but GitHub's would show Rust dominant.

The correct fix is to call `/repos/{owner}/{repo}/languages` for each repo, which returns byte counts per language. The problem is that's N+1 API calls — one per repo — and with users who have 100 repos you'd burn through your rate limit immediately. A better approach would be to fetch language data for only the top 10-15 repos by stars, which gives a reasonable approximation without hammering the API. I didn't implement it because I prioritized reliability (not blowing the rate limit) over precision, but it's the first thing I'd fix.
