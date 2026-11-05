# Agent Guidelines

## Git Commit Message Conventions
- **Syntax**: Strict Conventional Commits `<type>: <description>` (allowed types: `feat`, `fix`, `refactor`, `test`, `chore`, `docs`, `perf`, `style`).
- **Brevity**: Default to a single-line summary (<= 72 chars preferred), imperative mood, lowercase subject, no trailing period.
- **No Verbosity**: Never generate multi-paragraph analysis, verbose reasoning, or file laundry lists in commit messages.
- **Examples**:
  - `refactor: migrate styles from SCSS to Tailwind CSS and update components`
  - `feat: modernize eslint and markdown handling`
  - `test: add unit test framework`

## Code Comments & In-Code Documentation
- **Language**: All in-code comments, JSDoc/TSDoc comments, docstrings, and inline notes across all source code and script files must be written **strictly in English**.
- **No Chinese in Comments**: Never use Chinese characters or other non-English languages in source code comments, regardless of the conversation language with the user.
- **Clarity & Brevity**: Keep comments concise, accurate, and focused on explaining non-obvious intent rather than restating self-explanatory code.

