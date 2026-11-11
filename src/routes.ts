export type Page = 'privacy' | 'terms' | 'contact';

// Local development and https://amatahub.github.io/ both use the domain root.
const base = import.meta.env.BASE_URL;

export function sitePath(path = ''): string {
  return `${base}${path.replace(/^\/+/, '')}`;
}

export function getPage(): Page | null {
  const pathname = window.location.pathname;
  const relative = pathname.startsWith(base) ? pathname.slice(base.length) : '';
  const value = relative.replace(/\/+$/, '');
  return value === 'privacy' || value === 'terms' || value === 'contact' ? value : null;
}
