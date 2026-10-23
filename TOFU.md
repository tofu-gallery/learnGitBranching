# Learn Git Branching on Tofu

Learn Git Branching is an interactive Git tutorial and visualizer. Learners type Git commands into a simulated terminal, watch the commit graph redraw after each one, and work through levels on committing, branching, merging, rebasing and remote repositories. It runs entirely in the browser: Git is simulated in JavaScript, so it never touches a real repository and needs no server of its own.

## How Tofu runs it

| Setting | Value |
| --- | --- |
| Framework preset | `vite`. Choose it explicitly: the root `Dockerfile` is upstream's optional nginx image, not the Tofu path. |
| Package manager | Yarn Classic 1.22.22 (the `packageManager` field) with the committed `yarn.lock`. There is no `package-lock.json`, and the upstream `preinstall` guard stops `npm install`. |
| Node.js | 20.19.0 or newer (`engines`); verified on 22.22.3. |
| Install | `yarn install --frozen-lockfile` |
| Build | `yarn build`: generates the level and locale modules, runs the Jasmine specs, runs `vite build`, then copies `assets/`, `generatedDocs/` and `LICENSE.md` into the output. |
| Output directory | `dist/`, with `dist/index.html` as the entry page. |
| Environment variables | None. |
| Database | None. |
| Accounts or API keys | None. |

Progress and the chosen language are kept in each visitor's own browser (localStorage); the app's Export progress and Import progress buttons move progress between browsers. There is no sign-in.

## What this branch changes, and why

`main` mirrors upstream untouched. Every change below is a commit on the `tofu` branch, and the gallery pins the tag `pin/2026-10-23`.

1. **Build into `dist/`.** `vite.config.mjs` and `scripts/postbuild.js` write to `dist/`, the directory Tofu's Vite preset publishes. The post-build step also copies the unchanged `LICENSE.md` next to `index.html`, so the MIT notice travels with every published copy. `netlify.toml`, the `Dockerfile` and `.github/workflows/pages.yml` read the same directory, so those optional deployment paths keep working on this branch, and `.gitignore` ignores `dist/`.
2. **No analytics.** The Google Analytics (gtag.js) loader is removed from `index.html`, and `src/js/log/index.js` keeps its functions as no-ops, so commands typed, levels chosen and levels solved are never sent anywhere.
3. **No advertising.** The rotating card promoting the author's other projects (BiteRead and WaitingFor.AI, with UTM-tagged links and a visit counter in localStorage) is removed from `index.html`. Its two images stay in `assets/`, unused.

Unchanged: the name, logo and favicon, every lesson and translation, the "View source on GitHub" corner, the author's Threads link, and the links back to the upstream site.

## Things to know

- With no special URL parameters, a running copy loads nothing from any other site. A link with `?gist_level_id=<id>` loads a shared level from GitHub's public Gist API (no key; subject to GitHub's rate limits); that path was not exercised here.
- The share buttons (X, LinkedIn, Facebook) and the tree permalinks point at the upstream site, `learngitbranching.js.org`. They open only when a visitor clicks them.
- Upstream behaviour, not changed here: when the page switches to a language other than its default English on load (from `?locale=`, a saved choice or the browser's language), it rewrites the address to record the language, and the encoded spaces in a `command=` parameter come back as `+`, so a multi-word `command=` link fails for that visitor. Parameters without spaces, such as `level=intro1`, are not affected.

## Source and licence

- Upstream: <https://github.com/pcottle/learnGitBranching>, branch `main`.
- Base upstream commit: `8b1fd893f2c0168edd5c7a5c38204e47e2897b67`.
- Fork: <https://github.com/tofu-gallery/learnGitBranching> (`main` mirrors upstream, `tofu` holds this adaptation, tag `pin/2026-10-23`).
- Licence: MIT. `LICENSE.md` is unchanged: Copyright (c) 2012-2025 Peter Cottle. The bundled Font Awesome files keep their own notices (icons CC BY 4.0, fonts SIL OFL 1.1, code MIT).

## Verification (2026-10-23)

Run from the repository root with Node 22.22.3 and Yarn 1.22.22 (through Corepack):

```sh
yarn install --frozen-lockfile --non-interactive
yarn build
yarn lint
python3 -m http.server 47983 --bind 127.0.0.1 --directory dist
curl -o /dev/null -w '%{http_code}\n' http://127.0.0.1:47983/
```

- The install left `yarn.lock` unchanged.
- The build passed, with 412 specs and 0 failures. Vite's warning that the English locale module is imported both statically and dynamically comes from upstream and does not stop the build.
- Lint: 0 errors, and 9 warnings, all duplicate translation keys already present upstream.
- `/` and every script, stylesheet and icon that `index.html` references answered HTTP 200, and `dist/LICENSE.md` is byte-identical to `LICENSE.md`.
- In a browser on the built site: typing `git commit` added commit C2 to the graph, and in Simplified Chinese the first level (`level intro1`) was solved with two `git commit`s and showed its level-solved message. The console had no errors, and the app requested nothing from another origin.
- The built HTML and JavaScript contain no gtag.js loader, `gtag` event call or promotion code.

Nothing was deployed for this check, and the Netlify, Docker and GitHub Pages paths were not run.
