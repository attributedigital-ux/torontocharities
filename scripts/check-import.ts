import { db, charities, categories, charity_categories } from '@/db';
import { eq, count } from 'drizzle-orm';

async function main() {
  const [total] = await db.select({ n: count() }).from(charities);
  const [withCat] = await db.select({ n: count() }).from(charity_categories);
  const cats = await db
    .select({ name: categories.name, n: count(charity_categories.charity_id) })
    .from(categories)
    .leftJoin(charity_categories, eq(categories.id, charity_categories.category_id))
    .groupBy(categories.id, categories.name)
    .orderBy(categories.name);

  console.log('Total charities:', total.n);
  console.log('With category assigned:', withCat.n);
  console.log('\nBy category:');
  cats.forEach(c => console.log(' ', String(c.n).padStart(5), c.name));

  const sample = await db.select().from(charities).limit(5).offset(500);
  console.log('\nSample records:');
  sample.forEach(c => console.log(' ', c.display_name, '|', c.address_city, '|', c.cra_designation));
  process.exit(0);
}

main().catch(e => { console.error(e); process.exit(1); });
