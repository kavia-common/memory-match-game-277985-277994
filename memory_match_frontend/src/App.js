import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import './styles.css';
import Header from './components/Header';
import GameBoard from './components/GameBoard';
import WinOverlay from './components/WinOverlay';
import { generateDeck, isMatch } from './utils/gameUtils';

// PUBLIC_INTERFACE
function App() {
  /**
   * Memory Match Game
   * Implements local-state gameplay: deck, flips, matches, moves, timer, win overlay.
   * Accessibility: keyboard support, aria-live status updates, aria-pressed on cards.
   */

  // Config: number of pairs based on viewport (responsive density)
  const pairCount = useMemo(() => {
    // 4x4 on small screens (8 pairs), 6x4 on wider (12 pairs)
    return window.matchMedia('(min-width: 700px)').matches ? 12 : 8;
  }, []);

  // Game state
  const [deck, setDeck] = useState(() => generateDeck(pairCount));
  const [flipped, setFlipped] = useState([]); // indices currently flipped (max 2)
  const [matched, setMatched] = useState(() => new Set());
  const [moves, setMoves] = useState(0);
  const [busy, setBusy] = useState(false);
  const [startedAt, setStartedAt] = useState(null);
  const [seconds, setSeconds] = useState(0);
  const [statusMsg, setStatusMsg] = useState('');
  const [won, setWon] = useState(false);
  const timerRef = useRef(null);

  // Timer management
  useEffect(() => {
    if (startedAt && !won) {
      timerRef.current = window.setInterval(() => {
        setSeconds(Math.floor((Date.now() - startedAt) / 1000));
      }, 1000);
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [startedAt, won]);

  // Start timer when first move happens
  useEffect(() => {
    if (moves === 0 && flipped.length === 1 && !startedAt) {
      setStartedAt(Date.now());
    }
  }, [moves, flipped, startedAt]);

  const resetGame = useCallback(() => {
    setDeck(generateDeck(pairCount));
    setFlipped([]);
    setMatched(new Set());
    setMoves(0);
    setBusy(false);
    setStartedAt(null);
    setSeconds(0);
    setWon(false);
    setStatusMsg('New game started.');
  }, [pairCount]);

  const handleFlip = useCallback(
    (index) => {
      // Guard rails: prevent flipping when busy, same card, or already matched
      if (busy || flipped.includes(index) || matched.has(index)) return;

      setFlipped((prev) => {
        if (prev.length === 0) {
          return [index];
        }
        if (prev.length === 1) {
          // Second card flipped: evaluate
          const first = prev[0];
          const second = index;

          // Increase moves on attempting a pair
          setMoves((m) => m + 1);

          if (isMatch(deck, first, second)) {
            // Mark matched
            const nextMatched = new Set(matched);
            nextMatched.add(first);
            nextMatched.add(second);
            setMatched(nextMatched);
            setStatusMsg('Match found!');
            // Clear flipped
            window.requestAnimationFrame(() => setFlipped([]));

            // Check win condition
            const totalMatched = nextMatched.size;
            if (totalMatched === deck.length) {
              setWon(true);
              setStatusMsg('All pairs matched! You win!');
            }
          } else {
            // Temporarily lock input and flip back after delay
            setBusy(true);
            setStatusMsg('Not a match.');
            // Keep both flipped visible briefly
            setTimeout(() => {
              setFlipped([]);
              setBusy(false);
            }, 800);
            return [first, second];
          }
          return [first, second];
        }
        // If somehow two are present, ignore further flips until resolved
        return prev;
      });
    },
    [busy, deck, flipped, matched]
  );

  // Initialize a game on mount
  useEffect(() => {
    setStatusMsg('Game ready.');
  }, []);

  const wonSeconds = won ? seconds : 0;

  return (
    <div className="container" aria-live="polite">
      <div className="wrapper">
        <div className="panel">
          <h1 className="title">Memory Match</h1>
          <p className="subtitle">Flip cards to find pairs. Good luck!</p>
        </div>

        <Header
          moves={moves}
          seconds={seconds}
          onRestart={resetGame}
          statusMessage={statusMsg}
        />

        <GameBoard
          deck={deck}
          flippedIndices={flipped}
          matchedSet={matched}
          isBusy={busy}
          onFlip={handleFlip}
        />

        <p className="footerNote">Theme: light • Accents: #3b82f6 and #06b6d4</p>
      </div>

      <WinOverlay
        visible={won}
        moves={moves}
        seconds={wonSeconds}
        onReplay={resetGame}
      />
    </div>
  );
}

export default App;
