/**
 * Every step between typing "google.com" and seeing the page, as data for the packet map
 * and the flowchart on /writing/google-com. Decisions carry both exits: the answer that
 * keeps the trip on its main line (`pass`) and every way out of it (`exits`).
 */

export type LayerId = "l7" | "l6" | "l4" | "l3" | "l2" | "l1";
export type StepShape = "terminal" | "process" | "decision" | "io" | "data";
export type ActorId = "browser" | "os" | "router" | "isp" | "dns" | "backbone" | "edge" | "server";
/** error: the trip ends · retry: try again · skip: jump ahead · loop: start over */
export type ExitKind = "error" | "retry" | "skip" | "loop";

export type JourneyLayer = { id: LayerId; name: string; short: string; color: string };
export type JourneyActor = {
  id: ActorId;
  label: string;
  sub: string;
  /** Position on the wide (desktop) map, in % of the stage */
  x: number;
  y: number;
  /** Position on the tall (phone) map */
  mx: number;
  my: number;
};
export type JourneyPhase = { name: string; blurb: string; background: readonly string[] };
export type StepExit = {
  when: string;
  then: string;
  kind: ExitKind;
  /** Extra time this exit costs, for the running clock */
  ms?: number;
};
export type JourneyStep = {
  id: string;
  phase: number;
  layer: LayerId;
  shape: StepShape;
  title: string;
  detail: string;
  from: ActorId;
  to: ActorId;
  /** Rough time this step adds, for the running clock */
  ms: number;
  /** What rides on the packet dot while this step plays */
  packet?: string;
  /** The answer that keeps the trip on the main line */
  pass?: string;
  exits?: readonly StepExit[];
};

export const JOURNEY_LAYERS: readonly JourneyLayer[] = [
  { id: "l7", name: "Application", short: "L7", color: "#8b5cf6" },
  { id: "l6", name: "Presentation · TLS", short: "L6", color: "#ec4899" },
  { id: "l4", name: "Transport", short: "L4", color: "#0ea5e9" },
  { id: "l3", name: "Network", short: "L3", color: "#10b981" },
  { id: "l2", name: "Data link", short: "L2", color: "#f59e0b" },
  { id: "l1", name: "Physical", short: "L1", color: "#94a3b8" },
];

export const SHAPE_NAMES: Record<StepShape, string> = {
  terminal: "Start / end",
  process: "Process",
  decision: "Decision",
  io: "Message on the wire",
  data: "Cache / lookup",
};

export const EXIT_KINDS: Record<ExitKind, { name: string; symbol: string; color: string }> = {
  error: { name: "Fails", symbol: "✗", color: "#ef4444" },
  retry: { name: "Retries", symbol: "↻", color: "#f59e0b" },
  skip: { name: "Skips ahead", symbol: "»", color: "#22c55e" },
  loop: { name: "Starts over", symbol: "↺", color: "#38bdf8" },
};

export const JOURNEY_ACTORS: readonly JourneyActor[] = [
  { id: "browser", label: "Browser", sub: "Chrome tab", x: 6, y: 64, mx: 24, my: 6 },
  { id: "os", label: "OS stack", sub: "kernel · NIC", x: 20, y: 64, mx: 24, my: 19 },
  { id: "router", label: "Home router", sub: "NAT · gateway", x: 35, y: 64, mx: 24, my: 32 },
  { id: "isp", label: "ISP", sub: "edge router", x: 50, y: 64, mx: 24, my: 46 },
  { id: "dns", label: "DNS", sub: "resolver · root · TLD", x: 50, y: 26, mx: 72, my: 46 },
  { id: "backbone", label: "Internet", sub: "BGP · 10–20 ASes", x: 65, y: 64, mx: 24, my: 61 },
  { id: "edge", label: "Google edge", sub: "Anycast · Maglev", x: 80, y: 64, mx: 24, my: 76 },
  { id: "server", label: "Web server", sub: "GFE · frontend", x: 94, y: 64, mx: 24, my: 91 },
];

/** The main left-to-right line of the map; DNS hangs off the ISP. */
export const MAP_TRACK: readonly ActorId[] = ["browser", "os", "router", "isp", "backbone", "edge", "server"];

