export function getEnv() {
  const domain = typeof window !== 'undefined' ? window.location.hostname : '';
  if (domain.includes('staging') || domain.includes('localhost')) return 'staging';
  return 'production';
}
