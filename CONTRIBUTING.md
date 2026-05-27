# Contributing to BASE

This project uses **Claude agents** for code edits. You don't need to know React — just describe what you want changed.

## How to make edits with Claude

### Option 1 — Claude Code on the web (easiest)
1. Go to [claude.ai/code](https://claude.ai/code)
2. Connect this GitHub repo
3. Describe what you want changed, e.g.:
   - *"Add a sleep tracking stat to the Home screen"*
   - *"Change the onboarding to ask for age and gender"*
   - *"Make the workout card on Home navigate to the Workout screen instead of Weights"*
4. Claude reads `CLAUDE.md` automatically and knows the full codebase
5. It'll make the change, commit it to a new branch, and open a PR

### Option 2 — Claude Code CLI
```bash
# Clone the repo
git clone <repo-url>
cd base-app

# Start Claude Code
claude

# Describe your change at the prompt
```

### Option 3 — Regular GitHub edit
1. Open `index.html` on GitHub
2. Click the pencil ✏️ icon
3. Edit directly and open a PR

---

## Ground rules

- **Always work on a branch**, never commit directly to `main`
- PRs go through review before merging
- Keep the single-file structure — all code stays in `index.html`
- Read `CLAUDE.md` for the design rules (brand color, components, etc.)

## Testing your change

Open `index.html` directly in a browser — no server needed. Use the **gear icon** (top-right) to jump between screens quickly.

## File structure

```
index.html      ← the entire app (open this in a browser)
CLAUDE.md       ← guide for Claude agents (read this before making changes)
CONTRIBUTING.md ← this file
README.md       ← design handoff notes (historical context)
project/        ← original design files from Claude Design (reference only)
```
