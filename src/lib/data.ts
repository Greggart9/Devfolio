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
    slug:     "essential",
    title:    "ESSENTIAL",
    tagline:  "Full-Stack E-Commerce & Content Platform",
    category: "Web App",
    industry: "E-commerce / SaaS",
    service:  "Full-Stack Development",
    year:     "2026",
    client:   "Personal Project",
    role:     "Lead Engineer",
    duration: "2 Weeks",
    description:
      "Essential is a full-stack e-commerce and content platform built for a beauty and skincare brand to sell products, publish blog content, and manage everything from a custom admin panel.",
    challenge:
      "The client needed a fully custom storefront — no Shopify, no templates. A platform they own completely, with a blog, cart system, and the ability to manage all content without touching code.",
    solution:
      "Built with Next.js and PostgreSQL on a serverless architecture. Features a product store with cart, blog system, live search, Cloudinary image uploads, email notifications via Resend, rate limiting with Upstash Redis, and a password-protected admin panel with full CRUD on all content.",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Resend", "Cloudinary", "Tailwind", "Upstash", "Vercel", "Framer Motion"],
    cover:   "https://res.cloudinary.com/degearesj/image/upload/v1771338552/asset8_fehfol.png",
    video:   "https://res.cloudinary.com/degearesj/video/upload/v1773442261/0302_xc0vzr.mp4",
    hero:    "https://res.cloudinary.com/degearesj/image/upload/v1771338552/asset8_fehfol.png",
    screens: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80&fit=crop",
      "/image/asset2.png",
      "/image/asset3.png",
    ],
    liveUrl:   "https://ecommerce9.vercel.app/",
    githubUrl: "https://github.com/Greggart9/ecommerce",
  },
  {
    slug:     "gregatek",
    title:    "Gregatek",
    tagline:  "Modern Tech Development Platform",
    category: "Website",
    industry: "Technology / Web Development",
    service:  "Frontend Development",
    year:     "2026",
    client:   "Personal Project",
    role:     "Frontend Developer",
    duration: "2 Weeks",
    description:
      "Gregatek is a modern tech website focused on building fast, scalable, and visually engaging digital experiences. The platform showcases modern web development practices, interactive UI components, and clean frontend architecture built with the latest technologies.",
    challenge:
      "Creating a tech-focused platform that balances strong visual design with performance and scalability. The goal was to build a modern interface that feels dynamic and professional while maintaining fast load times, responsive layouts, and clean code architecture.",
    solution:
      "Gregatek was built using modern frontend technologies including Next.js, TypeScript, and Tailwind CSS. Framer Motion powers smooth UI animations and micro-interactions, while a modular component structure ensures scalability and maintainability. The result is a fast, responsive tech website designed for performance and clean user experience.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    cover:   "/image/asset6.png",
    video:   "https://res.cloudinary.com/degearesj/video/upload/v1773442048/smaller_screen_jzyo54.mp4",
    hero:    "/image/asset10.jpg",
    screens: [
      "https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=1200&q=80&fit=crop",
      "/image/asset7.png",
      "/image/asset8.png",
    ],
    liveUrl:   "https://gregatek.vercel.app/",
    githubUrl: "https://github.com/Greggart9/gregatek",
  },
  {
    slug:     "gregtodo",
    title:    "Greg To do",
    tagline:  "Task Manager App",
    category: "Web App",
    industry: "Productivity",
    service:  "Frontend Development",
    year:     "2026",
    client:   "Personal Project",
    role:     "Frontend Developer",
    duration: "24 Hours",
    description:
      "Greg To do is a premium task management app built for developers and power users who want beauty without sacrificing function. It supports categorised tasks, due dates, inline editing, and persistent storage — all wrapped in a luxury dark glassmorphism UI with a custom cursor and animated background.",
    challenge:
      "Most to do apps are either too plain or too bloated. The goal was to build something that feels genuinely premium — cinematic animations, glassmorphic cards, a living cursor orb — while staying snappy, keyboard-friendly, and completely stateless (no backend needed).",
    solution:
      "Built with React and TypeScript on Vite. All state persists via localStorage so tasks survive refreshes. Features include category filtering with animated pills, colour-coded category badges, a shimmer gold progress bar, floating background orbs, and a lag-interpolated cursor ball using requestAnimationFrame. Fully responsive with staggered entrance animations on every load.",
    tags: ["React", "TypeScript","Vite", "Tailwind CSS"],
    cover:   "/image/asset13.jpg",
    video:   "https://res.cloudinary.com/degearesj/video/upload/v1773715267/gregtodo_xihrao.mp4",
    hero:    "/image/asset13.jpg",
    screens: [
      "https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=1200&q=80&fit=crop",
      "/image/asset11.png",
      "/image/asset12.png",
    ],
    liveUrl:   "https://gregtodo.vercel.app/",
    githubUrl: "https://github.com/Greggart9/gregtodo",
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