export const JOURNEY_PHASES: readonly JourneyPhase[] = [
  {
    name: "Application",
    blurb: "Turn what you typed into an address the network understands.",
    background: [
      "The omnibox may have pre-resolved DNS and pre-opened a connection while you were still typing.",
      "Happy Eyeballs races IPv6 against IPv4 so one broken path never stalls the load.",
      "If the system resolver is slow, Chrome's own async DNS client may answer instead.",
    ],
  },
  {
    name: "Transport",
    blurb: "Open a reliable, encrypted pipe to Google.",
    background: [
      "TCP starts with a small congestion window (slow start) and grows it as ACKs return.",
      "On a repeat visit, TLS session resumption cuts the handshake to zero round trips.",
      "Stapled OCSP proves the certificate isn't revoked without a second lookup.",
    ],
  },
  {
    name: "Network",
    blurb: "Wrap the request layer by layer and get it out of the house.",
    background: [
      "The ARP answer is cached, so the next packet skips the broadcast.",
      "MSS and MTU are sized so packets never need to be fragmented.",
      "Wi-Fi quietly retransmits frames lost to interference at layer 2.",
    ],
  },
  {
    name: "Internet",
    blurb: "Cross 10–20 independent networks to reach Google.",
    background: [
      "TTL counts down at every hop so a routing loop can't circulate a packet forever.",
      "Congested routers queue, mark (ECN) or drop packets; TCP notices and slows down.",
      "BGP sessions keep updating routes underneath you as links fail and recover.",
    ],
  },
  {
    name: "Server",
    blurb: "Land on the nearest edge and the right machine behind it.",
    background: [
      "Health checks pull failing backends out of the load balancer's hash ring.",
      "Every request is logged, traced and counted for metrics and abuse detection.",
      "Static pieces may be answered straight from the edge cache, never touching origin.",
    ],
  },
  {
    name: "Return",
    blurb: "Bring the bytes home and turn them into pixels.",
    background: [
      "CSS, JS and images are fetched in parallel over the same multiplexed HTTP/2 connection.",
      "The connection is kept alive for the next request instead of handshaking again.",
      "Cookies, the HTTP cache and the DNS answer are saved, so the next visit is faster.",
    ],
  },
];

