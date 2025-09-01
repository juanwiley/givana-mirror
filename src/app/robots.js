export default function robots() {
  const staging = process.env.NEXT_PUBLIC_SITE_ENV === 'staging';
  if (staging) return { rules: [{ userAgent: '*', disallow: '/' }], sitemap: null };
  return { rules: [{ userAgent: '*', allow: '/' }] };
}
