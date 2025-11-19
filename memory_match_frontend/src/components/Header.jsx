import React from 'react';
import PropTypes from 'prop-types';
import styles from './Header.module.css';

// PUBLIC_INTERFACE
export default function Header({ moves, seconds, onRestart, statusMessage }) {
  /** Displays game header with move counter, timer, and restart control. */
  return (
    <header className={styles.header} role="banner">
      <div className={styles.meta}>
        <div className={styles.stat} aria-label={`Moves ${moves}`}>
          <span className={styles.label}>Moves</span>
          <span className={styles.value}>{moves}</span>
        </div>
        <div className={styles.stat} aria-label={`Time ${seconds} seconds`}>
          <span className={styles.label}>Time</span>
          <span className={styles.value}>{seconds}s</span>
        </div>
      </div>
      <div className={styles.actions}>
        <button
          type="button"
          className={styles.restart}
          onClick={onRestart}
          aria-label="Restart game"
        >
          ↻ Restart
        </button>
      </div>
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {statusMessage}
      </div>
    </header>
  );
}

Header.propTypes = {
  moves: PropTypes.number.isRequired,
  seconds: PropTypes.number.isRequired,
  onRestart: PropTypes.func.isRequired,
  statusMessage: PropTypes.string,
};

Header.defaultProps = {
  statusMessage: '',
};
