export interface Project {
  slug:        string;
  title:       string;
  tagline:     string;
  category:    string;
  industry:    string;
  service:     string;
  year:        string;
  client:      string;
  role:        string;
  duration:    string;
  description: string;
  challenge:   string;
  solution:    string;
  tags:        string[];
  cover: string;      // card thumbnail
  // Free public mp4s that work without auth (Cloudflare stream / Mixkit CDN)
  video:   string;   // autoplay preview on card
  hero:    string;   // Unsplash hero on detail page
  screens: string[]; // Unsplash screenshots on detail page
  liveUrl?: string;
  githubUrl?: string;
}

// Using Mixkit free stock videos (no auth, CORS-open CDN)
export const projects: Project[] = [
  {
    slug:     "nexus-dashboard",
    title:    "Nexus Dashboard",
    tagline:  "Real-time SaaS analytics platform",
    category: "Web App",
    industry: "SaaS / Analytics",
    service:  "Full-Stack Development",
    year:     "2024",
    client:   "Nexus Analytics",
    role:     "Lead Frontend Engineer",
    duration: "12 Weeks",
    description:
      "Nexus is a real-time analytics dashboard built for SaaS companies to monitor user behaviour, revenue metrics, and infrastructure health — all in one place.",
    challenge:
      "Existing analytics tools were either too generic or too expensive. The client needed a bespoke dashboard that surfaced the right data, fast, without overwhelming their team.",
    solution:
      "Built with Next.js, TypeScript, and Recharts on the frontend, with a WebSocket-powered live data layer. Every widget is drag-and-drop configurable and persists layout to a PostgreSQL backend.",
    tags: ["Next.js", "TypeScript", "WebSockets", "Recharts", "PostgreSQL", "Tailwind"],
    cover:   "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80&fit=crop",
    video:   "https://res.cloudinary.com/degearesj/video/upload/v1773442261/0302_xc0vzr.mp4",
    hero:    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80&fit=crop",
    screens: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80&fit=crop",
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&q=80&fit=crop",
      "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&q=80&fit=crop",
    ],
    liveUrl:   "https://github.com",
    githubUrl: "https://github.com",
  },
  {
    slug:     "vaultpay",
    title:    "VaultPay",
    tagline:  "Crypto wallet & DeFi interface",
    category: "Web3 App",
    industry: "Fintech / Web3",
    service:  "Frontend Development",
    year:     "2024",
    client:   "VaultPay Inc.",
    role:     "Frontend Engineer",
    duration: "8 Weeks",
    description:
      "VaultPay is a non-custodial crypto wallet interface that lets users manage multi-chain assets, swap tokens, and interact with DeFi protocols — all from a clean, fast web app.",
    challenge:
      "Web3 interfaces are notoriously clunky. Users drop off during wallet connection, gas estimation, and transaction confirmation. We needed to abstract the complexity without hiding it.",
    solution:
      "Built on React + Viem + wagmi with a custom transaction status system and animated state machine. The UI surfaces only what the user needs at each step, reducing drop-off by 40%.",
    tags: ["React", "TypeScript", "wagmi", "Viem", "Web3", "Framer Motion"],
    cover:   "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80&fit=crop",
    video:   "https://mixkit.co/free-stock-video/close-up-of-programming-code-on-a-monitor-display-32952/preview",
    hero:    "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1400&q=80&fit=crop",
    screens: [
      "https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=1200&q=80&fit=crop",
      "https://images.unsplash.com/photo-1640161704729-cbe966a08476?w=1200&q=80&fit=crop",
      "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=1200&q=80&fit=crop",
    ],
    liveUrl:   "https://github.com",
    githubUrl: "https://github.com",
  },
  {
    slug:     "launchkit",
    title:    "LaunchKit",
    tagline:  "Open-source Next.js SaaS starter",
    category: "Open Source",
    industry: "Developer Tooling",
    service:  "Full-Stack Development",
    year:     "2023",
    client:   "Open Source / Community",
    role:     "Creator & Maintainer",
    duration: "Ongoing",
    description:
      "LaunchKit is a production-ready Next.js starter kit with auth, billing, teams, and email baked in. It's the foundation I use for every SaaS project — now open-sourced for the community.",
    challenge:
      "Every new SaaS project starts with the same boring plumbing: auth, Stripe, transactional email, multi-tenancy. I got tired of rebuilding it from scratch and turned my boilerplate into a proper product.",
    solution:
      "A carefully curated monorepo with Next.js 14 App Router, Clerk auth, Stripe subscriptions, Resend email, Drizzle ORM, and a component library — all pre-wired and documented.",
    tags: ["Next.js", "Clerk", "Stripe", "Drizzle ORM", "Resend", "Turborepo"],
    cover:   "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80&fit=crop",
    video:   "https://mixkit.co/free-stock-video/hands-typing-on-a-laptop-keyboard-close-up-2943/preview",
    hero:    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1400&q=80&fit=crop",
    screens: [
      "https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=1200&q=80&fit=crop",
      "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=1200&q=80&fit=crop",
      "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=1200&q=80&fit=crop",
    ],
    liveUrl:   "https://github.com",
    githubUrl: "https://github.com",
  },
  {
    slug:     "storyflow",
    title:    "StoryFlow",
    tagline:  "AI-powered content creation platform",
    category: "AI Web App",
    industry: "Media & Content",
    service:  "Full-Stack Development",
    year:     "2023",
    client:   "StoryFlow Labs",
    role:     "Lead Engineer",
    duration: "10 Weeks",
    description:
      "StoryFlow helps content teams plan, write, and publish with AI assistance. It combines a structured editor, AI co-writing, and a publishing pipeline — replacing 4 different tools with one.",
    challenge:
      "Content teams were juggling Notion, Grammarly, a CMS, and a social scheduler. The context switching was killing productivity. The client needed a single surface that handled the full workflow.",
    solution:
      "Built a novel-editor experience on top of TipTap with a streamed AI writing assistant (OpenAI streaming API), a visual content calendar, and one-click publish to WordPress, Ghost, and social.",
    tags: ["Next.js", "TipTap", "OpenAI", "tRPC", "Prisma", "TypeScript"],
    cover:   "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80&fit=crop",
    video:   "https://mixkit.co/free-stock-video/working-on-a-computer-in-a-dark-room-34307/preview",
    hero:    "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1400&q=80&fit=crop",
    screens: [
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&q=80&fit=crop",
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=1200&q=80&fit=crop",
      "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=1200&q=80&fit=crop",
    ],
    liveUrl:   "https://github.com",
    githubUrl: "https://github.com",
  },
];

