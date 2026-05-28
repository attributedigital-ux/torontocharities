"""
Site Builder
============
Assembles pages from templates and outputs to dist/.

Usage:
  python build.py            # build all pages
  python build.py --watch    # rebuild on file changes (requires: pip install watchdog)

How it works:
  1. Reads config.json      → site-wide settings (name, phone, GA ID etc.)
  2. Reads pages.json       → list of pages with title, description, output path
  3. For each page, renders the Jinja2 template wrapped in base.html
  4. Writes the result to dist/

To add a new page:
  1. Create templates/pages/my-page.html
  2. Add an entry to pages.json
  3. Run python build.py
"""

import json
import os
import shutil
import argparse
from jinja2 import Environment, FileSystemLoader


# ── Config ──────────────────────────────────────────────────────────────────

BASE_DIR     = os.path.dirname(os.path.abspath(__file__))
TEMPLATES_DIR = os.path.join(BASE_DIR, 'templates')
STYLES_DIR   = os.path.join(BASE_DIR, 'styles')
DIST_DIR     = os.path.join(BASE_DIR, 'dist')
CONFIG_FILE  = os.path.join(BASE_DIR, 'config.json')
PAGES_FILE   = os.path.join(BASE_DIR, 'pages.json')


# ── Build ────────────────────────────────────────────────────────────────────

def build():
    # Load site config and pages manifest
    with open(CONFIG_FILE) as f:
        config = json.load(f)
    with open(PAGES_FILE) as f:
        pages = json.load(f)

    # Set up Jinja2 — all config values available in every template
    env = Environment(
        loader=FileSystemLoader(TEMPLATES_DIR),
        autoescape=False,
        trim_blocks=True,
        lstrip_blocks=True,
    )
    env.globals.update(config)

    # Copy styles to dist
    dist_styles = os.path.join(DIST_DIR, 'styles')
    os.makedirs(dist_styles, exist_ok=True)
    shutil.copytree(STYLES_DIR, dist_styles, dirs_exist_ok=True)
    print(f'Copied styles → dist/styles/')

    # Copy images if they exist
    images_dir = os.path.join(BASE_DIR, 'images')
    if os.path.exists(images_dir):
        dist_images = os.path.join(DIST_DIR, 'images')
        shutil.copytree(images_dir, dist_images, dirs_exist_ok=True)
        print(f'Copied images → dist/images/')

    # Build each page
    built = 0
    errors = 0
    for page in pages:
        try:
            template = env.get_template(page['template'])
            rendered = template.render(**page)

            output_path = os.path.join(DIST_DIR, page['output'])
            os.makedirs(os.path.dirname(output_path), exist_ok=True)

            with open(output_path, 'w') as f:
                f.write(rendered)

            print(f'  ✓  {page["output"]}')
            built += 1

        except Exception as e:
            print(f'  ✗  {page["output"]} — ERROR: {e}')
            errors += 1

    print(f'\nDone — {built} pages built', end='')
    print(f', {errors} errors' if errors else '')


# ── Watch mode ───────────────────────────────────────────────────────────────

def watch():
    try:
        from watchdog.observers import Observer
        from watchdog.events import FileSystemEventHandler
        import time
    except ImportError:
        print('Watch mode requires watchdog: pip install watchdog')
        return

    class RebuildHandler(FileSystemEventHandler):
        def on_modified(self, event):
            if event.src_path.endswith(('.html', '.css', '.json')):
                print(f'\nChange detected: {event.src_path}')
                build()

    print('Watching for changes (Ctrl+C to stop)...')
    build()

    observer = Observer()
    observer.schedule(RebuildHandler(), BASE_DIR, recursive=True)
    observer.start()
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
    observer.join()


# ── Entry point ───────────────────────────────────────────────────────────────

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Build the site')
    parser.add_argument('--watch', action='store_true', help='Watch for changes and rebuild')
    args = parser.parse_args()

    if args.watch:
        watch()
    else:
        build()
