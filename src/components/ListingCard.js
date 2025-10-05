import React from 'react';
import styles from './ListingCard.module.css';
import cardStyles from './ui/Card.module.css';
import Link from 'next/link';

export default function ListingCard({ listing }) {
  const {
    id,
    title,
    description,
    images = [],
    category,
    loop_slug,
    loop_name,
    status,
  } = listing;

  const imageUrl = images[0] || '/placeholder-loop.png';

  return (
    <div className={`${cardStyles.card} ${styles.card}`}>
      <div className={styles.imageWrapper}>
        <img src={imageUrl} alt={title} className={styles.image} />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        <p className={styles.meta}>
          <strong>Loop: </strong>
          <Link href={`/loops/${loop_slug}`} className={styles.loopLink}>
            {loop_name}
          </Link>
        </p>
        <p className={styles.meta}>
          <strong>Category:</strong> {category}
        </p>
      </div>
    </div>
  );
}
