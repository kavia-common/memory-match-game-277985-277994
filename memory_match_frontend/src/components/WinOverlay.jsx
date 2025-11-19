import React from 'react';
import PropTypes from 'prop-types';
import styles from './WinOverlay.module.css';

// PUBLIC_INTERFACE
export default function WinOverlay({ moves, seconds, onReplay, visible }) {
  /** Displays a centered overlay when the game is won. */
  if (!visible) return null;
  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-label="Game completed">
      <div className={styles.modal}>
        <h2 className={styles.title}>You Win! 🎉</h2>
        <p className={styles.info}>
          Completed in <strong>{moves}</strong> moves and <strong>{seconds}s</strong>.
        </p>
        <button
          type="button"
          className={styles.replay}
          onClick={onReplay}
          autoFocus
          aria-label="Play again"
        >
          Play Again
        </button>
      </div>
    </div>
  );
}

WinOverlay.propTypes = {
  moves: PropTypes.number.isRequired,
  seconds: PropTypes.number.isRequired,
  onReplay: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
};
