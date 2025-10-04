// src/components/SkeletonCard.js
import styles from './SkeletonCard.module.css';
import card from './ui/Card.module.css';

export default function SkeletonCard() {
  return (
    <div className={`${card.card} ${styles.skel}`}>
      <div className={`${card.mediaTall} ${styles.media}`} />
      <div className={styles.lines}>
        <div className={styles.line} />
        <div className={styles.line} />
        <div className={styles.lineShort} />
      </div>
    </div>
  );
}