export const services = [
  { icon:"⬡", title:"Frontend Development",  desc:"Fast, accessible, pixel-perfect UIs. React, Next.js, and the modern web stack — built to perform.", tools:["Next.js","React","TypeScript","Tailwind","Responsive Design"] },
  { icon:"◈", title:"CMS Development", desc:"Building and managing dynamic websites using CMS platforms with custom themes, plugins, and structured content management.", tools:["WordPress","Themes","Plugins","Content Management"] },
  { icon:"✦", title:"Web Management", desc:"Managing live websites including updates, hosting configuration, backups, and maintaining site performance and security.", tools:["Hosting","cPanel","Maintenance","Security"] },
  { icon:"◎", title:"Performance Optimization", desc:"Improving website speed and efficiency through code optimization, asset compression, and performance best practices.", tools:["Lighthouse","SEO","Caching","Lazy Loading"] },
  { icon:"⟐", title:"Testing & Debugging",  desc:"Identifying, diagnosing, and fixing bugs to ensure websites function correctly across different browsers, devices, and environments.", tools:["Bug Fixing","DevTools","Error Handling"] },
  { icon:"◇", title:"Custom Illustration",    desc:"Designing custom website logos, icons, and SVG illustrations that strengthen brand identity and improve user experience.", tools:["SVG","Figma","Icons","Logo Design"] },
];

