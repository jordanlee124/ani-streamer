# Ani-Streamer

An anime streaming web app built with React and TypeScript. Pulls anime data via the [Consumet](https://github.com/consumet/consumet.ts) library using the Gogoanime provider.

## Features

- Browse recently updated anime episodes
- Search anime by title
- Redux-based state management with async data fetching

## Tech Stack

- **React 19** + **TypeScript**
- **Redux Toolkit** for state management
- **React Router v7** for client-side routing
- **Styled Components** for styling
- **Consumet** for anime data (Gogoanime provider)

## Getting Started

### Prerequisites

- Node.js 16+
- npm

### Install

```bash
npm install
```

### Run

```bash
npm start
```

Opens at [http://localhost:3000](http://localhost:3000).

### Build

```bash
npm run build
```

## Project Structure

```
src/
├── components/       # Reusable UI components (Navbar, Card, HorizontalScroll)
├── pages/            # Page-level components (Home)
├── routes/           # Route definitions
├── store/            # Redux store, slices, operations, selectors
├── styles/           # Global colours and fonts
├── types/            # TypeScript type definitions
└── lib/              # Theme and global styles
```