export const JOURNEY_STEPS: readonly JourneyStep[] = [
  // ── Application
  {
    id: "enter",
    phase: 0,
    layer: "l7",
    shape: "terminal",
    title: "Type google.com, press Enter",
    detail:
      "Each keystroke already ran autocomplete against your history and suggestions. Enter commits whatever is in the omnibox.",
    from: "browser",
    to: "browser",
    ms: 0,
  },
  {
    id: "url-or-search",
    phase: 0,
    layer: "l7",
    shape: "decision",
    title: "URL or search term?",
    detail:
      "The omnibox looks for a scheme, a dot and a known top-level domain. “google.com” parses as a host, so the browser builds https://google.com/ instead of running a search.",
    from: "browser",
    to: "browser",
    ms: 1,
    pass: "URL",
    exits: [{ when: "Search term", then: "Send the text to the default search engine instead.", kind: "skip" }],
  },
  {
    id: "hsts",
    phase: 0,
    layer: "l7",
    shape: "decision",
    title: "On the HSTS preload list?",
    detail:
      "google.com ships inside the browser's built-in HSTS list, so the browser never tries plain HTTP. It upgrades to HTTPS internally before a single packet leaves.",
    from: "browser",
    to: "browser",
    ms: 0,
    pass: "Yes: HTTPS only",
    exits: [
      {
        when: "Not listed",
        then: "Try http:// first, get a 301 to https://, and start the request again.",
        kind: "loop",
        ms: 60,
      },
    ],
  },
  {
    id: "service-worker",
    phase: 0,
    layer: "l7",
    shape: "decision",
    title: "Service worker answers?",
    detail:
      "If the site registered a service worker, it intercepts the request first and may answer from its own cache.",
    from: "browser",
    to: "browser",
    ms: 0,
    pass: "No match: use the network",
    exits: [
      {
        when: "Cached response",
        then: "The worker answers from Cache Storage and the network is never touched.",
        kind: "skip",
      },
    ],
  },
  {
    id: "dns-cache",
    phase: 0,
    layer: "l7",
    shape: "data",
    title: "Check the DNS caches",
    detail:
      "Browser host cache, then the OS resolver cache and the hosts file. A warm cache answers in microseconds.",
    from: "browser",
    to: "os",
    ms: 1,
    pass: "Miss",
    exits: [{ when: "Hit", then: "Use the cached IP and skip the whole DNS lookup.", kind: "skip" }],
  },
  {
    id: "dns-query",
    phase: 0,
    layer: "l7",
    shape: "io",
    title: "Ask the recursive resolver",
    detail:
      "The OS sends a UDP query on port 53 (or DNS-over-HTTPS) to the resolver it learned from DHCP, usually your ISP's or a public one like 8.8.8.8.",
    from: "os",
    to: "dns",
    ms: 8,
    packet: "A? google.com",
  },
  {
    id: "dns-walk",
    phase: 0,
    layer: "l7",
    shape: "process",
    title: "Root → .com → Google's name servers",
    detail:
      "On a miss the resolver walks the hierarchy: a root server points to the .com TLD servers, which point to ns1.google.com. Every answer is cached for its TTL.",
    from: "dns",
    to: "dns",
    ms: 20,
  },
  {
    id: "dns-ok",
    phase: 0,
    layer: "l7",
    shape: "decision",
    title: "Did DNS answer?",
    detail: "The resolver either returns records (NOERROR), says the name doesn't exist, or never replies.",
    from: "dns",
    to: "dns",
    ms: 0,
    pass: "NOERROR",
    exits: [
      {
        when: "NXDOMAIN",
        then: "The name doesn't exist. The browser shows DNS_PROBE_FINISHED_NXDOMAIN and the trip ends.",
        kind: "error",
      },
      {
        when: "Timeout",
        then: "Retry after a second, then try the next configured resolver before giving up.",
        kind: "retry",
        ms: 1000,
      },
    ],
  },
  {
    id: "dns-answer",
    phase: 0,
    layer: "l7",
    shape: "io",
    title: "Answer: an Anycast IP",
    detail:
      "Google's name server returns A and AAAA records, something like 142.250.x.x. The same address is announced from dozens of places around the world.",
    from: "dns",
    to: "os",
    ms: 8,
    packet: "142.250.x.x",
  },

  // ── Transport
  {
    id: "reuse",
    phase: 1,
    layer: "l4",
    shape: "decision",
    title: "Connection already open?",
    detail:
      "Browsers keep connections alive and pool them per origin. A warm one means no handshakes at all.",
    from: "browser",
    to: "browser",
    ms: 0,
    pass: "No: first visit",
    exits: [
      {
        when: "Yes",
        then: "Skip TCP and TLS entirely and send the request on the open HTTP/2 connection.",
        kind: "skip",
      },
    ],
  },
  {
    id: "h3",
    phase: 1,
    layer: "l4",
    shape: "decision",
    title: "HTTP/3 available?",
    detail:
      "If a previous response (or a DNS HTTPS record) advertised HTTP/3 via Alt-Svc, the browser can use QUIC instead of TCP.",
    from: "browser",
    to: "browser",
    ms: 0,
    pass: "No: use TCP",
    exits: [
      {
        when: "Yes (Alt-Svc)",
        then: "QUIC over UDP: transport and TLS 1.3 set up together in one round trip, with no TCP handshake.",
        kind: "skip",
      },
    ],
  },
  {
    id: "socket",
    phase: 1,
    layer: "l4",
    shape: "process",
    title: "Open a socket to port 443",
    detail:
      "The browser asks the OS for a TCP socket to 142.250.x.x:443. The kernel picks an ephemeral source port, which completes the connection's 5-tuple.",
    from: "browser",
    to: "os",
    ms: 0,
  },
  {
    id: "syn",
    phase: 1,
    layer: "l4",
    shape: "io",
    title: "SYN",
    detail:
      "The client picks a random initial sequence number and advertises its receive window, MSS and options like SACK and window scaling.",
    from: "os",
    to: "edge",
    ms: 12,
    packet: "SYN",
  },
  {
    id: "synack-ok",
    phase: 1,
    layer: "l4",
    shape: "decision",
    title: "Did the SYN-ACK come back?",
    detail: "The client waits on a retransmission timer for the server's reply.",
    from: "os",
    to: "os",
    ms: 0,
    pass: "Yes",
    exits: [
      {
        when: "No reply",
        then: "Resend the SYN after ~1 s, then 2 s, 4 s… and finally show ERR_CONNECTION_TIMED_OUT.",
        kind: "retry",
        ms: 1000,
      },
      {
        when: "RST",
        then: "Nothing is listening on that port: ERR_CONNECTION_REFUSED.",
        kind: "error",
      },
    ],
  },
  {
    id: "synack",
    phase: 1,
    layer: "l4",
    shape: "io",
    title: "SYN-ACK",
    detail: "The server acknowledges the client's sequence number plus one and sends its own.",
    from: "edge",
    to: "os",
    ms: 12,
    packet: "SYN-ACK",
  },
  {
    id: "ack",
    phase: 1,
    layer: "l4",
    shape: "io",
    title: "ACK: connection open",
    detail:
      "One round trip in, the connection is ESTABLISHED. The client doesn't wait: the TLS hello rides in the very next flight.",
    from: "os",
    to: "edge",
    ms: 1,
    packet: "ACK",
  },
  {
    id: "client-hello",
    phase: 1,
    layer: "l6",
    shape: "io",
    title: "TLS 1.3 ClientHello",
    detail:
      "Supported cipher suites, an X25519 key share, SNI = google.com so the server knows which certificate to use, and ALPN offering h2 and http/1.1.",
    from: "browser",
    to: "edge",
    ms: 12,
    packet: "ClientHello",
  },
  {
    id: "server-hello",
    phase: 1,
    layer: "l6",
    shape: "io",
    title: "ServerHello + certificate",
    detail:
      "The server picks a suite and sends its key share, then (already encrypted) its certificate chain, a signature proving it holds the private key, and Finished. All in one flight.",
    from: "edge",
    to: "browser",
    ms: 12,
    packet: "ServerHello",
  },
  {
    id: "cert",
    phase: 1,
    layer: "l6",
    shape: "decision",
    title: "Certificate trusted?",
    detail:
      "The browser checks the chain up to a root it trusts, the hostname, the expiry date and Certificate Transparency logs.",
    from: "browser",
    to: "browser",
    ms: 2,
    pass: "Valid chain and hostname",
    exits: [
      {
        when: "Untrusted or expired",
        then: "A full-page NET::ERR_CERT_* warning. No request is sent.",
        kind: "error",
      },
      {
        when: "No shared cipher",
        then: "The handshake aborts with ERR_SSL_VERSION_OR_CIPHER_MISMATCH.",
        kind: "error",
      },
    ],
  },
  {
    id: "keys",
    phase: 1,
    layer: "l6",
    shape: "process",
    title: "Keys derived, HTTP/2 agreed",
    detail:
      "Both sides derive the same session keys from the key exchange. TLS 1.3 costs one round trip (zero on resumption), and ALPN settles on h2.",
    from: "browser",
    to: "browser",
    ms: 1,
  },

  // ── Network
  {
    id: "http-request",
    phase: 2,
    layer: "l7",
    shape: "process",
    title: "Build the HTTP request",
    detail:
      "GET / with Host, User-Agent, Accept, cookies and Accept-Encoding, packed as an HPACK-compressed HTTP/2 HEADERS frame and encrypted into a TLS record.",
    from: "browser",
    to: "os",
    ms: 1,
    packet: "GET /",
  },
  {
    id: "tcp-wrap",
    phase: 2,
    layer: "l4",
    shape: "process",
    title: "Wrap it in a TCP segment",
    detail:
      "The kernel adds source and destination ports, sequence and ack numbers, flags and a checksum, splitting the data to fit the MSS.",
    from: "os",
    to: "os",
    ms: 0,
  },
  {
    id: "ip-wrap",
    phase: 2,
    layer: "l3",
    shape: "process",
    title: "Wrap it in an IP packet",
    detail: "Source 192.168.1.23, destination 142.250.x.x, TTL 64, protocol 6 (TCP).",
    from: "os",
    to: "os",
    ms: 0,
  },
  {
    id: "subnet",
    phase: 2,
    layer: "l3",
    shape: "decision",
    title: "Destination on my subnet?",
    detail:
      "The routing table compares the address against the local subnet mask. Google isn't on your Wi-Fi, so the packet goes to the default gateway: your router.",
    from: "os",
    to: "os",
    ms: 0,
    pass: "No: send to the gateway",
    exits: [{ when: "Yes", then: "ARP for that host directly and deliver it on the local network.", kind: "skip" }],
  },
  {
    id: "arp",
    phase: 2,
    layer: "l2",
    shape: "data",
    title: "ARP: who has 192.168.1.1?",
    detail:
      "To build a frame the OS needs the router's MAC address. On a cache miss it broadcasts the question and the router replies with its MAC.",
    from: "os",
    to: "router",
    ms: 1,
    packet: "ARP who-has",
    pass: "Miss: broadcast",
    exits: [{ when: "Cached", then: "Use the stored MAC address; no broadcast needed.", kind: "skip" }],
  },
  {
    id: "frame",
    phase: 2,
    layer: "l1",
    shape: "io",
    title: "Frame onto the wire",
    detail:
      "An Ethernet or 802.11 frame wraps the packet with both MAC addresses and a CRC, then the network card turns the bits into voltage or radio symbols.",
    from: "os",
    to: "router",
    ms: 2,
    packet: "Frame",
  },

  // ── Internet
  {
    id: "nat",
    phase: 3,
    layer: "l3",
    shape: "process",
    title: "NAT rewrites the source",
    detail:
      "The router swaps your private address and port for its public IP and a fresh port, and remembers the mapping so it can route the reply back to you.",
    from: "router",
    to: "router",
    ms: 0,
  },
  {
    id: "isp",
    phase: 3,
    layer: "l3",
    shape: "io",
    title: "Into the ISP's network",
    detail: "Over cable, fiber or DSL to your ISP's edge router, the first hop outside your home.",
    from: "router",
    to: "isp",
    ms: 5,
    packet: "IP packet",
  },
  {
    id: "bgp",
    phase: 3,
    layer: "l3",
    shape: "process",
    title: "BGP picks the path",
    detail:
      "Each of the 70,000+ autonomous systems advertises the address ranges it can reach. Your ISP picks the best AS path toward Google's AS15169, often through a direct peering link.",
    from: "isp",
    to: "backbone",
    ms: 20,
  },
  {
    id: "hops",
    phase: 3,
    layer: "l3",
    shape: "process",
    title: "Hop by hop",
    detail:
      "Every router decrements the TTL, does a longest-prefix match in its forwarding table and sends the packet out the next interface. The frame is rebuilt each hop; the IP packet stays the same.",
    from: "backbone",
    to: "edge",
    ms: 15,
    packet: "TTL 64 → 52",
  },
  {
    id: "delivered",
    phase: 3,
    layer: "l4",
    shape: "decision",
    title: "Did it arrive?",
    detail: "Nothing in IP guarantees delivery. TCP finds out from the acknowledgements that do, or don't, come back.",
    from: "edge",
    to: "edge",
    ms: 0,
    pass: "ACKed",
    exits: [
      {
        when: "Lost on a busy hop",
        then: "Duplicate ACKs (or a timeout) trigger a retransmit, and TCP halves its congestion window.",
        kind: "retry",
        ms: 30,
      },
      {
        when: "TTL hit 0",
        then: "A router drops it and sends back ICMP Time Exceeded. That's exactly what traceroute uses.",
        kind: "error",
      },
    ],
  },

  // ── Server
  {
    id: "anycast",
    phase: 4,
    layer: "l3",
    shape: "process",
    title: "Anycast lands at the nearest edge",
    detail:
      "Because the same IP is announced from many points of presence, BGP naturally delivers you to the closest one, often in your own metro area.",
    from: "edge",
    to: "edge",
    ms: 5,
  },
  {
    id: "maglev",
    phase: 4,
    layer: "l4",
    shape: "decision",
    title: "Maglev picks a backend",
    detail:
      "Google's Maglev load balancer hashes the connection's 5-tuple with consistent hashing, so every packet of this connection reaches the same frontend.",
    from: "edge",
    to: "edge",
    ms: 1,
    pass: "Healthy backend",
    exits: [
      {
        when: "Backend down",
        then: "Health checks already pulled it from the hash ring; the next healthy one takes the connection.",
        kind: "retry",
      },
    ],
  },
  {
    id: "gfe",
    phase: 4,
    layer: "l7",
    shape: "process",
    title: "Front end terminates TLS",
    detail:
      "The Google Front End decrypts the request, applies DoS protection and routing rules, and forwards it over Google's private backbone to the service that owns “/”.",
    from: "edge",
    to: "server",
    ms: 3,
    packet: "GET /",
  },
  {
    id: "build",
    phase: 4,
    layer: "l7",
    shape: "process",
    title: "Server builds the response",
    detail:
      "It reads your cookies, picks a locale and any experiments, renders the homepage HTML (much of it cached) and compresses it with Brotli or gzip.",
    from: "server",
    to: "server",
    ms: 30,
  },
  {
    id: "status",
    phase: 4,
    layer: "l7",
    shape: "decision",
    title: "What status comes back?",
    detail: "The status line decides what the browser does next.",
    from: "server",
    to: "server",
    ms: 0,
    pass: "200 OK",
    exits: [
      {
        when: "301 / 302",
        then: "Follow the Location header and start over from DNS for the new host (for example www.google.com).",
        kind: "loop",
      },
      { when: "304", then: "Not Modified: reuse the cached copy, no body is sent.", kind: "skip" },
      {
        when: "5xx",
        then: "Retry if the request is safe to repeat; otherwise show the server's error page.",
        kind: "error",
      },
    ],
  },

  // ── Return
  {
    id: "response",
    phase: 5,
    layer: "l7",
    shape: "io",
    title: "200 OK streams back",
    detail:
      "The response is encrypted, segmented and routed home, not necessarily along the same path. Internet routing is often asymmetric.",
    from: "server",
    to: "browser",
    ms: 40,
    packet: "200 OK",
  },
  {
    id: "dom",
    phase: 5,
    layer: "l7",
    shape: "process",
    title: "Parse HTML into the DOM",
    detail:
      "Bytes are decoded and tokenized into the DOM tree. The preload scanner spots CSS, JS and images and requests them over the same connection.",
    from: "browser",
    to: "browser",
    ms: 10,
  },
  {
    id: "cssom",
    phase: 5,
    layer: "l7",
    shape: "process",
    title: "CSS becomes the CSSOM",
    detail: "Stylesheets are parsed into the CSSOM. Nothing paints until render-blocking CSS arrives.",
    from: "browser",
    to: "browser",
    ms: 5,
  },
  {
    id: "paint",
    phase: 5,
    layer: "l7",
    shape: "process",
    title: "Layout, paint, composite",
    detail:
      "DOM and CSSOM combine into the render tree. Layout computes geometry, paint fills layers with pixels, and the GPU compositor puts them on screen.",
    from: "browser",
    to: "browser",
    ms: 15,
  },
  {
    id: "done",
    phase: 5,
    layer: "l7",
    shape: "terminal",
    title: "The page is on screen",
    detail:
      "Usually 100–500 ms after Enter, depending on what was cached, how far away the edge is and how busy the network is.",
    from: "browser",
    to: "browser",
    ms: 0,
  },
];

