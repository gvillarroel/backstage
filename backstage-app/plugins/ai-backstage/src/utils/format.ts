export const formatCurrency = (value: number | null) =>
  value == null ? '—' : `$${value.toFixed(2)}`;

export const formatInteger = (value: number) => value.toLocaleString('en-US');

export const titleFromSlug = (value: string) =>
  value
    .split(/[_-]/g)
    .filter(Boolean)
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');

export const mapLegacyLinkToRoute = (value: string) => {
  const legacyMap: Record<string, string> = {
    'models.html': '/models',
    'skills.html': '/skills',
    'communities.html': '/communities',
    'agents.html': '/agents',
    'foundations.html': '/foundations',
    'docs.html': '/docs',
    'other.html': '/showcase',
    'index.html': '/',
  };

  return legacyMap[value] ?? value;
};
