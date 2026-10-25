export type CaseAspect = {
  title: string;
  text: string;
};

export type ExplorePage = {
  title: string;
  note: string;
  href: string;
  image: string;
};

export type CaseStudy = {
  id: string;
  summary: string;
  product: string;
  aspects: readonly CaseAspect[];
  workflow: readonly string[];
  challenges: readonly CaseAspect[];
};

export const CASE_STUDIES: readonly CaseStudy[] = [
  {
    id: "algochronicle",
    summary:
      "A free DSA path that remembers what you solved and builds a plan around the interview you actually have.",
    product:
      "AlgoChronicle is for people who start strong and quit by week two. The homepage, the plan, and the reminders change depending on whether someone is new, practicing casually, or interviewing in a few weeks.",
    aspects: [
      {
        title: "The path",
        text: "159 hand-picked problems across 13 levels, each with a checklist, plus a daily problem, step-by-step visualizers, and spaced reviews.",
      },
      {
        title: "The interview",
        text: "Interview tags come from real reports across 419 companies. A study plan turns the target companies, the interview date, and the daily time into a day-by-day schedule.",
      },
      {
        title: "The streak",
        text: "223+ hand-checked walkthroughs sit on the schedule. Connect LeetCode and solved problems tick themselves. Reviews come back after 1 day, 1 week, and 1 month.",
      },
    ],
    workflow: [
      "Started from the learner, not the content list: a first-timer, a casual practicer, and someone with an interview in three weeks.",
      "Built the roadmap and the company question set so a plan could be generated, not just browsed.",
      "Added hourly jobs for reminders and LeetCode sync, then web push, an installable PWA, and native app shells.",
    ],
    challenges: [
      {
        title: "Three users, one product",
        text: "The entry point, the plan, and the reminders had to change for each kind of learner without becoming three separate products.",
      },
      {
        title: "Progress that is true",
        text: "A lot of the solving happens on LeetCode. The product had to notice that and stay in sync across devices.",
      },
      {
        title: "A reminder that arrives",
        text: "A page does not bring someone back. That took server jobs, web push, and an installable app.",
      },
    ],
  },
  {
    id: "campfirechai",
    summary:
      "A place for outdoor crews to find each other, plan the trip, and handle the logistics in one product.",
    product:
      "Wildmate is a community product for hikes, paddles, climbs, and similar trips. People discover a trip, join a crew, and coordinate permits, gear, meals, carpools, and cost.",
    aspects: [
      {
        title: "Finding a crew",
        text: "Trip discovery and crew matching across 15+ US metro hubs, with member approvals before someone is in.",
      },
      {
        title: "Magic Paste",
        text: "Paste a messy trip idea and get a structured itinerary with geocoded waypoints. Several model providers sit behind it, so a draft still comes back if one fails.",
      },
      {
        title: "The day of the trip",
        text: "Socket.io chat plus shared logistics: gear, meals, carpools, permits, and costs, on the same trip.",
      },
    ],
    workflow: [
      "Made the trip the object everything hangs on: place, crew, permits, and cost.",
      "Built the React frontend and the Express and MongoDB API together, then added real-time chat on that same trip.",
      "Brought Magic Paste in after the core loop worked, with a fallback chain across model providers.",
    ],
    challenges: [
      {
        title: "A paragraph is not a plan",
        text: "People describe a trip in a mess of notes. Turning that into waypoints and stops had to fail softly when a model or a geocoder did.",
      },
      {
        title: "One trip, many writers",
        text: "Chat, gear, and approvals all change the same trip. The product had to keep those updates about one crew, not a pile of side threads.",
      },
      {
        title: "Shipping the whole thing",
        text: "This was the first product I took from the data model through a public deploy, then changed because people used it.",
      },
    ],
  },
  {
    id: "jobhuntos",
    summary: "A Chrome extension that turns a job application into a short, private workflow.",
    product:
      "JobHuntOS reads a posting, talks through fit, tailors a resume, and helps fill the form. The model key stays with the person using it.",
    aspects: [
      {
        title: "Fit, while you read",
        text: "Analysis streams back as you look at the posting, instead of waiting on a full report.",
      },
      {
        title: "The form",
        text: "Resume export and autofill across major boards and ATS platforms, including LinkedIn, Greenhouse, Workday, and Lever.",
      },
      {
        title: "Private by default",
        text: "Bring-your-own-key. The extension can analyze a posting without me holding someone's model account.",
      },
    ],
    workflow: [
      "Treated an application as one flow: read the posting, judge the fit, shape the resume, fill the form.",
      "Built the extension on Manifest V3: content scripts, a service worker, and form scanning that stays inside the page.",
      "Kept the extension thin and put streaming and model fallbacks on a small API.",
    ],
    challenges: [
      {
        title: "Every form is different",
        text: "ATS pages do not share a layout. Scanning had to work inside shadow DOM and still fill more than it missed.",
      },
      {
        title: "Privacy was the product",
        text: "Streaming a resume through a model is sensitive. Bring-your-own-key was how it shipped without storing that account.",
      },
      {
        title: "A stranger has to install it",
        text: "The useful version was the one on the Chrome Web Store, not a demo that only ran on my machine.",
      },
    ],
  },
  {
    id: "neocortex",
    summary: "A local-first system of agents for the parts of my day that used to live in separate apps.",
    product:
      "Neocortex is a personal operating system I am still building. Fitness, career, learning, and planning each have an agent, with a web command center and a phone HUD on one backend.",
    aspects: [
      {
        title: "One job per agent",
        text: "Fifteen agents. Jarvis plans the day, Stark scores career work, Hercules tracks biometrics, Turing runs review, Cicero coaches interviews.",
      },
      {
        title: "The backend",
        text: "FastAPI, a SQLite write queue, and a six-provider model chain so a failed provider is not a failed day.",
      },
      {
        title: "Two surfaces",
        text: "A Next.js command center and an Expo HUD for the phone, including Health Connect, meal photos, and a morning brief.",
      },
    ],
    workflow: [
      "Split the day into domains before writing agents, so each one had a job and a way to be turned off.",
      "Built the backend, the web HUD, and the phone HUD against the same local data.",
      "Added a safety layer with a kill switch per agent, and backend tests, before widening the scope.",
    ],
    challenges: [
      {
        title: "Scope is the risk",
        text: "Fifteen agents only stay understandable if each one owns one thing. A shared junk drawer would have made the system impossible to debug.",
      },
      {
        title: "Providers fail",
        text: "The chain has to answer from the next model without the plan for the day disappearing.",
      },
      {
        title: "Finishing the loop",
        text: "A long side project dies when the next idea is more interesting than the last one working. The work is keeping the current loop finished.",
      },
    ],
  },
  {
    id: "agriwise",
    summary: "One agriculture product for soil, prices, weather, and the schemes that actually pay.",
    product:
      "AgriWise is a digital agriculture platform I built solo. It connects soil and crop guidance, mandi prices, a cultivation calendar, a marketplace, and loan and scheme navigation.",
    aspects: [
      {
        title: "What to grow",
        text: "Soil and crop recommendations, plus a cultivation calendar with weather alerts.",
      },
      {
        title: "What it is worth",
        text: "Prices and 30-day forecasts across 2,500+ mandis, next to a supply-chain marketplace.",
      },
      {
        title: "How it gets paid for",
        text: "Loan and government-scheme navigation, in 22 Indian languages.",
      },
    ],
    workflow: [
      "Treated it as several domains that had to feel like one product: agronomy, markets, weather, and finance.",
      "Shipped module by module until a farmer path crossed all of them.",
      "Used a model only where it changed a recommendation, not as a layer on every screen.",
    ],
    challenges: [
      {
        title: "Fragmented sources",
        text: "Prices, weather, and schemes did not live together. A forecast is useless if tomorrow's action is still unclear.",
      },
      {
        title: "Eight modules, one product",
        text: "The language, the navigation, and the data had to stay shared or the platform would feel like eight websites.",
      },
      {
        title: "Where AI helps",
        text: "The hard call was where a model added signal and where it was noise on top of data that was already enough.",
      },
    ],
  },
  {
    id: "studyglobal",
    summary: "A global starting point for choosing where to study, then planning the money, the application, and the first year.",
    product:
      "Study Chapter lets someone explore destinations before a country is chosen for them. After that, the same product holds services, applications, lessons, a year-one cost calculator, and student discounts.",
    aspects: [
      {
        title: "Where to look",
        text: "A shortlist across popular study destinations, based on subject, budget, and what matters, with official starting points rather than a ranking.",
      },
      {
        title: "What the first year costs",
        text: "A cost calculator for living, net tuition, and the first-month setup bill, so the number is more than rent.",
      },
      {
        title: "After the offer",
        text: "Lessons, application steps, and a board of student discounts people can check on the official page before they pay.",
      },
    ],
    workflow: [
      "Started with discovery: compare destinations before locking a country.",
      "Added the tools people need once a direction exists: applications, lessons, and a cost calculator.",
      "Kept discounts and guides labeled as research aids, and pointed each offer back to its official page.",
    ],
    challenges: [
      {
        title: "Do not choose for them",
        text: "A matcher that picks a country feels like an admissions decision. The product had to shortlist and then get out of the way.",
      },
      {
        title: "Money is more than tuition",
        text: "Students undercount the first month. The calculator had to show living, net tuition, and setup, and still say those numbers are baselines.",
      },
      {
        title: "Discounts go stale",
        text: "Student offers change and some are scams. Each card had to send people to the official page instead of a code from a stranger.",
      },
    ],
  },
];

