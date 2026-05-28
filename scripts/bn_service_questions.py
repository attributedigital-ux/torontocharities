# =============================================================
#  BEAUTIFUL NEIGHBOURHOODS — service_questions.py
#  Pre-defined FAQ, buying guide and troubleshooting questions
#  for all 7 services. Claude writes answers only — never
#  invents questions. SEO intent is locked here.
# =============================================================

SERVICE_QUESTIONS = {

    "garden-maintenance": {
        "faq": [
            "How much does garden maintenance cost in {region}?",
            "What does garden maintenance include?",
            "How often should I have my garden maintained in {region}?",
            "Do you offer grass cutting as part of garden maintenance in {region}?",
            "Do you offer one-time garden cleanups in {region}?",
            "What's the difference between garden maintenance and landscaping?",
            "Are you insured to work in {region}?",
            "How do I get a quote for garden maintenance in {region}?",
        ],
        "buying_guide": [
            "How do I know if I need regular garden maintenance or just a one-time cleanup?",
            "What should I look for when hiring a garden maintenance company in {region}?",
            "How much should garden maintenance cost in Ontario?",
            "Is weekly or bi-weekly garden maintenance better?",
            "Should grass cutting be included in my garden maintenance plan?",
            "What happens to my garden if I skip maintenance through summer?",
            "How do I prepare my garden for a first maintenance visit?",
        ],
        "troubleshooting": [
            ("🌿", "Weeds back within two weeks", "Surface weeding removes what's visible but leaves roots intact. Proper hand-weeding at root depth followed by fresh mulch breaks the cycle and keeps beds cleaner between visits."),
            ("💧", "Plants struggling or yellowing", "In Pickering and Ajax, heavy clay soil holds water around roots and causes stress. In Scarborough's older gardens, compacted soil from decades of foot traffic can starve roots of oxygen. Both need different approaches."),
            ("✂️", "Shrubs getting shapeless and leggy", "Most ornamental shrubs need a light shaping after flowering in late spring and again in late summer. Leaving them more than one season makes the job harder and the plant less healthy."),
            ("🍂", "Garden looking tired by midsummer", "A garden that looked good in May often needs deadheading and a refresh by July. Regular visits through peak growing season make the difference between a garden that looks maintained and one that doesn't."),
            ("🌱", "Perennials not returning after winter", "Leaving dead growth on through winter can smother new spring growth. Fall cleanup or early spring cutting-back helps perennials return strongly each year."),
        ],
    },

    "lawn-care": {
        "faq": [
            "How much does lawn care cost in {region}?",
            "How often should I have my lawn cut in {region}?",
            "Do you offer grass cutting only, or do I need a full lawn care plan?",
            "What's the best time of year to aerate a lawn in {region}?",
            "How do I get rid of weeds in my lawn without chemicals?",
            "Why does my lawn have bare patches and how do I fix it?",
            "Do you offer lawn fertilising in {region}?",
            "How do I get a lawn care quote in {region}?",
        ],
        "buying_guide": [
            "What does a lawn care service actually include?",
            "How do I know if my lawn needs aeration or overseeding?",
            "Weekly vs bi-weekly grass cutting — which is right for my lawn?",
            "What's a fair price for lawn care in {region}?",
            "Should I fertilise my lawn in Ontario — and when?",
            "How do I fix a lawn that's been neglected for a season or two?",
            "What grass types grow best in the {region} climate?",
        ],
        "troubleshooting": [
            ("🌱", "Lawn going yellow or brown in patches", "Patchy yellowing in {region} is often chinch bug damage in dry summers, or grub activity in late summer and fall. Early identification makes treatment far easier — a visit during the growing season can confirm what's happening."),
            ("💧", "Lawn stays soggy after rain", "Poor drainage is common in clay-heavy soils across Pickering and parts of Ajax. Core aeration opens up compacted soil and dramatically improves drainage. It's a once-a-year job that makes a visible difference within weeks."),
            ("🌿", "Weeds taking over the lawn", "A weed-heavy lawn is usually a lawn under stress — thin turf from poor soil, shade, or compaction lets weeds move in. Fixing the underlying issue with aeration and overseeding is more effective long-term than repeated weed treatment."),
            ("✂️", "Lawn looks scalped after cutting", "Scalping happens when the grass is cut too short or the mower blades are dull. We cut at the correct height for the season — longer in summer drought, slightly shorter in spring and fall — which keeps the lawn healthier and more weed-resistant."),
            ("🍂", "Thatch building up on the lawn", "A thin layer of thatch is normal. When it exceeds about 1cm it blocks water and nutrients from reaching roots. Dethatching in fall or early spring, followed by aeration, restores a healthy lawn quickly."),
        ],
    },

    "yard-maintenance": {
        "faq": [
            "How much does yard maintenance cost in {region}?",
            "What does yard maintenance include?",
            "Do you do both grass cutting and garden maintenance in the same visit?",
            "How often should I book yard maintenance in {region}?",
            "Do you offer seasonal yard cleanup in {region}?",
            "Can I book yard maintenance for a one-time visit or does it have to be regular?",
            "Are you insured for yard maintenance in {region}?",
            "How do I get a yard maintenance quote in {region}?",
        ],
        "buying_guide": [
            "What's the difference between yard maintenance and garden maintenance?",
            "Should I book yard maintenance or separate lawn and garden services?",
            "How much should yard maintenance cost in {region}?",
            "How often do I need yard maintenance through the season?",
            "What's included in a spring yard cleanup?",
            "What's included in a fall yard cleanup?",
            "How do I find a reliable yard maintenance company in {region}?",
        ],
        "troubleshooting": [
            ("🌿", "Yard completely overgrown after a season", "An overgrown yard can be brought back in a single visit. We tackle it in the right order — cutting first, then clearing beds, then edges — so it looks properly maintained rather than just hacked back."),
            ("🍂", "Leaves taking over the garden beds", "Leaves left on beds through winter compact into a mat that smothers perennials and encourages disease. Fall cleanup before the first frost makes spring recovery significantly easier."),
            ("💧", "Standing water in the yard after rain", "Drainage issues in {region} yards are often a combination of compacted soil and poor grading. We can assess what's happening and recommend whether aeration, raised beds or other solutions would help."),
            ("✂️", "Edges looking ragged between visits", "Sharp bed edges define the whole look of a yard. We re-cut edges on every visit — not just when they need it — so the yard always looks intentional and well-kept."),
            ("🌱", "Yard looking bare and patchy after winter", "A thorough spring cleanup followed by overseeding bare patches and fresh mulch on beds transforms a winter-worn yard quickly. The first visit of the season does the most visible work."),
        ],
    },

    "snow-removal": {
        "faq": [
            "How much does snow removal cost in {region}?",
            "Do you offer seasonal snow removal contracts in {region}?",
            "What's included in your snow removal service?",
            "How quickly do you respond after a snowfall in {region}?",
            "Do you salt driveways and walkways after clearing?",
            "Do you offer per-visit snow removal or only seasonal contracts?",
            "What's the snowfall threshold before you come out?",
            "How do I get a snow removal quote in {region}?",
        ],
        "buying_guide": [
            "Should I sign a seasonal snow removal contract or pay per visit?",
            "What should a snow removal service include?",
            "How much does snow removal cost in {region} — seasonal vs per visit?",
            "What time of morning will my driveway be cleared?",
            "Do I need salting as well as snow clearing?",
            "What happens if it snows multiple times in one week?",
            "How do I choose a reliable snow removal company in {region}?",
        ],
        "troubleshooting": [
            ("❄️", "Ice forming after the driveway is cleared", "Ice formation after clearing is almost always a salting issue — either no salt was applied or not enough for the temperature. We apply salt after every clear as standard. If ice is forming on your property, it needs more than just snow removal."),
            ("🚗", "End-of-driveway ridge from the snowplow", "The municipal plow pushes snow back across cleared driveways — this is inevitable and we account for it. If you're on a seasonal contract with us we monitor and come back when the ridge is significant."),
            ("🧊", "Walkways still slippery after treatment", "Calcium chloride works to about -25°C but loses effectiveness when temperatures drop sharply. We use appropriate products for the temperature — if conditions are severe we'll advise on what's needed."),
            ("⏰", "Driveway not cleared before I need to leave", "We aim to have all clients cleared before 7am on school and work days. If timing is critical for your household, let us know when you book — we can note priority timing for your address."),
            ("📏", "Snow too deep for the snowblower", "Heavy snowfalls above 30cm sometimes require hand shovelling in combination with blowing. We bring what's needed for the conditions — you don't need to worry about equipment limitations."),
        ],
    },

    "property-maintenance": {
        "faq": [
            "How much does property maintenance cost in {region}?",
            "What does a property maintenance plan include?",
            "Do you handle both lawn and garden maintenance in one visit?",
            "Can I get year-round property maintenance in {region}?",
            "Do you offer property maintenance for rental properties in {region}?",
            "How often do you visit for regular property maintenance?",
            "Are you insured for property maintenance in {region}?",
            "How do I get a property maintenance quote in {region}?",
        ],
        "buying_guide": [
            "What's the difference between property maintenance and a garden maintenance plan?",
            "Is year-round property maintenance worth it in {region}?",
            "How much should full property maintenance cost in Ontario?",
            "What should be included in a residential property maintenance plan?",
            "How do I hand over my property to a maintenance company properly?",
            "Can one company handle lawn, garden and snow removal in {region}?",
            "What questions should I ask before hiring a property maintenance company?",
        ],
        "troubleshooting": [
            ("🏡", "Property looking neglected between visits", "Visit frequency is the most common issue. Most residential properties need bi-weekly visits through peak growing season to stay looking well-maintained. Monthly visits work in shoulder seasons only."),
            ("🌿", "Different crews each visit, inconsistent results", "You deal directly with Julian or Saad on every job — not a rotating team of unfamiliar staff. Consistency of who is on the property matters for both results and peace of mind."),
            ("📋", "Not sure what's included in each visit", "We confirm scope before every season and check in after the first visit of a new season. Nothing should be a surprise — if something needs attention that's outside the regular scope we tell you before we do it."),
            ("❄️", "Property not maintained through winter", "Winter property maintenance includes snow removal, salting and checking for any storm damage. Keeping the property maintained through winter protects it for spring and signals that it's occupied and cared for."),
            ("💰", "Property maintenance feels expensive without seeing value", "The value is most visible when you compare — a well-maintained property holds its kerb appeal and value far better than one that's serviced reactively. We can walk you through what each visit covers so the value is clear."),
        ],
    },

    "landscaping": {
        "faq": [
            "How much does landscaping cost in {region}?",
            "What's the difference between landscaping and garden maintenance?",
            "Do you design gardens or just install them?",
            "How long does a landscaping project take in {region}?",
            "What's the best time of year for landscaping in {region}?",
            "Do you do planting as well as design in {region}?",
            "Can you work with my existing garden or does it need to start from scratch?",
            "How do I get a landscaping quote in {region}?",
        ],
        "buying_guide": [
            "What should a landscaping project include?",
            "How do I know if I need landscaping or just ongoing maintenance?",
            "How much should landscaping cost in {region}?",
            "Spring vs fall — when is the best time to landscape in Ontario?",
            "What plants work best in {region}'s climate and soil?",
            "How long before a newly landscaped garden looks established?",
            "What questions should I ask before hiring a landscaping company?",
        ],
        "troubleshooting": [
            ("🌱", "Newly planted garden not establishing well", "New plants need consistent watering through the first season — especially in {region}'s summer dry spells. Most establishment failures are watering issues, not planting issues. We advise on watering schedules for every installation."),
            ("🌿", "Weeds dominating a new garden bed", "New beds are most vulnerable in the first season before plants fill in. A layer of fresh mulch at 5–7cm depth significantly reduces weed pressure while the garden establishes."),
            ("💧", "Plants drowning in clay soil", "Clay soil in parts of Pickering and Ajax holds water around roots and causes plant stress. Raised beds, amended soil and appropriate plant selection for clay conditions solve this at the design stage."),
            ("✂️", "Garden looking overgrown a year after installation", "A landscaping installation is the start, not the finish. Without ongoing maintenance, even a well-designed garden loses its shape quickly. We offer maintenance plans that start the season after installation."),
            ("🎨", "Garden doesn't look how I imagined", "The gap between expectation and result usually comes from unclear briefing at the start. We discuss what you want the garden to feel like — not just what plants you want — before we begin any work."),
        ],
    },

    "outdoor-staging": {
        "faq": [
            "What is outdoor staging and how does it help sell my home?",
            "How much does outdoor staging cost in Pickering, Ajax or Scarborough?",
            "How long before listing should I book outdoor staging?",
            "What does outdoor staging include?",
            "Does outdoor staging actually increase sale price?",
            "Can you do outdoor staging in winter or only in the growing season?",
            "Do I need a full garden overhaul or just a cleanup before selling?",
            "How do I book outdoor staging in Pickering, Ajax or Scarborough?",
        ],
        "buying_guide": [
            "What's the difference between outdoor staging and a regular garden cleanup?",
            "How far in advance should I book outdoor staging before listing?",
            "What return on investment can I expect from outdoor staging?",
            "What does outdoor staging actually involve?",
            "Should I stage indoors and outdoors or just indoors?",
            "What if my garden is in really poor shape — is staging still worth it?",
            "What outdoor staging work gives the best return before a sale?",
        ],
        "troubleshooting": [
            ("🏡", "Garden looks great in person but bad in listing photos", "Listing photos are taken from specific angles — usually from the street and from the rear. We stage with photography in mind, making sure what looks best in frame gets the most attention."),
            ("🌿", "Too much work needed, not enough time before listing", "We prioritise high-impact, fast work — fresh mulch, sharp edges, pruned shrubs and a clean lawn transform how a garden reads without requiring weeks of work. One well-planned visit makes an enormous difference."),
            ("💰", "Worried outdoor staging cost won't be recovered in sale price", "Kerb appeal is the first impression buyers form — often before they've stepped out of the car. Research consistently shows outdoor presentation affects both interest levels and final offers. We focus only on work that has visible impact."),
            ("❄️", "Selling in winter — is outdoor staging still relevant?", "Winter staging focuses on what's visible — clean pathways, tidy beds, no dead growth hanging over paths. A well-presented exterior in winter still reads as cared-for versus neglected, which matters to buyers."),
            ("📸", "Not sure what needs doing before the photographer arrives", "Send us the listing date and we'll tell you exactly what to prioritise. We've staged properties across Pickering, Ajax and Scarborough before hundreds of listing shoots and know what photographers and buyers actually notice."),
        ],
    },
}


def get_service_questions(slug):
    return SERVICE_QUESTIONS.get(slug, {})

def format_faq_for_prompt(slug):
    qs = SERVICE_QUESTIONS.get(slug, {}).get("faq", [])
    return "\n".join([f"  {i+1}. {q}" for i, q in enumerate(qs)])

def format_buying_guide_for_prompt(slug):
    qs = SERVICE_QUESTIONS.get(slug, {}).get("buying_guide", [])
    return "\n".join([f"  {i+1}. {q}" for i, q in enumerate(qs)])

def format_troubleshooting_for_prompt(slug):
    items = SERVICE_QUESTIONS.get(slug, {}).get("troubleshooting", [])
    lines = []
    for i, (emoji, title, desc) in enumerate(items, 1):
        lines.append(f"  Card {i}: {emoji} {title} — {desc}")
    return "\n".join(lines)
