# Memory Match Frontend (React)

A modern, responsive Memory Match game built with React and modular CSS. Local-only state, no external APIs.

## Features

- Responsive grid of cards (4x4 on mobile, 6x4 on wider screens)
- Flip animation with match detection
- Move counter and optional timer
- Restart button
- Win overlay with replay
- Accessibility:
  - Keyboard navigable cards (Enter/Space to flip)
  - `aria-pressed` on cards
  - `aria-live` announcements for status
  - Dialog semantics for win overlay
- Clean structure with modular components and utility functions
- Minimal unit tests for shuffle and match logic

## Quick Start

1. Install dependencies
   npm install

2. Run the development server
   npm start

   App will be available at http://localhost:3000

3. Run tests
   npm test

## Project Structure

- src/components
  - Card.jsx, Card.module.css
  - GameBoard.jsx, GameBoard.module.css
  - Header.jsx, Header.module.css
  - WinOverlay.jsx, WinOverlay.module.css
- src/utils
  - gameUtils.js, gameUtils.test.js
- src/App.js
- src/styles.css

## Notes

- Theme: light with accents — primary #3b82f6, success #06b6d4, secondary #64748b, error hsl(0 84% 60%)
- No environment variables required; the game is fully client-side.
