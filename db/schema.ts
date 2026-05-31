import { relations, sql } from 'drizzle-orm';
import {
  pgTable,
  serial,
  text,
  boolean,
  integer,
  timestamp,
  jsonb,
  numeric,
  primaryKey,
  uniqueIndex,
  index,
} from 'drizzle-orm/pg-core';

export const charities = pgTable(
  'charities',
  {
    id: serial('id').primaryKey(),
    cra_charity_number: text('cra_charity_number').unique().notNull(),
    legal_name: text('legal_name').notNull(),
    display_name: text('display_name').notNull(),
    slug: text('slug').unique().notNull(),
    description: text('description'),
    description_source: text('description_source'),
    address_street: text('address_street'),
    address_city: text('address_city'),
    address_postcode: text('address_postcode'),
    cra_designation: text('cra_designation'),
    website_url: text('website_url'),
    email: text('email'),
    phone: text('phone'),
    status: text('status').default('published').notNull(),
    is_featured: boolean('is_featured').default(false).notNull(),
    claimed_at: timestamp('claimed_at'),
    claimed_by_user_id: integer('claimed_by_user_id'),
    logo_url: text('logo_url'),
    linkback_verified_at: timestamp('linkback_verified_at'),
    last_verified_at: timestamp('last_verified_at'),
    created_at: timestamp('created_at').defaultNow().notNull(),
    updated_at: timestamp('updated_at').defaultNow().notNull(),
  },
  (t) => [
    index('charities_status_idx').on(t.status),
    index('charities_is_featured_idx').on(t.is_featured),
  ],
);

export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  slug: text('slug').unique().notNull(),
  name: text('name').notNull(),
  description: text('description'),
  display_order: integer('display_order').default(0).notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

export const charity_categories = pgTable(
  'charity_categories',
  {
    charity_id: integer('charity_id')
      .references(() => charities.id, { onDelete: 'cascade' })
      .notNull(),
    category_id: integer('category_id')
      .references(() => categories.id, { onDelete: 'cascade' })
      .notNull(),
    is_primary: boolean('is_primary').default(false).notNull(),
  },
  (t) => [primaryKey({ columns: [t.charity_id, t.category_id] })],
);

export const events = pgTable(
  'events',
  {
    id: serial('id').primaryKey(),
    slug: text('slug').unique().notNull(),
    charity_id: integer('charity_id').references(() => charities.id),
    title: text('title').notNull(),
    description: text('description'),
    starts_at: timestamp('starts_at').notNull(),
    ends_at: timestamp('ends_at'),
    location_name: text('location_name'),
    location_address: text('location_address'),
    registration_url: text('registration_url'),
    cost_text: text('cost_text'),
    image_url: text('image_url'),
    source_url: text('source_url'),
    source_type: text('source_type'),
    status: text('status').default('pending').notNull(),
    approved_at: timestamp('approved_at'),
    approved_by: text('approved_by'),
    confidence_score: numeric('confidence_score', { precision: 3, scale: 2 }),
    category_hints: text('category_hints').array(),
    created_at: timestamp('created_at').defaultNow().notNull(),
    updated_at: timestamp('updated_at').defaultNow().notNull(),
  },
  (t) => [
    index('events_charity_id_idx').on(t.charity_id),
    index('events_starts_at_idx').on(t.starts_at),
    index('events_status_idx').on(t.status),
  ],
);

export const event_sources = pgTable(
  'event_sources',
  {
    id: serial('id').primaryKey(),
    charity_id: integer('charity_id').references(() => charities.id),
    source_type: text('source_type').notNull(),
    source_url: text('source_url').notNull(),
    source_name: text('source_name'),
    is_active: boolean('is_active').default(true).notNull(),
    last_checked_at: timestamp('last_checked_at'),
    last_success_at: timestamp('last_success_at'),
    last_error: text('last_error'),
    consecutive_failures: integer('consecutive_failures').default(0).notNull(),
    events_found_count: integer('events_found_count').default(0).notNull(),
    events_approved_count: integer('events_approved_count').default(0).notNull(),
    config: jsonb('config'),
    created_at: timestamp('created_at').defaultNow().notNull(),
  },
  (t) => [
    index('event_sources_is_active_idx').on(t.is_active),
    index('event_sources_charity_id_idx').on(t.charity_id),
  ],
);

