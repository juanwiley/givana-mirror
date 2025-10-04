'use client';

import React, { useState, useEffect, useRef } from 'react';
import styles from './HeroCarousel.module.css';

export default function HeroCarousel({ media }) {
  const [current, setCurrent] = useState(0);
  const videoPlayedOnce = useRef(false);
  const videoRef = useRef(null);
  const intervalRef = useRef(null);

  const isVideo = (item) => item.kind === 'video';

  const advanceSlide = () => {
    setCurrent((prev) => (prev + 1) % media.length);
  };

  useEffect(() => {
    if (!media.length) return;

    const currentItem = media[current];
    const video = videoRef.current;

    if (isVideo(currentItem)) {
      if (!videoPlayedOnce.current && video) {
        video.currentTime = 0;
        video.play();
        video.onended = () => {
          setTimeout(() => {
            videoPlayedOnce.current = true;
            advanceSlide();
          }, 2000);
        };
      } else {
        // video already played once — skip
        setTimeout(advanceSlide, 6000);
      }
    } else {
      // for images
      setTimeout(advanceSlide, 6000);
    }

    return () => {
      clearTimeout();
    };
  }, [current, media]);

  const goTo = (dir) => {
    videoPlayedOnce.current = true;
    if (dir === 'prev') {
      setCurrent((prev) => (prev - 1 + media.length) % media.length);
    } else {
      setCurrent((prev) => (prev + 1) % media.length);
    }
  };

  return (
    <div className={styles.carousel}>
      <div className={styles.mediaContainer}>
        {media.map((item, index) => (
          <div
            key={item.id || index}
            className={`${styles.slide} ${index === current ? styles.active : ''}`}
          >
            {isVideo(item) ? (
              <video
                ref={videoRef}
                className={styles.media}
                muted
                playsInline
                preload="auto"
                poster="/poster.jpg"
              >
                <source src={item.path} type="video/mp4" />
              </video>
            ) : (
              <img className={styles.media} src={item.path} alt={item.alt || 'Media'} />
            )}
          </div>
        ))}
        <div className={styles.arrows}>
          <button onClick={() => goTo('prev')}>
            <span className={styles.arrowSymbol}>◄</span>
          </button>
          <button onClick={() => goTo('next')}>
            <span className={styles.arrowSymbol}>►</span>
          </button>
        </div>
      </div>
    </div>
  );
}
