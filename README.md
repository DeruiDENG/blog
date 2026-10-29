# Personal Blog

This is my personal blog built with [Next.js 16](https://nextjs.org/) (App Router, Turbopack), [React 19](https://react.dev/), and [TypeScript](https://www.typescriptlang.org/).

## Tech Stack & Architecture

- **Framework**: Next.js 16 (App Router, Turbopack, React Server Components)
- **UI Library**: React 19
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS (with `@tailwindcss/typography`)
- **Content**: Markdown with `gray-matter`, `unified` & `Shiki` (`@shikijs/rehype` compile-time syntax highlighting)
- **Comments**: [Utterances](https://utteranc.es/)
- **Testing**: [Vitest](https://vitest.dev/) with React Testing Library
- **Linting & Formatting**: ESLint 9 (Flat Config) & Prettier
- **Package Manager**: [pnpm](https://pnpm.io/)
- **Node.js**: Node.js 26 LTS

## Getting Started

1. Ensure Node.js 26+ and pnpm are installed.
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Run development server:
   ```bash
   pnpm dev
   ```
4. Run test suite:
   ```bash
   pnpm test
   ```
5. Run linter:
   ```bash
   pnpm lint
   ```
6. Build static export / production bundle:
   ```bash
   pnpm build
   ```
