import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styles from './Card.module.css';

// PUBLIC_INTERFACE
export const Card = memo(function Card({
  id,
  value,
  isFlipped,
  isMatched,
  isDisabled,
  onFlip,
  tabIndex,
}) {
  /** Accessible card that can be flipped to reveal a symbol.
   * - id: card identifier
   * - value: content displayed when flipped
   * - isFlipped: whether the card is currently face-up
   * - isMatched: whether the card is already matched
   * - isDisabled: whether interactions are disabled (busy state)
   * - onFlip: callback to flip the card
   * - tabIndex: order in the tab navigation
   */
  const handleClick = () => {
    if (!isDisabled && !isMatched) onFlip(id);
  };

  const handleKeyDown = (e) => {
    // Space or Enter to flip
    if ((e.key === 'Enter' || e.key === ' ') && !isDisabled && !isMatched) {
      e.preventDefault();
      onFlip(id);
    }
  };

  const ariaLabel = isMatched
    ? `Card ${id + 1}, matched`
    : isFlipped
    ? `Card ${id + 1}, revealed ${value}`
    : `Card ${id + 1}, face down`;

  return (
    <button
      type="button"
      className={[
        styles.card,
        isFlipped ? styles.flipped : '',
        isMatched ? styles.matched : '',
      ].join(' ')}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      disabled={isDisabled || isMatched}
      aria-pressed={isFlipped}
      aria-label={ariaLabel}
      tabIndex={tabIndex}
    >
      <div className={styles.inner}>
        <div className={styles.front} aria-hidden={isFlipped}>
          ?
        </div>
        <div className={styles.back} aria-hidden={!isFlipped}>
          <span className={styles.symbol} role="img" aria-hidden="true">
            {value}
          </span>
        </div>
      </div>
    </button>
  );
});

Card.propTypes = {
  id: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
  isFlipped: PropTypes.bool.isRequired,
  isMatched: PropTypes.bool.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  onFlip: PropTypes.func.isRequired,
  tabIndex: PropTypes.number.isRequired,
};

export default Card;
