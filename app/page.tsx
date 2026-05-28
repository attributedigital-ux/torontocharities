import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import {
  Hero,
  EventsSection,
  CausesSection,
  FeaturedSection,
  ClaimSection,
  RecentSection,
  GuidesSection,
  type EventCardData,
  type CauseTileData,
  type CharityCardData,
  type RecentRowData,
  type GuideCardData,
} from '@/components/sections';

/* ============================================================
   Placeholder data — matches the design mock exactly.
   Phase 1 replaces these with database queries:
   - charityCount → SELECT count(*) FROM charities WHERE status='published'
   - upcomingEvents → SELECT ... FROM events WHERE status='approved' AND starts_at >= now() ORDER BY starts_at LIMIT 6
   - causes → SELECT slug, name, count FROM categories JOIN charity_categories ...
   - featured → SELECT ... FROM charities WHERE is_featured=true LIMIT 6
   - recent → SELECT ... FROM charities ORDER BY created_at DESC LIMIT 8
   - guides → SELECT ... FROM guides WHERE status='published' ORDER BY published_at DESC LIMIT 4
   ============================================================ */

const charityCount = 247;

const upcomingEvents: EventCardData[] = [
  {
    href: '/listing/daily-bread-soup-night/',
    date: 'Sat · Jun 14',
    title: 'Soup night at the Etobicoke warehouse',
    host: 'Daily Bread Food Bank',
    location: '191 New Toronto St',
    time: '6:30 PM · Free entry',
    photoCaption: 'Event · Soup night · Daily Bread warehouse',
  },
  {
    href: '/listing/covenant-house-walk/',
    date: 'Sun · Jun 15',
    title: 'Sleep Out: a one-night solidarity walk',
    host: 'Covenant House Toronto',
    location: 'Yonge & Gerrard',
    time: '8:00 PM · $25 registration',
    photoCaption: 'Event · Sleep Out walk · Covenant House',
  },
  {
    href: '/listing/stop-spring-gala/',
    date: 'Tue · Jun 17',
    title: "The Stop's Night Market & community supper",
    host: 'The Stop Community Food Centre',
    location: 'Wychwood Barns',
    time: '7:00 PM · $80',
    photoCaption: 'Event · Night Market · The Stop',
  },
  {
    href: '/listing/humane-society-volunteer/',
    date: 'Wed · Jun 18',
    title: 'Volunteer orientation: shelter operations',
    host: 'Toronto Humane Society',
    location: '11 River St',
    time: '6:00 PM · Free',
    photoCaption: 'Event · Volunteer orientation · Humane Society',
  },
  {
    href: '/listing/sickkids-reading/',
    date: 'Thu · Jun 19',
    title: 'An evening reading: paediatric research in plain language',
    host: 'SickKids Foundation',
    location: 'Lillian H. Smith Branch',
    time: '7:30 PM · Free entry',
    photoCaption: 'Event · Public reading · SickKids',
  },
  {
    href: '/listing/sistering-saturday/',
    date: 'Sat · Jun 21',
    title: 'Saturday drop-in kitchen: meal-prep volunteer shift',
    host: 'Sistering',
    location: '962 Bloor St W',
    time: '9:00 AM · Free',
    photoCaption: 'Event · Drop-in kitchen · Sistering',
  },
];

const causes: CauseTileData[] = [
  { href: '/category/mental-health/', name: 'Mental health', count: 26, caption: 'Mental health · group meeting' },
  { href: '/category/food-security/', name: 'Food security', count: 31, caption: 'Food bank · sorting floor' },
  { href: '/category/housing-homelessness/', name: 'Housing & homelessness', count: 48, caption: 'Shelter intake · evening' },
  { href: '/category/youth-children/', name: 'Youth & children', count: 42, caption: 'After-school programme' },
  { href: '/category/newcomers-refugees/', name: 'Newcomers & refugees', count: 18, caption: 'Newcomer welcome centre' },
  { href: '/category/animal-welfare/', name: 'Animal welfare', count: 11, caption: 'Shelter · kennel hallway' },
  { href: '/category/seniors/', name: 'Seniors', count: 14, caption: 'Senior visit · community room' },
  { href: '/category/arts-culture/', name: 'Arts & culture', count: 19, caption: 'Community theatre · rehearsal' },
  { href: '/category/environment/', name: 'Environment', count: 9, caption: 'Ravine clean-up' },
  { href: '/category/education/', name: 'Education', count: 22, caption: 'Tutoring session' },
  { href: '/category/health-medical/', name: 'Health & medical', count: 17, caption: 'Hospital ward · corridor' },
  { href: '/category/disability/', name: 'Disability', count: 13, caption: 'Accessibility programme' },
  { href: '/category/lgbtq/', name: 'LGBTQ+ communities', count: 8, caption: 'Community centre · LGBTQ' },
  { href: '/category/indigenous/', name: 'Indigenous communities', count: 10, caption: 'Indigenous-led centre' },
  { href: '/category/women-gender/', name: 'Women & gender equity', count: 15, caption: "Women's shelter · kitchen" },
  { href: '/category/legal-aid/', name: 'Legal aid', count: 7, caption: 'Clinic · client interview' },
  { href: '/category/employment-skills/', name: 'Employment & skills', count: 12, caption: 'Job training · workshop' },
  { href: '/category/crisis-trauma/', name: 'Crisis & trauma', count: 9, caption: 'Crisis line · office' },
  { href: '/category/community/', name: 'Community development', count: 16, caption: 'Neighbourhood hub' },
  { href: '/category/interfaith/', name: 'Religious & interfaith', count: 10, caption: 'Interfaith gathering' },
];

