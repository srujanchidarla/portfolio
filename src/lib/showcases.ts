export interface ArchLayer {
  id: string;
  label: string;
  tech: string;
  description: string;
}

export interface CodeHighlight {
  id: string;
  language: string;
  title: string;
  code: string;
  explanation: string;
}

export interface ArchPattern {
  title: string;
  explanation: string;
  nodes: { name: string; role: string; memo?: boolean }[];
  flows: string[];
}

export interface PerformanceMetric {
  label: string;
  before: string;
  after: string;
}

export interface ProjectShowcase {
  id: string;
  title: string;
  accent: string;
  architecture: ArchLayer[];
  codeHighlights: CodeHighlight[];
  archPattern?: ArchPattern;
  metrics: PerformanceMetric[];
  metricsVerified?: string;
  learnings: string[];
}

export const PROJECT_SHOWCASES: ProjectShowcase[] = [
  {
    id: "studyglobal",
    title: "StudyGlobal",
    accent: "#3b82f6",
    architecture: [
      {
        id: "frontend",
        label: "Frontend",
        tech: "Next.js",
        description: "SSR dashboards, student onboarding flows, and localized content delivery.",
      },
      {
        id: "api",
        label: "Backend API",
        tech: "Node.js",
        description: "REST endpoints for profiles, visa workflows, and university resource lookups.",
      },
      {
        id: "db",
        label: "Database",
        tech: "MongoDB",
        description: "Document store for students, applications, and supporting paperwork metadata.",
      },
      {
        id: "auth",
        label: "Authentication",
        tech: "Auth.js",
        description: "Session-based auth with role separation for students and admin staff.",
      },
      {
        id: "external",
        label: "External Services",
        tech: "University APIs",
        description: "Cost-of-living data, campus resources, and third-party relocation tools.",
      },
    ],
    codeHighlights: [
      {
        id: "query-opt",
        language: "typescript",
        title: "Reduced visa processing by 40% through query optimization",
        code: `// BEFORE: N+1 query problem
const students = await Student.find({ status: 'visa_pending' });
for (const student of students) {
  const docs = await Document.find({ studentId: student._id }); // N queries!
}

// AFTER: Optimized with aggregation
const results = await Student.aggregate([
  { $match: { status: 'visa_pending' } },
  { $lookup: {
      from: 'documents',
      localField: '_id',
      foreignField: 'studentId',
      as: 'docs'
  }}
]);
// Single query, 40% speed improvement!`,
        explanation:
          "The query optimization pattern I used here is fundamental to scaling. By eliminating the N+1 query problem and using MongoDB aggregation pipelines, we reduced response times from 2.5 seconds to 1.5 seconds.",
      },
    ],
    archPattern: {
      title: "Building responsive frontend with component architecture",
      explanation:
        "Used React custom hooks and Context API to manage application state without lifting state too high. This prevents re-renders of unnecessary components and keeps the tree shallow.",
      nodes: [
        { name: "AppShell", role: "Layout + providers" },
        { name: "StudentContext", role: "Shared student state", memo: true },
        { name: "DashboardPage", role: "Route-level data fetch" },
        { name: "VisaTracker", role: "Feature module", memo: true },
        { name: "ResourceCard", role: "Presentational UI" },
      ],
      flows: [
        "Context provides student profile once",
        "Memoized boundaries isolate re-renders",
        "Hooks encapsulate API + loading state",
      ],
    },
    metrics: [
      { label: "Page load time", before: "3.2s", after: "1.9s" },
      { label: "Time to interactive", before: "4.5s", after: "2.1s" },
      { label: "Lighthouse score", before: "65", after: "92" },
    ],
    metricsVerified: "Verified with Google Lighthouse audits on production builds",
    learnings: [
      "Query optimization is half the battle when scaling",
      "Component architecture matters as much as data structure",
      "Testing bottlenecks early prevents rewrites later",
    ],
  },
  {
    id: "jobhuntos",
    title: "JobHuntOS",
    accent: "#0080FF",
    architecture: [
      {
        id: "extension",
        label: "Chrome Extension",
        tech: "Manifest V3",
        description: "Content scripts extract job postings; service worker orchestrates analysis.",
      },
      {
        id: "api",
        label: "Backend API",
        tech: "Node.js / Express",
        description: "SSE streaming endpoints, resume pipeline, and recruiter discovery routes.",
      },
      {
        id: "llm",
        label: "LLM Router",
        tech: "Multi-provider",
        description: "Groq, Gemini, Claude, OpenAI with BYOK fallbacks and rate-limit handling.",
      },
      {
        id: "storage",
        label: "Local Storage",
        tech: "Browser",
        description: "API keys and profile data stay client-side — privacy-first architecture.",
      },
      {
        id: "external",
        label: "External Services",
        tech: "Hunter / Notion",
        description: "Recruiter email discovery and optional application tracking sync.",
      },
    ],
    codeHighlights: [
      {
        id: "sse-stream",
        language: "typescript",
        title: "Streaming fit analysis with provider fallbacks",
        code: `async function streamAnalysis(jobText: string, provider: Provider) {
  const stream = await router.stream({
    provider,
    fallback: ['groq', 'gemini', 'openai'],
    prompt: buildFitPrompt(jobText),
  });

  for await (const chunk of stream) {
    yield sseEvent('token', chunk);
    if (chunk.done) yield sseEvent('score', chunk.fitScore);
  }
}
// Users see results in <2s instead of waiting for full completion`,
        explanation:
          "SSE streaming keeps the UI responsive while LLM tokens arrive. The router tries the user's preferred provider first, then falls back automatically — critical for a BYOK product where any single API might be down.",
      },
    ],
    archPattern: {
      title: "Shadow-DOM form scanning without breaking ATS pages",
      explanation:
        "Content scripts inject an isolated sidebar via shadow DOM so styles never leak into Greenhouse, Workday, or LinkedIn. Form field detection uses a pluggable scanner registry per ATS vendor.",
      nodes: [
        { name: "ContentScript", role: "Page detection" },
        { name: "ShadowSidebar", role: "Isolated UI", memo: true },
        { name: "ScannerRegistry", role: "ATS-specific parsers" },
        { name: "AutofillEngine", role: "Field mapping + fill" },
      ],
      flows: [
        "Detect ATS → load scanner",
        "Extract fields → map to profile",
        "One-click autofill with tailored resume",
      ],
    },
    metrics: [
      { label: "Job analysis time", before: "45s manual", after: "<2s streamed" },
      { label: "Application workflow", before: "15 min", after: "2 min" },
      { label: "ATS platforms supported", before: "1", after: "100+" },
    ],
    learnings: [
      "MV3 service workers need aggressive state persistence patterns",
      "Streaming beats waiting — perceived latency matters more than total time",
      "Privacy-first BYOK builds trust with job seekers",
    ],
  },
  {
    id: "fitconnect",
    title: "FitConnect",
    accent: "#10b981",
    architecture: [
      {
        id: "frontend",
        label: "Frontend",
        tech: "React / Next.js",
        description: "Facility search, booking calendar, and real-time availability views.",
      },
      {
        id: "api",
        label: "Backend API",
        tech: "Node.js",
        description: "Booking engine, slot conflict resolution, and geolocation queries.",
      },
      {
        id: "db",
        label: "Database",
        tech: "PostgreSQL",
        description: "Facilities, time slots, bookings with optimistic locking.",
      },
      {
        id: "geo",
        label: "Geolocation",
        tech: "Maps API",
        description: "Radius search, distance sorting, and facility discovery.",
      },
      {
        id: "realtime",
        label: "Real-time",
        tech: "WebSockets",
        description: "Live slot updates when another user books the same window.",
      },
    ],
    codeHighlights: [
      {
        id: "booking-algo",
        language: "typescript",
        title: "Conflict-free booking with optimistic locking",
        code: `async function bookSlot(facilityId: string, slotId: string, userId: string) {
  return db.transaction(async (tx) => {
    const slot = await tx.slot.findUnique({
      where: { id: slotId },
      select: { version: true, status: true },
    });
    if (slot.status !== 'available') throw new ConflictError();

    return tx.slot.update({
      where: { id: slotId, version: slot.version },
      data: { status: 'booked', userId, version: { increment: 1 } },
    });
  });
}
// Zero double-bookings across concurrent requests`,
        explanation:
          "Version-based optimistic locking prevents race conditions when two users grab the same slot. Combined with WebSocket broadcasts, the UI updates instantly for everyone viewing that facility.",
      },
    ],
    metrics: [
      { label: "Facility discovery time", before: "8 min", after: "<1 min" },
      { label: "Booking completion", before: "4 steps", after: "1 click" },
      { label: "Double-booking incidents", before: "12/mo", after: "0" },
    ],
    learnings: [
      "Geolocation search needs caching — API costs add up fast",
      "Real-time updates are worth the WebSocket complexity for booking UX",
      "Optimistic locking beats pessimistic locks for read-heavy workloads",
    ],
  },
  {
    id: "flightbuddy",
    title: "FlightBuddy",
    accent: "#38bdf8",
    architecture: [
      {
        id: "frontend",
        label: "Frontend",
        tech: "React",
        description: "Flight-search-inspired UI for profile creation and traveler discovery.",
      },
      {
        id: "api",
        label: "Backend API",
        tech: "Node.js / Express",
        description: "Flight validation, matching engine, and messaging endpoints.",
      },
      {
        id: "db",
        label: "Database",
        tech: "MongoDB",
        description: "User profiles, flight itineraries, and match history.",
      },
      {
        id: "auth",
        label: "Authentication",
        tech: "JWT + OAuth",
        description: "Secure sessions with social login for frictionless onboarding.",
      },
      {
        id: "flights",
        label: "Flight Data",
        tech: "Aviation API",
        description: "Real-time flight lookup and airport metadata enrichment.",
      },
    ],
    codeHighlights: [
      {
        id: "matching",
        language: "typescript",
        title: "Multi-filter traveler matching algorithm",
        code: `function findMatches(user: User, flight: Flight): Match[] {
  return db.travelers
    .find({
      'flight.number': flight.number,
      'flight.date': flight.date,
      language: { $in: user.languages },
      $or: [
        { 'origin.city': user.origin.city },
        { 'destination.city': user.destination.city },
      ],
    })
    .sort({ sharedLanguages: -1, seatProximity: 1 })
    .limit(20);
}
// Match by flight, language, and route overlap`,
        explanation:
          "Matching runs on indexed compound queries so results return in milliseconds even as the traveler pool grows. Filters are composable — users can narrow by language, country, or city without rewriting the core query.",
      },
    ],
    archPattern: {
      title: "Authentication flow with social + email fallback",
      explanation:
        "OAuth handles 80% of signups; email/password catches the rest. JWTs are short-lived with refresh rotation stored in httpOnly cookies.",
      nodes: [
        { name: "AuthProvider", role: "OAuth + JWT issue" },
        { name: "ProfileSetup", role: "Post-auth onboarding" },
        { name: "FlightEntry", role: "Itinerary capture" },
        { name: "MatchFeed", role: "Filtered results" },
      ],
      flows: [
        "OAuth → profile stub → flight details",
        "JWT refresh on silent interval",
        "Protected routes gate match features",
      ],
    },
    metrics: [
      { label: "Signup completion", before: "42%", after: "78%" },
      { label: "Match relevance", before: "Manual browse", after: "Filtered feed" },
      { label: "API response time", before: "1.8s", after: "320ms" },
    ],
    learnings: [
      "Familiar UX patterns (flight search) reduce onboarding friction",
      "Compound indexes are essential for multi-filter matching",
      "Auth flexibility (OAuth + email) maximizes conversion",
    ],
  },
];

export function getShowcase(id: string) {
  return PROJECT_SHOWCASES.find((s) => s.id === id);
}
