// JSON-LD schema components — one per page type.
// All output raw <script> tags; no client JS needed.

export function OrganizationSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Toronto Charities',
          url: 'https://toronto-charities.ca',
          description:
            'A community directory of Toronto-area charities and their events.',
          founder: {
            '@type': 'Organization',
            name: 'Toronto Property',
            url: 'https://torontoproperty.ca',
          },
          areaServed: {
            '@type': 'City',
            name: 'Toronto',
            containedInPlace: { '@type': 'Country', name: 'Canada' },
          },
        }),
      }}
    />
  );
}

export function WebSiteSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'Toronto Charities',
          url: 'https://toronto-charities.ca',
          potentialAction: {
            '@type': 'SearchAction',
            target:
              'https://toronto-charities.ca/toronto-charities-list/?q={search_term_string}',
            'query-input': 'required name=search_term_string',
          },
        }),
      }}
    />
  );
}

export function BreadcrumbSchema({
  items,
}: {
  items: Array<{ name: string; url: string }>;
}) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: items.map((item, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: item.name,
            item: item.url,
          })),
        }),
      }}
    />
  );
}

type CharitySchemaProps = {
  name: string;
  slug: string;
  description?: string | null;
  address_street?: string | null;
  address_city?: string | null;
  address_postcode?: string | null;
  email?: string | null;
  phone?: string | null;
  website_url?: string | null;
  cra_charity_number: string;
};

export function CharitySchema({ charity }: { charity: CharitySchemaProps }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'NonprofitOrganization',
          name: charity.name,
          url: `https://toronto-charities.ca/profile/${charity.slug}/`,
          ...(charity.website_url ? { sameAs: charity.website_url } : {}),
          ...(charity.description ? { description: charity.description } : {}),
          address: {
            '@type': 'PostalAddress',
            ...(charity.address_street
              ? { streetAddress: charity.address_street }
              : {}),
            addressLocality: charity.address_city ?? 'Toronto',
            addressRegion: 'ON',
            ...(charity.address_postcode
              ? { postalCode: charity.address_postcode }
              : {}),
            addressCountry: 'CA',
          },
          ...(charity.email ? { email: charity.email } : {}),
          ...(charity.phone ? { telephone: charity.phone } : {}),
          areaServed: { '@type': 'City', name: 'Toronto' },
          identifier: [
            {
              '@type': 'PropertyValue',
              propertyID: 'CRA Charity Number',
              value: charity.cra_charity_number,
            },
          ],
        }),
      }}
    />
  );
}

type EventSchemaProps = {
  title: string;
  description?: string | null;
  starts_at: Date;
  ends_at?: Date | null;
  location_name?: string | null;
  location_address?: string | null;
  registration_url?: string | null;
  cost_text?: string | null;
  image_url?: string | null;
  slug: string;
  charityName: string;
  charitySlug: string;
};

export function EventSchema({ event }: { event: EventSchemaProps }) {
  const hasRequired =
    event.title && event.starts_at && (event.location_name || event.location_address);
  if (!hasRequired) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Event',
          name: event.title,
          ...(event.description ? { description: event.description } : {}),
          startDate: event.starts_at.toISOString(),
          endDate: (event.ends_at ?? event.starts_at).toISOString(),
          eventStatus: 'https://schema.org/EventScheduled',
          eventAttendanceMode:
            'https://schema.org/OfflineEventAttendanceMode',
          location: {
            '@type': 'Place',
            ...(event.location_name ? { name: event.location_name } : {}),
            address: {
              '@type': 'PostalAddress',
              ...(event.location_address
                ? { streetAddress: event.location_address }
                : {}),
              addressLocality: 'Toronto',
              addressRegion: 'ON',
              addressCountry: 'CA',
            },
          },
          organizer: {
            '@type': 'NonprofitOrganization',
            name: event.charityName,
            url: `https://toronto-charities.ca/profile/${event.charitySlug}/`,
          },
          ...(event.registration_url
            ? {
                offers: {
                  '@type': 'Offer',
                  url: event.registration_url,
                  price: event.cost_text === 'Free' ? '0' : (event.cost_text ?? undefined),
                  priceCurrency: 'CAD',
                  availability: 'https://schema.org/InStock',
                  validFrom: new Date().toISOString(),
                },
              }
            : {}),
          ...(event.image_url ? { image: [event.image_url] } : {}),
        }),
      }}
    />
  );
}
