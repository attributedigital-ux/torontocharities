# -*- coding: utf-8 -*-
# =============================================================
#  SEO PAGE FACTORY — generate.py  (MASTER TEMPLATE)
#  Version: 2.0 — March 2026
#
#  WHAT THIS IS:
#  The CLI runner for the SEO Page Factory. This file is
#  identical for every client — copy it directly, never
#  rewrite it from scratch for a new engagement.
#
#  WHAT TO CUSTOMISE PER CLIENT:
#  Nothing in this file. All client data lives in:
#    sitemap.py          — services, regions, business details
#    service_questions.py — FAQ, buying guide, troubleshooting
#    prompts.py          — system + user prompt builders
#
#  USAGE:
#    python3 generate.py              # full batch
#    python3 generate.py --list       # preview all pages (no API calls)
#    python3 generate.py --dry-run    # run without API calls
#    python3 generate.py --limit 3    # test run, first 3 pages only
#    python3 generate.py --service furnaces   # one service only
#    python3 generate.py --hub-only   # hub pages only
#    python3 generate.py --land-only  # landing pages only
#
#  RESUMING INTERRUPTED RUNS:
#  generation_log.json tracks completed pages automatically.
#  Re-running skips already-completed pages.
#  Delete generation_log.json to start completely fresh.
#
#  API KEY:
#  Never hardcode. Always set via environment variable:
#    export ANTHROPIC_API_KEY=your_key
#  Or: read -s ANTHROPIC_API_KEY && export ANTHROPIC_API_KEY
#  Environment variables reset every terminal session — re-export each time.
#
#  CRITICAL RULES (see GENERATOR_TECHNICAL_RULES.md for full detail):
#  1. max_tokens MUST be 64000 — lower causes page truncation
#  2. Always use streaming — long pages time out without it
#  3. CSS must be in the system prompt in prompts.py — never injected after
#  4. Always test with --limit 1 before running a full batch
#  5. Never change slugs after pages are live — breaks URLs and SEO
# =============================================================

#!/usr/bin/env python3

import anthropic
import argparse
import json
import os
import sys
import time
from pathlib import Path
from datetime import datetime

from sitemap import get_pages_to_generate, REGIONS, BUSINESS
from prompts import get_hub_prompt, get_landing_prompt, get_system_prompt

# ── CONFIG ────────────────────────────────────────────────────
API_KEY    = os.environ.get("ANTHROPIC_API_KEY", "")
MODEL      = "claude-sonnet-4-20250514"
OUTPUT_DIR = Path("output")
LOG_FILE   = Path("generation_log.json")

# Cost tracking (Sonnet 4 pricing — update if model changes)
INPUT_COST_PER_1M  = 3.00   # USD per 1M input tokens
OUTPUT_COST_PER_1M = 15.00  # USD per 1M output tokens


# ── HELPERS ───────────────────────────────────────────────────

def estimate_tokens(text):
    """Rough token estimate — 1 token ≈ 4 chars."""
    return len(text) // 4


def log_result(log, page, status, tokens_in=0, tokens_out=0, error=None):
    entry = {
        "timestamp": datetime.now().isoformat(),
        "type":      page["type"],
        "url":       page["url"],
        "filename":  page["filename"],
        "status":    status,
        "tokens_in":  tokens_in,
        "tokens_out": tokens_out,
        "cost_usd": round(
            (tokens_in  / 1_000_000 * INPUT_COST_PER_1M) +
            (tokens_out / 1_000_000 * OUTPUT_COST_PER_1M), 4
        ),
    }
    if error:
        entry["error"] = error
    log.append(entry)
    return entry


def save_log(log):
    with open(LOG_FILE, "w") as f:
        json.dump(log, f, indent=2)


def print_summary(log):
    total      = len(log)
    success    = sum(1 for e in log if e["status"] == "success")
    failed     = sum(1 for e in log if e["status"] == "error")
    total_cost = sum(e["cost_usd"] for e in log)
    total_in   = sum(e["tokens_in"] for e in log)
    total_out  = sum(e["tokens_out"] for e in log)

    print("\n" + "═" * 50)
    print(f"  GENERATION COMPLETE")
    print("═" * 50)
    print(f"  Pages generated:  {success}/{total}")
    if failed:
        print(f"  Errors:           {failed}")
    print(f"  Total tokens in:  {total_in:,}")
    print(f"  Total tokens out: {total_out:,}")
    print(f"  Estimated cost:   ${total_cost:.2f} USD")
    print(f"  Output folder:    {OUTPUT_DIR.resolve()}")
    print(f"  Log file:         {LOG_FILE.resolve()}")
    print("═" * 50)


