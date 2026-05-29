'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';

type Category = { slug: string; name: string };

export function DirectorySearch({
  categories,
  initialQ,
  initialCat,
}: {
  categories: Category[];
  initialQ: string;
  initialCat: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [pending, startTransition] = useTransition();

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const q = (data.get('q') as string).trim();
    const cat = data.get('cat') as string;
    const params = new URLSearchParams();
    if (q) params.set('q', q);
    if (cat) params.set('cat', cat);
    startTransition(() => {
      router.push(`/toronto-charities-list/${params.size ? '?' + params.toString() : ''}`);
    });
  }

  return (
    <form
      onSubmit={submit}
      className="flex flex-col sm:flex-row gap-3 w-full max-w-2xl"
    >
      <input
        type="search"
        name="q"
        defaultValue={initialQ}
        placeholder="Search charities..."
        className="flex-1 px-4 py-2.5 rounded border border-tp-rule bg-tp-white text-tp-ink placeholder:text-tp-muted focus:outline-none focus:border-tp-blue text-sm"
      />
      <select
        name="cat"
        defaultValue={initialCat}
        className="px-4 py-2.5 rounded border border-tp-rule bg-tp-white text-tp-ink focus:outline-none focus:border-tp-blue text-sm"
      >
        <option value="">All causes</option>
        {categories.map((c) => (
          <option key={c.slug} value={c.slug}>
            {c.name}
          </option>
        ))}
      </select>
      <button
        type="submit"
        disabled={pending}
        className="px-5 py-2.5 bg-tp-blue text-tp-white rounded text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {pending ? 'Searching…' : 'Search'}
      </button>
    </form>
  );
}
