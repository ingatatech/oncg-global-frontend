import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://oncgglobal.com';

  // Core pages
  const routes = [
    '',
    '/about',
    '/services',
    '/insights',
    '/publications',
    '/network-offices',
    '/leadership',
    '/subsidiaries',
    '/contact-us',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  return [...routes];
}