export const layerOf = (id: LayerId) => JOURNEY_LAYERS.find((l) => l.id === id)!;
export const actorOf = (id: ActorId) => JOURNEY_ACTORS.find((a) => a.id === id)!;

// ── Scenarios: the same steps replayed down different exits

/** One beat of a scenario: a step, optionally taking one of its exits, or lost in flight. */
export type JourneyFrame = { step: number; exit?: number; drop?: boolean };
export type JourneyScenario = {
  id: string;
  label: string;
  group: "path" | "failure";
  blurb: string;
  frames: readonly JourneyFrame[];
};

const indexOf = (id: string) => {
  const i = JOURNEY_STEPS.findIndex((s) => s.id === id);
  if (i < 0) throw new Error(`Unknown journey step: ${id}`);
  return i;
};

/** Frames for every step from `from` to `to`, minus `skip`, taking the exits in `take`. */
function span(
  from: string,
  to: string,
  { skip = [], take = {} }: { skip?: string[]; take?: Record<string, number> } = {}
): JourneyFrame[] {
  const frames: JourneyFrame[] = [];
  for (let i = indexOf(from); i <= indexOf(to); i++) {
    const { id } = JOURNEY_STEPS[i];
    if (skip.includes(id)) continue;
    frames.push(id in take ? { step: i, exit: take[id] } : { step: i });
  }
  return frames;
}