# ── GENERATION ────────────────────────────────────────────────

def generate_page(client, page):
    """
    Call Claude API via streaming and return the HTML string.

    CRITICAL: Uses streaming (messages.stream) not messages.create.
    Pages at max_tokens=64000 exceed the API's 10-minute timeout
    without streaming. Never revert to messages.create here.
    """
    if page["type"] == "hub":
        prompt = get_hub_prompt(page["service"])
    else:
        prompt = get_landing_prompt(page["service"], page["region"], REGIONS)

    system_prompt = get_system_prompt(page["type"])

    html       = ""
    tok_in     = 0
    tok_out    = 0
    stop_reason = None

    # Stream the response — required for long pages
    with client.messages.stream(
        model=MODEL,
        max_tokens=64000,   # MUST be 64000 — see GENERATOR_TECHNICAL_RULES.md Rule 1
        system=system_prompt,
        messages=[{"role": "user", "content": prompt}]
    ) as stream:
        for text in stream.text_stream:
            html += text
        final       = stream.get_final_message()
        tok_in      = final.usage.input_tokens
        tok_out     = final.usage.output_tokens
        stop_reason = final.stop_reason

    # Warn if output was truncated
    # stop_reason == "max_tokens" means the page hit the ceiling and is incomplete
    if stop_reason != "end_turn":
        print(f"\n  ⚠️  WARNING: page may be truncated (stop_reason={stop_reason})")
        print(f"       File saved but verify all sections are present before publishing.")

    # Strip any accidental markdown fences
    html = html.strip()
    if html.startswith("```"):
        html = html[html.find("\n") + 1:]
        if html.strip().endswith("```"):
            html = html[:html.rfind("```")]

    return html.strip(), tok_in, tok_out


# ── RUNNER ────────────────────────────────────────────────────

def run(pages, dry_run=False):
    if not API_KEY:
        print("\n❌  ANTHROPIC_API_KEY not set.")
        print("    Run:  export ANTHROPIC_API_KEY=your_key_here")
        print("    Then: python3 generate.py\n")
        sys.exit(1)

    OUTPUT_DIR.mkdir(exist_ok=True)
    client = anthropic.Anthropic(api_key=API_KEY)
    log    = []

    # Load existing log to allow safe resume
    if LOG_FILE.exists():
        with open(LOG_FILE) as f:
            log = json.load(f)
        already_done = {e["filename"] for e in log if e["status"] == "success"}
        pages = [p for p in pages if p["filename"] not in already_done]
        if already_done:
            print(f"\n↩  Resuming — {len(already_done)} pages already done, {len(pages)} remaining.")

    total = len(pages)
    if total == 0:
        print("\n✅  All pages already generated.")
        print("    Delete generation_log.json to regenerate from scratch.")
        return

    print(f"\n🚀  Generating {total} pages → {OUTPUT_DIR}/")
    print(f"    Model:          {MODEL}")
    print(f"    max_tokens:     64000")
    print(f"    Estimated cost: ${total * 0.06:.2f}–${total * 0.10:.2f} USD\n")

    for i, page in enumerate(pages, 1):
        label = page["url"]
        print(f"  [{i:02d}/{total:02d}] {label} ... ", end="", flush=True)

        if dry_run:
            print("(dry run — skipped)")
            continue

        try:
            html, tok_in, tok_out = generate_page(client, page)

            out_path = OUTPUT_DIR / page["filename"]
            out_path.write_text(html, encoding="utf-8")

            entry = log_result(log, page, "success", tok_in, tok_out)
            print(f"✅  ({tok_out:,} tokens, ${entry['cost_usd']:.3f})")

        except anthropic.RateLimitError:
            print("⏳  Rate limit hit — waiting 60s...")
            time.sleep(60)
            try:
                html, tok_in, tok_out = generate_page(client, page)
                out_path = OUTPUT_DIR / page["filename"]
                out_path.write_text(html, encoding="utf-8")
                entry = log_result(log, page, "success", tok_in, tok_out)
                print(f"✅  (retry ok, ${entry['cost_usd']:.3f})")
            except Exception as e2:
                log_result(log, page, "error", error=str(e2))
                print(f"❌  {e2}")

        except Exception as e:
            log_result(log, page, "error", error=str(e))
            print(f"❌  {e}")

        save_log(log)

        # Polite delay between API calls to avoid rate limiting
        if i < total:
            time.sleep(2)

    print_summary(log)
    build_review_index(pages)


