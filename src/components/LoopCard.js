// src/components/LoopCard.js
import Link from 'next/link';
import base from './ui/Card.module.css';
import s from './LoopCard.module.css';

function short(text, n = 100) {
  if (!text) return '';
  return text.length > n ? text.slice(0, n - 1) + '…' : text;
}

export default function LoopCard({ loop }) {
  const imgSrc = loop.image_url || '/loop-placeholder.png';
  const name = loop.name || 'Untitled loop';
  const desc = loop.description || '';

  return (
    <div className={`${base.card} ${s.card}`}>
      <div className={s.imgwrap}>
        <img src={imgSrc} alt={name} loading="lazy" className={base.mediaTall} />
        <div className={s.overlay}>
          <h4 className={s.overlayTitle}>{name}</h4>
          <p className={s.overlayDesc}>{desc || 'No description yet.'}</p>
          <div className={s.overlayCta}>
            <Link href={`/loops/${loop.slug}`} className={s.button}>View Loop</Link>
          </div>
        </div>
      </div>

      <div className={s.body}>
        <h3 className={s.title}>{name}</h3>
        {desc && <p className={s.excerpt}>{short(desc, 100)}</p>}
      </div>
    </div>
  );
}
