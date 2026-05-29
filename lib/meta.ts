import { Metadata } from 'next';

const BASE = 'https://toronto-charities.ca';
const DEFAULT_OG = `${BASE}/og-default.jpg`;

export function pageMeta({
  title,
  description,
  path,
  ogImage,
  noindex,
}: {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  noindex?: boolean;
}): Metadata {
  const fullTitle = title.endsWith('Toronto Charities')
    ? title
    : `${title} | Toronto Charities`;
  const url = `${BASE}${path}`;

  return {
    title: fullTitle,
    description,
    alternates: { canonical: url },
    robots: noindex
      ? { index: false, follow: true }
      : { index: true, follow: true },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: 'Toronto Charities',
      images: [{ url: ogImage ?? DEFAULT_OG, width: 1200, height: 630 }],
      locale: 'en_CA',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage ?? DEFAULT_OG],
    },
  };
}
