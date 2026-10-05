/**
 * kotova.io and app.kotova.io both honour `?lang=`, so a link out of a translated
 * docs page keeps the reader in their language. On the root (English) locale
 * `locale` is undefined and the URL is returned untouched.
 */
export function withLang(url: string, locale: string | undefined): string {
  if (!locale) return url;
  const [base, hash] = url.split('#');
  const sep = base.includes('?') ? '&' : '?';
  return `${base}${sep}lang=${locale}${hash ? `#${hash}` : ''}`;
}
