# Agent Instructions for rwsdk-website Project

## Project overview
This is a Cloudflare Workers RedwoodSDK project for a personal websiteapplication.

## Package management
- Use `pnpm` for all package installations
- Dev dependencies: `pnpm install -D <package>`
- Regular dependencies: `pnpm install <package>`

## Build commands
- Development: `pnpm dev`
- Build: `pnpm build`
- Deploy: `pnpm ship`
- Regenerate worker-configuration.d.ts: `pnpm types`

## CSS
- Uses Tailwind CSS v4 with @tailwindcss/vite plugin
- Markdown styled with `@plugin "@tailwindcss/typography";`
- Additional style overrides in `src/app/styles.css`

## Code Conventions
- Uses TypeScript
- React components in `src/app/` directory
- Shared components in `src/app/shared/`
- Uses Prettier formatting as defined in package.json
- spaces not tabs, tabwidth 2, no semicolons, no trailing commas, line length 120