export const EXPLORE_PAGES: Record<string, readonly ExplorePage[]> = {
  algochronicle: [
    {
      title: "Today",
      note: "The homepage: pick a start, then the problem of the day.",
      href: "https://www.algochronicle.com/",
      image: "/project-pages/algochronicle-today.jpg",
    },
    {
      title: "Learn",
      note: "The roadmap: basics, then 13 levels from arrays to DP.",
      href: "https://www.algochronicle.com/learn",
      image: "/project-pages/algochronicle-learn.jpg",
    },
    {
      title: "Practice",
      note: "The schedule in order, with reviews after 1 day, 1 week, and 1 month.",
      href: "https://www.algochronicle.com/daily-schedule",
      image: "/project-pages/algochronicle-practice.jpg",
    },
    {
      title: "Interview",
      note: "Company questions and a plan built from the date and the daily time.",
      href: "https://www.algochronicle.com/interview",
      image: "/project-pages/algochronicle-interview.jpg",
    },
    {
      title: "LeetCode 75",
      note: "LeetCode’s 75-problem plan as its own track.",
      href: "https://www.algochronicle.com/leetcode-75",
      image: "/project-pages/algochronicle-leetcode.jpg",
    },
    {
      title: "A problem",
      note: "Two Sum: try it, watch the walkthrough, then see who asks it.",
      href: "https://www.algochronicle.com/problem/two-sum",
      image: "/project-pages/algochronicle-problem.jpg",
    },
    {
      title: "Cheatsheet",
      note: "When to use two pointers, sliding window, BFS/DFS, and DP.",
      href: "https://www.algochronicle.com/cheatsheet",
      image: "/project-pages/algochronicle-cheatsheet.jpg",
    },
  ],
  campfirechai: [
    {
      title: "Home",
      note: "Find people, pick a place, plan the outing, then share it.",
      href: "https://wildmate.app/",
      image: "/project-pages/wildmate-home.jpg",
    },
    {
      title: "Explore",
      note: "Six lanes: trails, water, adventure, slow days, hobbies, and drives.",
      href: "https://wildmate.app/explore",
      image: "/project-pages/wildmate-explore.jpg",
    },
    {
      title: "Outings",
      note: "Search hikes, paddles, and climbs by hub, activity, and distance.",
      href: "https://wildmate.app/outings/search",
      image: "/project-pages/wildmate-outings.jpg",
    },
    {
      title: "Trails",
      note: "Places to go, with the stats up front.",
      href: "https://wildmate.app/trails",
      image: "/project-pages/wildmate-trails.jpg",
    },
    {
      title: "Permits",
      note: "Lottery deadlines, closures, and park alerts in one bulletin.",
      href: "https://wildmate.app/permits",
      image: "/project-pages/wildmate-permits.jpg",
    },
    {
      title: "Park kits",
      note: "A few signature activities per park, then an outing with a crew.",
      href: "https://wildmate.app/parks",
      image: "/project-pages/wildmate-parks.jpg",
    },
  ],
  jobhuntos: [
    {
      title: "Product site",
      note: "Fit score, ATS check, tailored bullets, and a Notion tracker.",
      href: "https://job-hunt-os-eosin.vercel.app/",
      image: "/project-pages/jobhuntos-home.jpg",
    },
    {
      title: "Features",
      note: "What the extension does on a posting, from analysis to outreach.",
      href: "https://job-hunt-os-eosin.vercel.app/features",
      image: "/project-pages/jobhuntos-features.jpg",
    },
    {
      title: "How it works",
      note: "Open a job, click JobHuntOS, then apply with the tailored draft.",
      href: "https://job-hunt-os-eosin.vercel.app/how-it-works",
      image: "/project-pages/jobhuntos-how.jpg",
    },
    {
      title: "Chrome Web Store",
      note: "The install page. 4.0 from 4 ratings, offered as a free extension.",
      href: "https://chromewebstore.google.com/detail/jobhuntos/cmdfelnbelngbjahjeglfkaoeclcnjec",
      image: "/project-pages/jobhuntos-store.jpg",
    },
  ],
  agriwise: [
    {
      title: "Home",
      note: "The farmer path: soil, prices, cultivation, supply, and finance.",
      href: "https://agriwise-mauve.vercel.app/",
      image: "/project-pages/agriwise-home.jpg",
    },
    {
      title: "Soil analysis",
      note: "Enter a soil test and get a crop recommendation.",
      href: "https://agriwise-mauve.vercel.app/soil-analysis",
      image: "/project-pages/agriwise-soil.jpg",
    },
    {
      title: "Market",
      note: "Prices from 2,500+ mandis, with alerts and a live table.",
      href: "https://agriwise-mauve.vercel.app/market",
      image: "/project-pages/agriwise-market.jpg",
    },
    {
      title: "Cultivation",
      note: "A calendar for the season, with weather in the plan.",
      href: "https://agriwise-mauve.vercel.app/cultivation",
      image: "/project-pages/agriwise-cultivation.jpg",
    },
    {
      title: "Supply chain",
      note: "Inputs, equipment, and buyers in one marketplace.",
      href: "https://agriwise-mauve.vercel.app/supply-chain",
      image: "/project-pages/agriwise-supply.jpg",
    },
    {
      title: "Finance",
      note: "Loans, insurance, and the schemes that pay for the season.",
      href: "https://agriwise-mauve.vercel.app/finance",
      image: "/project-pages/agriwise-finance.jpg",
    },
    {
      title: "Weather",
      note: "Forecasts and risk alerts for a specific place.",
      href: "https://agriwise-mauve.vercel.app/weather",
      image: "/project-pages/agriwise-weather.jpg",
    },
  ],
  studyglobal: [
    {
      title: "Home",
      note: "Start from goals, not from a country someone else picked.",
      href: "https://studyglobalscholar.netlify.app/",
      image: "/project-pages/study-home.jpg",
    },
    {
      title: "Explore destinations",
      note: "A shortlist from subject, budget, and what matters.",
      href: "https://studyglobalscholar.netlify.app/study-match",
      image: "/project-pages/study-match.jpg",
    },
    {
      title: "Services",
      note: "The support around the move, once a direction exists.",
      href: "https://studyglobalscholar.netlify.app/services",
      image: "/project-pages/study-services.jpg",
    },
    {
      title: "Applications",
      note: "The application steps in one place.",
      href: "https://studyglobalscholar.netlify.app/applications",
      image: "/project-pages/study-applications.jpg",
    },
    {
      title: "Lessons",
      note: "Guides for the parts of the move that are easy to miss.",
      href: "https://studyglobalscholar.netlify.app/guides",
      image: "/project-pages/study-guides.jpg",
    },
    {
      title: "Cost calculator",
      note: "Year-one money: living, net tuition, and the first-month bill.",
      href: "https://studyglobalscholar.netlify.app/tools/cost-calculator",
      image: "/project-pages/study-cost.jpg",
    },
    {
      title: "Student discounts",
      note: "Offers to check on the official page, not a code from a stranger.",
      href: "https://studyglobalscholar.netlify.app/tools/student-discounts",
      image: "/project-pages/study-discounts.jpg",
    },
  ],
};

const COVER_IMAGE: Record<string, string> = {
  algochronicle: "/project-pages/algochronicle-today.jpg",
  campfirechai: "/project-pages/wildmate-home.jpg",
  jobhuntos: "/project-pages/jobhuntos-home.jpg",
  agriwise: "/project-pages/agriwise-home.jpg",
  studyglobal: "/project-pages/study-home.jpg",
};

const COVER_LABEL: Record<string, string> = {
  algochronicle: "Learning",
  campfirechai: "Community",
  jobhuntos: "Product",
  neocortex: "AI systems",
  agriwise: "AgriTech",
  studyglobal: "EdTech",
};

export function explorePages(id: string) {
  return EXPLORE_PAGES[id] ?? [];
}

export function getCaseStudy(id: string) {
  return CASE_STUDIES.find((item) => item.id === id);
}

export function coverImage(id: string) {
  return COVER_IMAGE[id];
}

export function coverLabel(id: string) {
  return COVER_LABEL[id] ?? "Project";
}
