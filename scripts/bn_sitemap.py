# =============================================================
#  BEAUTIFUL NEIGHBOURHOODS — sitemap.py
#  Services, regions, tier logic and business details.
#  DO NOT change slugs after pages are live.
# =============================================================

BUSINESS = {
    "name":      "Beautiful Neighbourhoods",
    "url":       "https://beautifulneighbourhoods.com",
    "phone":     "(289) 892-2235",
    "phone_raw": "+12898922235",
    "email":     "beautifulneighbourhoods@gmail.com",
    "address":   "566 Rougemount Drive, Pickering ON L1W 2C2",
    "owners":    "Julian & Saad",
    "years":     "8",
    "clients":   "400+",
    "colour":    "#1C3A2A",
    "ghl_chat":  "69b72f0bf04e2384a41e2cd2",
}

# ── REGIONS ───────────────────────────────────────────────────
REGIONS = [
    {
        "slug": "pickering",
        "name": "Pickering",
        "sub":  "City of Pickering",
        "local_notes": "Heavy clay soils west of Brock Road; newer fill soil in Seaton developments; waterfront properties near Frenchman's Bay; established neighbourhoods in Liverpool, Dunbarton, Woodlands, Rougemount, Highbush",
        "housing": "Mix of 1980s–90s detached homes, newer Seaton townhomes, and established bungalows in south Pickering near the waterfront",
    },
    {
        "slug": "ajax",
        "name": "Ajax",
        "sub":  "Town of Ajax",
        "local_notes": "Newer subdivisions around Bayly/Salem corridor with builder-grade landscaping; established south Ajax gardens near the waterfront; strong community of long-term homeowners in central Ajax",
        "housing": "Mix of newer townhomes and detached homes in north Ajax, established bungalows and two-storey homes in south Ajax, waterfront properties along Ajax shoreline",
    },
    {
        "slug": "scarborough",
        "name": "Scarborough",
        "sub":  "Scarborough, Toronto",
        "local_notes": "Older bungalow and semi-detached stock in Clairlea, Birchcliff, Birchmount Park; Bluffs properties with sandy eroded soil; dense residential in Scarborough Village and Guildwood; smaller garden footprints than Pickering/Ajax",
        "housing": "Dense older bungalows and semis throughout most of Scarborough; larger lots near the Bluffs; post-war housing stock that often has established perennial gardens",
    },
]

# ── KEY REGIONS (for tier 2 services) ─────────────────────────
KEY_REGIONS = ["pickering", "ajax", "scarborough"]  # all 3 for BN

# ── SERVICES ──────────────────────────────────────────────────
SERVICES = [
    {
        "slug":       "garden-maintenance",
        "name":       "Garden Maintenance",
        "noun":       "Garden",
        "h1_actions": "Maintenance & Care",
        "tier":       1,
        "includes_grass": True,
        "description": "Grass cutting, weeding, pruning, deadheading, edging, mulching, seasonal cleanup",
    },
    {
        "slug":       "lawn-care",
        "name":       "Lawn Care",
        "noun":       "Lawn",
        "h1_actions": "Care & Maintenance",
        "tier":       1,
        "includes_grass": True,
        "description": "Grass cutting, edging, fertilising, aeration, overseeding, weed control",
    },
    {
        "slug":       "yard-maintenance",
        "name":       "Yard Maintenance",
        "noun":       "Yard",
        "h1_actions": "Maintenance & Cleanup",
        "tier":       1,
        "includes_grass": True,
        "description": "Full yard care including grass cutting, garden maintenance, cleanup and general property upkeep",
    },
    {
        "slug":       "snow-removal",
        "name":       "Snow Removal",
        "noun":       "Snow Removal",
        "h1_actions": "& Ice Control",
        "tier":       1,
        "includes_grass": False,
        "description": "Driveway and walkway snow clearing, salting, seasonal contracts and on-call service",
    },
    {
        "slug":       "property-maintenance",
        "name":       "Property Maintenance",
        "noun":       "Property",
        "h1_actions": "Maintenance & Care",
        "tier":       1,
        "includes_grass": True,
        "description": "Year-round residential property care including lawn, garden, snow removal and general upkeep",
    },
    {
        "slug":       "landscaping",
        "name":       "Landscaping",
        "noun":       "Landscaping",
        "h1_actions": "& Garden Design",
        "tier":       1,
        "includes_grass": False,
        "description": "Garden bed creation, planting, mulching, edging and outdoor space improvement",
    },
    {
        "slug":       "outdoor-staging",
        "name":       "Outdoor Staging",
        "noun":       "Outdoor Staging",
        "h1_actions": "& Curb Appeal",
        "tier":       3,   # hub only — Durham-wide
        "includes_grass": False,
        "description": "Pre-sale outdoor staging and curb appeal enhancement for Pickering, Ajax and Scarborough homeowners",
    },
]


def get_pages_to_generate():
    """
    Returns a flat list of all pages to generate.
    Each item: {type, service, region (optional), url, filepath}
    filepath uses folder/index.html structure for Netlify.
    """
    pages = []

    for svc in SERVICES:

        # Hub page
        pages.append({
            "type":     "hub",
            "service":  svc,
            "url":      f"/{svc['slug']}/",
            "filepath": f"{svc['slug']}/index.html",
            "filename": f"hub__{svc['slug']}.html",  # for log
        })

        # Landing pages — skip tier 3 (hub only)
        if svc["tier"] == 3:
            continue

        if svc["tier"] == 1:
            eligible = REGIONS
        elif svc["tier"] == 2:
            eligible = [r for r in REGIONS if r["slug"] in KEY_REGIONS]

        for region in eligible:
            pages.append({
                "type":     "landing",
                "service":  svc,
                "region":   region,
                "url":      f"/{svc['slug']}/{region['slug']}/",
                "filepath": f"{svc['slug']}/{region['slug']}/index.html",
                "filename": f"{svc['slug']}__{region['slug']}.html",
            })

    return pages


if __name__ == "__main__":
    pages = get_pages_to_generate()
    hubs     = [p for p in pages if p["type"] == "hub"]
    landings = [p for p in pages if p["type"] == "landing"]
    print(f"Total pages: {len(pages)}")
    print(f"  Hub pages:     {len(hubs)}")
    print(f"  Landing pages: {len(landings)}")
    print()
    for p in pages:
        print(f"  [{p['type']:7}]  {p['url']}")
