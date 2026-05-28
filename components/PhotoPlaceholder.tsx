/**
 * Warm-beige placeholder block with diagonal weave + a monospace caption
 * top-left. The mock uses this everywhere real documentary photography drops in.
 *
 * `caption` describes the intended subject (kept verbatim from the design handoff —
 * monospace caption helps reviewers see at a glance that no photo is placed yet).
 */
export function PhotoPlaceholder({
  caption,
  className = '',
  overlay = false,
}: {
  caption: string;
  className?: string;
  overlay?: boolean;
}) {
  return (
    <div
      data-ph={caption}
      className={`photo-ph ${overlay ? 'overlay' : ''} ${className}`}
    />
  );
}