const featuredCharities: CharityCardData[] = [
  {
    href: '/profile/daily-bread-food-bank/',
    name: 'Daily Bread Food Bank',
    tags: 'Food security · Community programs',
    description:
      'A central food bank serving over 200 member agencies across the GTA, distributing more than fifty thousand meals a day through neighbourhood programs.',
    photoCaption: 'Charity · Daily Bread · warehouse floor',
  },
  {
    href: '/profile/covenant-house-toronto/',
    name: 'Covenant House Toronto',
    tags: 'Youth services · Housing & homelessness',
    description:
      "Canada's largest agency for homeless and trafficked youth, providing 24-hour crisis housing, transitional programs and continuing care for ages 16 to 24.",
    photoCaption: 'Charity · Covenant House · intake hall',
  },
  {
    href: '/profile/toronto-humane-society/',
    name: 'Toronto Humane Society',
    tags: 'Animal welfare · Veterinary care',
    description:
      'Established 1887, operating a no-kill shelter, low-cost public veterinary clinic, and rescue and rehoming programs for cats, dogs and small companion animals.',
    photoCaption: 'Charity · Humane Society · adoption room',
  },
  {
    href: '/profile/fcj-refugee-centre/',
    name: 'FCJ Refugee Centre',
    tags: 'Newcomers & refugees · Legal aid',
    description:
      'Refugee resettlement, legal accompaniment and transitional housing for newcomers in precarious immigration status, in operation in Toronto since 1991.',
    photoCaption: 'Charity · FCJ · client meeting room',
  },
  {
    href: '/profile/sickkids-foundation/',
    name: 'SickKids Foundation',
    tags: 'Health & medical · Children',
    description:
      "Fundraising and research foundation for The Hospital for Sick Children, supporting paediatric research, clinical care and family resources at Canada's largest children's hospital.",
    photoCaption: 'Charity · SickKids · research floor',
  },
  {
    href: '/profile/the-stop-community-food-centre/',
    name: 'The Stop Community Food Centre',
    tags: 'Food security · Community development',
    description:
      'A community food centre operating drop-in meals, a perinatal program, urban agriculture, advocacy and a market garden out of two locations in the west end.',
    photoCaption: 'Charity · The Stop · community kitchen',
  },
];

const recentlyAdded: RecentRowData[] = [
  { href: '/profile/the-storefront-humber/', name: 'The Storefront Humber', description: 'Drop-in centre and community support for South Etobicoke', added: 'May 22' },
  { href: '/profile/east-end-arts/', name: 'East End Arts', description: 'Community arts council programming festivals and studio space', added: 'May 20' },
  { href: '/profile/black-creek-community-farm/', name: 'Black Creek Community Farm', description: 'Eight-acre farm growing food and running youth programs in Jane & Finch', added: 'May 18' },
  { href: '/profile/parkdale-queen-west-chc/', name: 'Parkdale Queen West CHC', description: 'Community health centre with harm reduction and primary care', added: 'May 16' },
  { href: '/profile/regent-park-school-of-music/', name: 'Regent Park School of Music', description: 'Free, high-quality music lessons for children in priority neighbourhoods', added: 'May 14' },
  { href: '/profile/native-child-and-family-services/', name: 'Native Child and Family Services', description: 'Indigenous-led child welfare and family services across the GTA', added: 'May 12' },
  { href: '/profile/yonge-street-mission/', name: 'Yonge Street Mission', description: 'Long-running downtown agency working on poverty, food and housing', added: 'May 9' },
  { href: '/profile/scadding-court-community-centre/', name: 'Scadding Court Community Centre', description: 'Recreation, citizenship classes and a market in Alexandra Park', added: 'May 7' },
];

const guides: GuideCardData[] = [
  {
    href: '/guide/how-to-donate-to-toronto-charities/',
    category: 'Giving guide',
    title: 'How to donate to Toronto charities: a complete guide',
    dek: 'A practical primer on choosing a charity, reading a T3010 return, setting up a monthly gift, and what to expect from a tax receipt issued in Ontario.',
    readTime: '8 min read',
  },
  {
    href: '/guide/finding-a-volunteer-role/',
    category: 'Volunteer guide',
    title: 'Finding a volunteer role that actually fits your week',
    dek: 'Beyond the one-off Saturday: how to match your skills, schedule and stamina to a charity that needs them, with notes from twelve volunteer coordinators.',
    readTime: '6 min read',
  },
  {
    href: '/guide/year-end-giving-toronto/',
    category: 'Giving guide',
    title: 'Year-end giving: a Toronto-specific calendar',
    dek: 'When deadlines fall in Ontario, how DAFs and stock gifts work, and a working calendar for last-week-of-December decisions that still produce a receipt.',
    readTime: '11 min read',
  },
  {
    href: '/guide/how-to-read-an-impact-report/',
    category: 'Giving guide',
    title: "How to read a charity's impact report without losing the plot",
    dek: 'Program-spend ratios, restricted funds, outcome metrics versus output metrics, what to look for, what to discount, and the questions worth asking the executive director.',
    readTime: '9 min read',
  },
];

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero charityCount={charityCount} />
        <EventsSection events={upcomingEvents} />
        <CausesSection causes={causes} />
        <FeaturedSection charities={featuredCharities} />
        <ClaimSection />
        <RecentSection rows={recentlyAdded} />
        <GuidesSection guides={guides} />
      </main>
      <Footer lastUpdated="May 27, 2026" />
    </>
  );
}