export const whyMe = [
  { num:"01", title:"Ship-First Mindset",       desc:"I optimise for shipped, working product over theoretical perfection. Good code today beats perfect code never." },
  { num:"02", title:"TypeScript Everywhere",    desc:"I write typed, self-documenting code from API contract to UI component. Fewer runtime bugs, faster onboarding." },
  { num:"03", title:"Performance Obsessed",     desc:"Every build I ship hits green on Core Web Vitals. Bundle size, load time, and runtime performance are first-class concerns." },
  { num:"04", title:"Clear Communication",      desc:"I write detailed PRs, update async, and document decisions. You'll always know what's in progress and what's blocked." },
  { num:"05", title:"Clean Code Practices",       desc:"I write readable, maintainable code with clear structure and consistent patterns so projects stay easy to scale and collaborate on." },
  { num:"06", title:"Continuous Learning",  desc:"Technology evolves fast, and I stay current by learning new tools and improving workflows." },
];

export const faqs = [
  { q:"What's your preferred tech stack?",         a:"Next.js (App Router) + TypeScript + Tailwind on the frontend, with tRPC + Drizzle ORM + PostgreSQL for the backend. I adapt to existing stacks when needed." },
  { q:"Do you take on freelance projects?",         a:"Yes — I work with startups and product teams on project-based and retainer engagements. Reach out with scope and I'll come back with a proposal." },
  { q:"Can you work with an existing codebase?",    a:"Absolutely. I'm comfortable onboarding into existing repos, writing tests for legacy code, and refactoring incrementally without breaking things." },
  { q:"How do you handle project communication?",   a:"Async-first with daily written updates, weekly video syncs, and a shared Notion for decisions. I keep a low meeting footprint while staying fully aligned." },
  { q:"Do you do design as well as code?",          a:"I have strong design sensibilities and can work from Figma files or build UI from scratch. I partner well with designers and can bridge the design-to-code gap." },
  { q:"What's your availability?",                  a:"Currently open to part-time freelance and select full-time roles. Typical availability is 20–30 hours/week for project work." },
];

export const stats = [
  { value:3,  suffix:"+", label:"Years Experience" },
  { value:18, suffix:"+",label:"GitHub Repos" },
  { value:99, suffix:"%", label:"On-Time Delivery" },
];

export const testimonials = [
  { quote:"Alex rebuilt our frontend from scratch in 8 weeks. Performance went from a 42 Lighthouse score to 98. Our conversion rate jumped 22% the week after launch.", name:"Sarah Chen",       role:"CTO",             company:"Nexus Analytics", avatar:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80&fit=crop&crop=face" },
  { quote:"The cleanest codebase I've inherited. Typed, documented, tested. Alex clearly cares about the engineers who come after him just as much as the product.",     name:"Marcus Williams", role:"Engineering Lead", company:"VaultPay",        avatar:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80&fit=crop&crop=face" },
  { quote:"LaunchKit saved us 3 weeks of setup. We went from idea to paying customers in 12 days. The code quality is exceptional — we haven't had to touch the boilerplate.",name:"Priya Menon",    role:"Founder",         company:"StoryFlow Labs",  avatar:"https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&q=80&fit=crop&crop=face" },
];

export const brands = ["Vercel","Supabase","Cloudinary","Resend","Github","Neon","Upstash","Vscode","WordPress","Chatgpt","Claude ai"];

export const skills = [
  { label:"React / Next.js",  pct:96 },
  { label:"TypeScript",       pct:93 },
  { label:"JavaScript",       pct:90 },
  { label:"CSS / Tailwind",   pct:98 },
  { label:"PostgreSQL",       pct:82 },
  { label:"Web3 / Solidity",  pct:74 },
];
