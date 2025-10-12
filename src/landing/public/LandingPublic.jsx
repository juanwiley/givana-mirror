"use client";

import React, { useEffect, useState } from 'react';
import styles from './LandingPublic.module.css';
import HeroCarousel from '@/components/HeroCarousel';
import ListingsSection from '@/components/ListingsSection';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const LandingPublic = () => {
  const [carouselMedia, setCarouselMedia] = useState([]);

  useEffect(() => {
    const supabase = createClientComponentClient();

    const fetchCarouselMedia = async () => {
      const { data, error } = await supabase
        .from('media_assets')
        .select('id, path, kind, alt, sort_order')
        .eq('is_featured', true)
        .eq('published', true)
        .order('sort_order');

      if (error) {
        console.error('Carousel fetch error:', error.message);
      } else {
        setCarouselMedia(data || []);
      }
    };

    fetchCarouselMedia();
  }, []);

  return (
    <div className={styles.container}>
      <section className={styles.carouselWrapper}>
        {carouselMedia.length > 0 && <HeroCarousel media={carouselMedia} />}
      </section>

      <ListingsSection
        title="Latest Listings Near You"
        query={{ loop: 'dobbs-ferry-ny', status: 'open', limit: 4 }}
        viewAllHref="/loops/dobbs-ferry-ny"
      />
    </div>
  );
};

export default LandingPublic;