# ── REVIEW INDEX ──────────────────────────────────────────────

def build_review_index(pages):
    """
    Generate a local HTML index of all generated pages.
    Open output/index.html in a browser to preview before publishing.
    """
    client_name = BUSINESS.get("name", "SEO Page Factory")
    brand_colour = BUSINESS.get("colour", "#1a1a2e")

    generated = [p for p in pages if (OUTPUT_DIR / p["filename"]).exists()]

    rows = ""
    for p in generated:
        svc    = p["service"]["name"]
        region = p.get("region", {}).get("name", "—")
        rows += (
            f'<tr>'
            f'<td><a href="{p["filename"]}" target="_blank">{p["url"]}</a></td>'
            f'<td>{p["type"]}</td>'
            f'<td>{svc}</td>'
            f'<td>{region}</td>'
            f'</tr>\n'
        )

    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>{client_name} — SEO Pages Review Index</title>
<style>
  body       {{ font-family: sans-serif; padding: 32px; background: #f5f5f5; margin: 0; }}
  h1         {{ color: #1a1a2e; margin-bottom: 4px; }}
  p          {{ color: #555; margin-top: 0; font-size: 14px; }}
  table      {{ width: 100%; border-collapse: collapse; background: white;
                border-radius: 8px; overflow: hidden;
                box-shadow: 0 1px 4px rgba(0,0,0,0.1); margin-top: 24px; }}
  th         {{ background: {brand_colour}; color: white; padding: 12px 16px;
                text-align: left; font-size: 13px; }}
  td         {{ padding: 11px 16px; border-bottom: 1px solid #eee; font-size: 14px; }}
  a          {{ color: {brand_colour}; text-decoration: none; }}
  a:hover    {{ text-decoration: underline; }}
  tr:hover td {{ background: #f9f9f9; }}
  .badge     {{ display: inline-block; padding: 2px 8px; border-radius: 4px;
                font-size: 11px; font-weight: 600; text-transform: uppercase; }}
  .hub       {{ background: #e8f4fd; color: #0066aa; }}
  .landing   {{ background: #f0faf0; color: #2d6a2d; }}
</style>
</head>
<body>
<h1>{client_name} — Generated Pages</h1>
<p>{len(generated)} pages ready to review. Open any link to preview before publishing.</p>
<table>
<thead>
  <tr><th>URL</th><th>Type</th><th>Service</th><th>Region</th></tr>
</thead>
<tbody>
{rows}
</tbody>
</table>
</body>
</html>"""

    index_path = OUTPUT_DIR / "index.html"
    index_path.write_text(html, encoding="utf-8")
    print(f"\n📋  Review index: {index_path.resolve()}")
    print(f"    Open in browser to preview all generated pages.\n")


# ── CLI ───────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(
        description="SEO Page Factory — Page Generator",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python3 generate.py --list                  Preview all pages without generating
  python3 generate.py --limit 1               Generate first page only (always test first)
  python3 generate.py --limit 3               Generate first 3 pages
  python3 generate.py --service furnaces      All pages for one service
  python3 generate.py --hub-only              Hub pages only
  python3 generate.py --land-only             Landing pages only
  python3 generate.py                         Full batch (skips completed pages)
        """
    )
    parser.add_argument("--list",      action="store_true", help="List all pages without generating")
    parser.add_argument("--dry-run",   action="store_true", help="Show what would run, no API calls")
    parser.add_argument("--limit",     type=int,            help="Only generate first N pages")
    parser.add_argument("--hub-only",  action="store_true", help="Only generate hub pages")
    parser.add_argument("--land-only", action="store_true", help="Only generate landing pages")
    parser.add_argument("--service",   type=str,            help="Only generate pages for this service slug")
    args = parser.parse_args()

    pages = get_pages_to_generate()

    # Apply filters
    if args.hub_only:
        pages = [p for p in pages if p["type"] == "hub"]
    if args.land_only:
        pages = [p for p in pages if p["type"] == "landing"]
    if args.service:
        pages = [p for p in pages if p["service"]["slug"] == args.service]
    if args.limit:
        pages = pages[:args.limit]

    if args.list or args.dry_run:
        print(f"\nPages to generate ({len(pages)}):\n")
        for p in pages:
            print(f"  [{p['type']:7}]  {p['url']}")
        if not args.dry_run:
            return

    run(pages, dry_run=args.dry_run)


if __name__ == "__main__":
    main()
