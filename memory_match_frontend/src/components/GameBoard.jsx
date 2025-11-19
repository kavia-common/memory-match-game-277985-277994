import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import styles from './GameBoard.module.css';

// PUBLIC_INTERFACE
export default function GameBoard({
  deck,
  flippedIndices,
  matchedSet,
  isBusy,
  onFlip,
}) {
  /** Renders a responsive grid of cards. */
  return (
    <main className={styles.board} role="main" aria-label="Memory card grid">
      {deck.map((card, index) => (
        <div className={styles.cell} key={`${card.value}-${index}`}>
          <Card
            id={index}
            value={card.value}
            isFlipped={flippedIndices.includes(index) || matchedSet.has(index)}
            isMatched={matchedSet.has(index)}
            isDisabled={isBusy}
            onFlip={onFlip}
            tabIndex={0}
          />
        </div>
      ))}
    </main>
  );
}

GameBoard.propTypes = {
  deck: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  flippedIndices: PropTypes.arrayOf(PropTypes.number).isRequired,
  matchedSet: PropTypes.instanceOf(Set).isRequired,
  isBusy: PropTypes.bool.isRequired,
  onFlip: PropTypes.func.isRequired,
};