export const raw_events = pgTable(
  'raw_events',
  {
    id: serial('id').primaryKey(),
    source_id: integer('source_id').references(() => event_sources.id),
    source_url: text('source_url'),
    external_id: text('external_id'),
    raw_payload: jsonb('raw_payload').notNull(),
    charity_id: integer('charity_id').references(() => charities.id),
    processed_at: timestamp('processed_at'),
    processed_status: text('processed_status'),
    created_at: timestamp('created_at').defaultNow().notNull(),
  },
  (t) => [
    uniqueIndex('raw_events_dedup_idx')
      .on(t.source_id, t.external_id)
      .where(sql`${t.external_id} IS NOT NULL`),
    index('raw_events_pending_idx')
      .on(t.processed_status)
      .where(sql`${t.processed_status} = 'pending'`),
  ],
);

export const event_source_opt_outs = pgTable('event_source_opt_outs', {
  id: serial('id').primaryKey(),
  charity_id: integer('charity_id')
    .references(() => charities.id)
    .unique()
    .notNull(),
  opted_out_at: timestamp('opted_out_at').defaultNow().notNull(),
  reason: text('reason'),
});

export const guides = pgTable('guides', {
  id: serial('id').primaryKey(),
  slug: text('slug').unique().notNull(),
  path: text('path').unique().notNull(),
  title: text('title').notNull(),
  dek: text('dek'),
  content: text('content').notNull(),
  status: text('status').default('draft').notNull(),
  published_at: timestamp('published_at'),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

// NextAuth tables — must match @auth/drizzle-adapter expectations.
// See https://authjs.dev/getting-started/adapters/drizzle
export const users = pgTable('user', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name'),
  email: text('email').unique().notNull(),
  emailVerified: timestamp('emailVerified', { mode: 'date' }),
  image: text('image'),
  role: text('role').default('charity_owner').notNull(),
});

export const accounts = pgTable(
  'account',
  {
    userId: text('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    type: text('type').notNull(),
    provider: text('provider').notNull(),
    providerAccountId: text('providerAccountId').notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: text('token_type'),
    scope: text('scope'),
    id_token: text('id_token'),
    session_state: text('session_state'),
  },
  (t) => [primaryKey({ columns: [t.provider, t.providerAccountId] })],
);

export const sessions = pgTable('session', {
  sessionToken: text('sessionToken').primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
});

export const verificationTokens = pgTable(
  'verificationToken',
  {
    identifier: text('identifier').notNull(),
    token: text('token').notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
  },
  (t) => [primaryKey({ columns: [t.identifier, t.token] })],
);

export const charity_claims = pgTable('charity_claims', {
  id: serial('id').primaryKey(),
  charity_id: integer('charity_id')
    .references(() => charities.id)
    .notNull(),
  user_id: text('user_id')
    .references(() => users.id)
    .notNull(),
  claim_token: text('claim_token').unique().notNull(),
  status: text('status').default('pending').notNull(),
  linkback_url: text('linkback_url'),
  linkback_verified_at: timestamp('linkback_verified_at'),
  claimed_at: timestamp('claimed_at').defaultNow().notNull(),
});

// Relations — used by db.query.X.with({ ... })
export const charitiesRelations = relations(charities, ({ many }) => ({
  categories: many(charity_categories),
  events: many(events),
  sources: many(event_sources),
  claims: many(charity_claims),
}));

export const charityCategoriesRelations = relations(charity_categories, ({ one }) => ({
  charity: one(charities, { fields: [charity_categories.charity_id], references: [charities.id] }),
  category: one(categories, { fields: [charity_categories.category_id], references: [categories.id] }),
}));

export const eventsRelations = relations(events, ({ one }) => ({
  charity: one(charities, { fields: [events.charity_id], references: [charities.id] }),
}));

export const eventSourcesRelations = relations(event_sources, ({ one }) => ({
  charity: one(charities, { fields: [event_sources.charity_id], references: [charities.id] }),
}));
