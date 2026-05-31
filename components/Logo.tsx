import Link from 'next/link';

/**
 * TC/Toronto Charities lockup. Outer span (not <a>) so the inner
 * "by Toronto Property" anchor isn't nested inside the main anchor.
 *
 * `tone` switches dark/light: 'ink' for paper backgrounds, 'paper' for blue footer.
 */
export function Logo({ tone = 'ink' }: { tone?: 'ink' | 'paper' }) {
  const isPaper = tone === 'paper';
  const word = isPaper ? 'text-tp-bg' : 'text-tp-ink';
  const markBorder = isPaper ? 'border-tp-bg' : 'border-tp-ink';
  const markBg = isPaper ? 'bg-transparent' : 'bg-tp-paper';
  const byText = isPaper ? 'text-tp-bg/80' : 'text-tp-muted';

  return (
    <Link href="/" className="inline-grid grid-cols-[56px_auto] gap-x-[14px] items-center" aria-label="Toronto Charities — home">
      <span
        aria-hidden="true"
        className={`relative w-14 h-14 border ${markBorder} ${markBg} flex items-center justify-center`}
      >
        <span
          className={`font-serif font-medium text-2xl tracking-[0.02em] leading-none -mt-[3px] ${word}`}
        >
          TC
        </span>
        <span className="absolute left-1/2 bottom-2 -translate-x-1/2 w-[18px] h-[2px] bg-tp-amber" />
      </span>
      <span className="flex flex-col leading-none">
        <span className={`font-serif font-normal text-[17px] tracking-[0.005em] ${word}`}>
          Toronto
        </span>
        <span className={`font-serif font-medium text-[22px] mt-px ${word}`}>
          Charities
        </span>
      </span>
    </Link>
  );
}
