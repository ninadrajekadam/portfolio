# Ninad Kadam — Portfolio

🔗 **Live portfolio:** [ninadkadam.vercel.app](https://ninadkadam.vercel.app/)

A responsive personal portfolio for **Ninad Kadam**, Senior Software Engineer. It presents his professional experience, technical expertise, selected projects, and contact links in a single-page site.

## Features

- Responsive layout built with React, React Bootstrap, and Sass.
- Light and dark themes with a persistent theme preference.
- Hero, About, Expertise, Projects, Experience, Contact, and Impact sections.
- Project carousel with responsive controls and keyboard support.
- Below-the-fold sections are lazy-loaded as they approach the viewport.
- Smooth section navigation that does not add anchor fragments to the URL.
- Active navigation state tracks the current section while scrolling.
- Subtle entrance and interaction animations, with reduced-motion support.
- Portfolio and experience details maintained in local data files.

## Tech stack

- React and React DOM
- Vite
- React Bootstrap and Bootstrap
- Sass
- Font Awesome icons
- ESLint

## Getting started

Install a compatible Node.js version and npm, then run:

```bash
npm install
npm run dev
```

Vite prints the local development URL in the terminal.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server. |
| `npm run build` | Create an optimized production build in `dist/`. |
| `npm run preview` | Preview the production build locally. |
| `npm run lint` | Run ESLint across the project. |

## Project structure

```text
src/
├── assets/                 # Images, icons, and downloadable CV
├── components/
│   ├── layout/             # Header and footer
│   └── ui/                 # Carousel, lazy sections, theme toggle, utilities
├── data/                   # Project and experience content
├── pages/Home/             # Single-page portfolio composition
├── sections/               # Hero, About, Expertise, Projects, Experience, Contact
├── styles/                 # Global styles, Sass tokens, theme, and mixins
└── utils/                  # Shared section navigation helper
```

## Updating portfolio content

- Edit project titles, descriptions, technologies, images, and links in `src/data/projectData.js`.
- Edit roles, employers, date ranges, and responsibilities in `src/data/experienceData.js`. The experience total is derived from these date ranges.
- Replace images or the CV in `src/assets/` and update the corresponding imports where needed.
- Update section content in the matching component under `src/sections/`.
- Adjust theme colors, design tokens, and shared Sass mixins in `src/styles/abstracts/`.

## Production build

Run `npm run build` to generate the production site in `dist/`. Use `npm run preview` to serve that build locally before deployment.