const exitAt = (id: string, exit: number): JourneyFrame => ({ step: indexOf(id), exit });
const lostAt = (id: string): JourneyFrame => ({ step: indexOf(id), drop: true });

const HANDSHAKE = ["socket", "syn", "synack-ok", "synack", "ack", "client-hello", "server-hello", "cert", "keys"];
const DNS_LOOKUP = ["dns-query", "dns-walk", "dns-ok", "dns-answer"];

export const JOURNEY_SCENARIOS: readonly JourneyScenario[] = [
  {
    id: "happy",
    label: "First visit",
    group: "path",
    blurb: "Cold caches, every step runs once and everything works.",
    frames: span("enter", "done"),
  },
  {
    id: "repeat",
    label: "Repeat visit",
    group: "path",
    blurb: "DNS, ARP and the connection are all warm, so whole phases disappear.",
    frames: span("enter", "done", {
      skip: [...DNS_LOOKUP, "h3", ...HANDSHAKE],
      take: { "dns-cache": 0, reuse: 0, arp: 0 },
    }),
  },
  {
    id: "http3",
    label: "HTTP/3 (QUIC)",
    group: "path",
    blurb: "UDP instead of TCP: no three-way handshake, TLS built into the transport.",
    frames: span("enter", "done", {
      skip: ["socket", "syn", "synack-ok", "synack", "ack", "client-hello", "server-hello", "tcp-wrap"],
      take: { h3: 0 },
    }),
  },
  {
    id: "nxdomain",
    label: "DNS: no such name",
    group: "failure",
    blurb: "A typo like goggle.cm: the resolver says the name doesn't exist.",
    frames: [...span("enter", "dns-walk"), exitAt("dns-ok", 0)],
  },
  {
    id: "syn-lost",
    label: "SYN lost",
    group: "failure",
    blurb: "The first SYN vanishes; the client waits a second and tries again.",
    frames: [...span("enter", "socket"), lostAt("syn"), exitAt("synack-ok", 0), ...span("syn", "done")],
  },
  {
    id: "bad-cert",
    label: "Bad certificate",
    group: "failure",
    blurb: "The handshake reaches the certificate check and stops cold.",
    frames: [...span("enter", "server-hello"), exitAt("cert", 0)],
  },
  {
    id: "packet-loss",
    label: "Packet loss",
    group: "failure",
    blurb: "A congested router drops the request mid-route; TCP resends it.",
    frames: [...span("enter", "bgp"), lostAt("hops"), exitAt("delivered", 0), ...span("hops", "done")],
  },
  {
    id: "redirect",
    label: "301 redirect",
    group: "failure",
    blurb: "The server answers “moved”, and the whole trip starts over for the new host.",
    frames: [...span("enter", "build"), exitAt("status", 0), ...span("dns-cache", "done")],
  },
  {
    id: "server-error",
    label: "500 error",
    group: "failure",
    blurb: "Everything on the network works, then the server itself fails.",
    frames: [...span("enter", "build"), exitAt("status", 2)],
  },
];

/** Where a scenario first leaves the main path, so picking one starts near the interesting part. */
export function scenarioStart(scenario: JourneyScenario) {
  const first = scenario.frames.findIndex((f) => f.exit !== undefined || f.drop);
  return first <= 0 ? 0 : Math.max(0, first - 2);
}

/** Total time up to and including a frame. */
export function elapsedAt(frames: readonly JourneyFrame[], index: number) {
  let total = 0;
  for (const frame of frames.slice(0, index + 1)) {
    const step = JOURNEY_STEPS[frame.step];
    total += frame.exit !== undefined ? step.exits![frame.exit].ms ?? 0 : frame.drop ? 0 : step.ms;
  }
  return total;
}

/** For the flowchart's "play this" buttons: the scenario (and frame) that takes a given exit. */
export function scenarioForExit(step: number, exit: number) {
  for (const scenario of JOURNEY_SCENARIOS) {
    const frame = scenario.frames.findIndex((f) => f.step === step && f.exit === exit);
    if (frame >= 0) return { scenario, frame };
  }
  return null;
}
