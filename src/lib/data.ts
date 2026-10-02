export interface Project {
  slug: string;
  title: string;
  tagline: string;
  category: string;
  industry: string;
  service: string;
  year: string;
  client: string;
  role: string;
  duration: string;
  description: string;
  challenge: string;
  solution: string;
  tags: string[];
  cover: string;      // card thumbnail
  // Free public mp4s that work without auth (Cloudflare stream / Mixkit CDN)
  video: string;   // autoplay preview on card
  hero: string;   // Unsplash hero on detail page
  screens: string[]; // Unsplash screenshots on detail page
  liveUrl?: string;
  githubUrl?: string;
}

// Using Mixkit free stock videos (no auth, CORS-open CDN)
export const projects: Project[] = [
  {
    slug: "aldena",
    title: "ALDENA",
    tagline: "Creative Agency",
    category: "Website",
    industry: "Creative / Design Agency",
    service: "Frontend Development",
    year: "2026",
    client: "Personal Project",
    role: "Frontend Developer & UI Designer",
    duration: "1 Weeks",
    description:
      "Aldena is an editorial-grade creative agency platform designed to showcase brand identities, digital products, and design systems through interactive card stacks, fluid typography, and scroll-driven micro-interactions.",
    challenge:
      "Creating an ultra-refined design agency site that blends heavy editorial typography with complex scroll animations without compromising performance, mobile responsiveness, or accessibility across viewports.",
    solution:
      "Built with Next.js App Router, TypeScript, and Tailwind CSS. Integrated GSAP ScrollTrigger for pinned interactive testimonial card stacks, custom drop-text scroll effects, marquee logo tickers, dynamic project slug routes, and responsive grid layouts.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "GSAP", "Framer Motion", "Lucide React", "Vercel"],
    cover: "https://res.cloudinary.com/degearesj/image/upload/v1790435878/asset2_o9qubq.png",
    video: "https://res.cloudinary.com/degearesj/video/upload/v1790436508/aldena_ffu2lq.mp4",
    hero: "https://res.cloudinary.com/degearesj/image/upload/v1790435878/asset2_o9qubq.png",
    screens: [
      "/image/asset29.webp",
      "/image/asset30.webp",
    ],
    liveUrl: "https://aldena.oluwadamilare.xyz/",
    githubUrl: "https://github.com/Greggart9/Aldena",
  },

  {
    slug: "essential",
    title: "ESSENTIAL",
    tagline: "Full-Stack E-Commerce & Content Platform",
    category: "Web App",
    industry: "E-commerce / SaaS",
    service: "Full-Stack Development",
    year: "2026",
    client: "Personal Project",
    role: "Full-Stack Developer",
    duration: "2 Weeks",
    description:
      "Essential is a full-stack e-commerce and content platform built for a beauty and skincare brand to sell products, publish blog content, and manage everything from a custom admin panel.",
    challenge:
      "The client needed a fully custom storefront — no Shopify, no templates. A platform they own completely, with a blog, cart system, and the ability to manage all content without touching code.",
    solution:
      "Built with Next.js and PostgreSQL on a serverless architecture. Features a product store with cart, blog system, live search, Cloudinary image uploads, email notifications via Resend, rate limiting with Upstash Redis, and a password-protected admin panel with full CRUD on all content.",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Resend", "Cloudinary", "Tailwind", "Upstash", "Vercel", "Framer Motion"],
    cover: "https://res.cloudinary.com/degearesj/image/upload/v1771338552/asset8_fehfol.png",
    video: "https://res.cloudinary.com/degearesj/video/upload/v1773442261/0302_xc0vzr.mp4",
    hero: "https://res.cloudinary.com/degearesj/image/upload/v1771338552/asset8_fehfol.png",
    screens: [
      "/image/asset2.webp",
      "/image/asset3.webp",
    ],
    liveUrl: "https://essential.oluwadamilare.xyz/",
    githubUrl: "https://github.com/Greggart9/ecommerce",
  },
  {
    slug: "gregatek",
    title: "Gregatek",
    tagline: "Modern Tech Development Platform",
    category: "Website",
    industry: "Technology / Web Development",
    service: "Frontend Development",
    year: "2026",
    client: "Personal Project",
    role: "Frontend Developer",
    duration: "2 Weeks",
    description:
      "Gregatek is a modern tech website focused on building fast, scalable, and visually engaging digital experiences. The platform showcases modern web development practices, interactive UI components, and clean frontend architecture built with the latest technologies.",
    challenge:
      "Creating a tech-focused platform that balances strong visual design with performance and scalability. The goal was to build a modern interface that feels dynamic and professional while maintaining fast load times, responsive layouts, and clean code architecture.",
    solution:
      "Gregatek was built using modern frontend technologies including Next.js, TypeScript, and Tailwind CSS. Framer Motion powers smooth UI animations and micro-interactions, while a modular component structure ensures scalability and maintainability. The result is a fast, responsive tech website designed for performance and clean user experience.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    cover: "/image/asset6.webp",
    video: "https://res.cloudinary.com/degearesj/video/upload/v1773442048/smaller_screen_jzyo54.mp4",
    hero: "/image/asset10.webp",
    screens: [
      "/image/asset7.webp",
      "/image/asset8.webp",
    ],
    liveUrl: "https://gregatek.oluwadamilare.xyz/",
    githubUrl: "https://github.com/Greggart9/gregatek",
  },
  {
    slug: "gregtodo",
    title: "Greg To do",
    tagline: "Task Manager App",
    category: "Web App",
    industry: "Productivity",
    service: "Frontend Development",
    year: "2026",
    client: "Personal Project",
    role: "Frontend Developer",
    duration: "24 Hours",
    description:
      "Greg To do is a premium task management app built for developers and power users who want beauty without sacrificing function. It supports categorised tasks, due dates, inline editing, and persistent storage — all wrapped in a luxury dark glassmorphism UI with a custom cursor and animated background.",
    challenge:
      "Most to do apps are either too plain or too bloated. The goal was to build something that feels genuinely premium — cinematic animations, glassmorphic cards, a living cursor orb — while staying snappy, keyboard-friendly, and completely stateless (no backend needed).",
    solution:
      "Built with React and TypeScript on Vite. All state persists via localStorage so tasks survive refreshes. Features include category filtering with animated pills, colour-coded category badges, a shimmer gold progress bar, floating background orbs, and a lag-interpolated cursor ball using requestAnimationFrame. Fully responsive with staggered entrance animations on every load.",
    tags: ["React", "TypeScript", "Vite", "Tailwind CSS"],
    cover: "/image/asset13.webp",
    video: "https://res.cloudinary.com/degearesj/video/upload/v1773715267/gregtodo_xihrao.mp4",
    hero: "/image/asset13.webp",
    screens: [
      "/image/asset11.webp",
      "/image/asset12.webp",
    ],
    liveUrl: "https://gregtodo.oluwadamilare.xyz/",
    githubUrl: "https://github.com/Greggart9/gregtodo",
  },
  {
    slug: "mygresume",
    title: "MyGresume",
    tagline: "Upload. Tailor. Land the job.",
    category: "AI Web App",
    industry: "HR Tech / Career Tech / Productivity SaaS",
    service: "Full-Stack Development",
    year: "2026",
    client: "Personal Project",
    role: "Full-Stack Developer",
    duration: "Ongoing",
    description:
      "MyGresume is an AI-powered resume tailoring web app built with Next.js 15 and TypeScript. You upload your existing CV, paste a job description with the job title and company name, and the AI rewrites your resume to match that specific role. You can preview, switch templates, and download as PDF or DOCX — with every tailored version saved to history. A cover letter generator is also included, allowing you to create a matching cover letter for any job application.",
    challenge:
      "Most job seekers send the same generic resume to every application, failing to match the specific keywords and responsibilities that ATS systems and hiring managers look for — resulting in rejections before a human ever reads their CV.",
    solution:
      "MyGresume lets you upload your existing resume once, paste any job description, and instantly receive an AI-tailored version with rewritten bullets and summary optimized for that specific role — complete with a matching cover letter, multiple professional templates, and one-click download in PDF or DOCX format.",
    tags: ["Next.js", "TypeScript", "AI Integration", "Zustand", "Framer Motion", "Tailwind CSS v4"],
    cover: "/image/asset16.webp",
    video: "https://res.cloudinary.com/degearesj/video/upload/v1778676877/updated_gresume_aaqrvq.mp4",
    hero: "/image/asset15.webp",
    screens: [
      "/image/asset20.webp",
      "/image/asset21.webp",
    ],
    liveUrl: "https://mygresume.oluwadamilare.xyz/",
    githubUrl: "https://github.com/Greggart9/mygresume",
  },
  {
    slug: "zavian",
    title: "Zavian",
    tagline: "Your story, captured boldly.",
    category: "Portfolio",
    industry: "Photography / Creative Services / Personal Branding",
    service: "Full-Stack Development & Creative Web Design",
    year: "2026",
    client: "Personal Project",
    role: "Full-Stack Developer & UI Designer",
    duration: "4 Weeks",

    description:
      "Zavian is a modern photography portfolio website designed to showcase editorial, portrait, fashion, and commercial photography through immersive visuals and smooth interactions. The website features full-screen project showcases, dynamic project pages, image galleries, before-and-after sliders, animated page transitions, blog content, and a contact experience for potential clients. Built with Next.js, TypeScript, GSAP, and Tailwind CSS, Zavian focuses on strong visual storytelling, responsive design, and a premium browsing experience across desktop, tablet, and mobile devices.",

    challenge:
      "Photography portfolios often rely on basic image grids that fail to communicate the personality, atmosphere, and creative direction behind each project. The challenge was to build a visually striking portfolio that gives every image enough space to stand out while still remaining fast, responsive, easy to navigate, and engaging across different screen sizes.",

    solution:
      "Zavian uses immersive full-screen imagery, stacked project sections, animated galleries, subtle page transitions, and reusable dynamic project pages to create a more cinematic portfolio experience. Each project is powered by structured data, allowing new case studies to be added without creating a separate page layout. Responsive layouts, optimized Next.js images, GSAP animations, and clear navigation ensure that the experience remains polished and accessible on mobile, tablet, and desktop.",

    tags: [
      "Next.js",
      "TypeScript",
      "GSAP",
      "Tailwind CSS",
    ],

    cover: "/image/asset 80.webp",
    video: "https://res.cloudinary.com/degearesj/video/upload/v1782863648/zavian_nkygmg.mp4",
    hero: "/image/asset 72.webp",

    screens: [
      "/image/asset24.webp",
      "/image/asset23.webp",
    ],

    liveUrl: "https://zavian.oluwadamilare.xyz/",
    githubUrl: "https://github.com/Greggart9/zavian",
  },

  {
    slug: "subscription-tracker-api",
    title: "Subscription Tracker API",
    tagline: "Track subscriptions and never miss a renewal.",
    category: "Backend Development",
    industry: "Fintech / Personal Finance / SaaS",
    service: "Backend API Development",
    year: "2026",
    client: "Personal Project",
    role: "Backend Developer",
    duration: "1 week",

    description:
      "Subscription Tracker API is a backend application designed to help users manage recurring subscriptions, monitor renewal dates, and receive automated reminders before upcoming payments. The API includes user authentication, protected routes, subscription ownership validation, automatic renewal-date calculation, email notifications, background workflows, request protection, and centralized error handling. It was built with Node.js, Express, MongoDB, Mongoose, JWT, Arcjet, Upstash Workflow, Nodemailer, and Day.js.",

    challenge:
      "Managing recurring subscriptions requires reliable authentication, accurate renewal tracking, secure access controls, and automated communication. The challenge was to build a backend system that could securely associate subscriptions with individual users, calculate renewal dates, protect sensitive endpoints, trigger scheduled workflows, and deliver reminder emails while remaining suitable for deployment on a managed cloud platform.",

    solution:
      "The API uses JWT authentication and authorization middleware to protect routes and ensure users can only access their own subscriptions. Mongoose models manage user and subscription data, while schema hooks calculate renewal dates based on billing frequency. Upstash Workflow handles scheduled reminder processes, Nodemailer delivers renewal emails, and Arcjet provides request protection and rate limiting. The application is deployed on Render and connected to MongoDB Atlas for persistent cloud storage.",

    tags: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "JWT",
      "Arcjet",
      "Upstash Workflow",
      "Nodemailer",
    ],

    cover: "/image/subscription-tracker-cove.webp",
    video: "",
    hero: "/image/asset26.webp",

    screens: [
      "/image/asset25.webp",
      "/image/asset26.webp",
    ],

    liveUrl: "https://subscription-tracker-api-7j9i.onrender.com/",
    githubUrl: "YOUR_GITHUB_REPOSITORY_URL",
  }

];

export const services = [
  {
    image: "/image/services/frontend.webp",
    icon: "⬡",
    title: "Frontend Development",
    desc: "Fast, accessible, pixel-perfect UIs. React, Next.js, and the modern web stack — built to perform.",
    tools: ["Next.js", "React", "TypeScript", "Tailwind", "Responsive Design"],
  },
  {
    image: "/image/services/cms.webp",
    icon: "◈",
    title: "CMS Development",
    desc: "Building and managing dynamic websites using CMS platforms with custom themes, plugins, and structured content management.",
    tools: ["WordPress", "Themes", "Plugins", "Content Management"],
  },
  {
    image: "/image/services/management.webp",
    icon: "✦",
    title: "Web Management",
    desc: "Managing live websites including updates, hosting configuration, backups, and maintaining site performance and security.",
    tools: ["Hosting", "cPanel", "Maintenance", "Security"],
  },
  {
    image: "/image/services/performance.webp",
    icon: "◎",
    title: "Performance Optimization",
    desc: "Improving website speed and efficiency through code optimization, asset compression, and performance best practices.",
    tools: ["Lighthouse", "SEO", "Caching", "Lazy Loading"],
  },
  {
    image: "/image/services/testing.webp",
    icon: "⟐",
    title: "Testing & Debugging",
    desc: "Identifying, diagnosing, and fixing bugs to ensure websites function correctly across different browsers, devices, and environments.",
    tools: ["Bug Fixing", "DevTools", "Error Handling"],
  },
  {
    image: "/image/services/illustration.webp",
    icon: "◇",
    title: "Custom Illustration",
    desc: "Designing custom website logos, icons, and SVG illustrations that strengthen brand identity and improve user experience.",
    tools: ["SVG", "Figma", "Icons", "Logo Design"],
  },
];

export const whyMe = [
  { num: "01", title: "Ship-First Mindset", desc: "I optimise for shipped, working product over theoretical perfection. Good code today beats perfect code never." },
  { num: "02", title: "TypeScript Everywhere", desc: "I write typed, self-documenting code from API contract to UI component. Fewer runtime bugs, faster onboarding." },
  { num: "03", title: "Performance Obsessed", desc: "Every build I ship hits green on Core Web Vitals. Bundle size, load time, and runtime performance are first-class concerns." },
  { num: "04", title: "Clear Communication", desc: "I write detailed PRs, update async, and document decisions. You'll always know what's in progress and what's blocked." },
  { num: "05", title: "Clean Code Practices", desc: "I write readable, maintainable code with clear structure and consistent patterns so projects stay easy to scale and collaborate on." },
  { num: "06", title: "Continuous Learning", desc: "Technology evolves fast, and I stay current by learning new tools and improving workflows." },
];

export type FaqCategory = "General" | "Pricing" | "Process" | "Results";

export const faqCategories: FaqCategory[] = ["General", "Pricing", "Process", "Results"];

export const faqs: { q: string; a: string; category: FaqCategory }[] = [
  // ── General ──
  {
    category: "General",
    q: "What types of projects do you typically take on?",
    a: "I specialize in high-performance web applications, modern SaaS dashboards, interactive landing pages, and complex design-to-code implementations using Next.js, React, and TypeScript.",
  },
  {
    category: "General",
    q: "Do you work with startups or established companies?",
    a: "Both. I work with venture-backed seed and series-A startups moving from MVP to production scale, as well as established product teams needing specialized senior frontend firepower.",
  },
  {
    category: "General",
    q: "Can you work directly from Figma or existing design systems?",
    a: "Yes. I treat Figma files as living specifications, faithfully translating design tokens, fluid responsive layouts, microinteractions, and typography hierarchies into modular, accessible components.",
  },
  {
    category: "General",
    q: "Are you available for full-time roles or exclusively contract/freelance?",
    a: "I am open to both. I engage in high-impact contract sprint engagements, ongoing product retainers, and select full-time engineering roles with ambitious teams.",
  },

  // ── Pricing ──
  {
    category: "Pricing",
    q: "How do you structure your pricing?",
    a: "Engagements are structured either as fixed-price milestones for well-defined scopes, weekly sprints for rapid product builds, or monthly retainers for continuous feature iterations.",
  },
  {
    category: "Pricing",
    q: "Can we adjust scope or switch engagement tiers midway?",
    a: "Absolutely. Project needs evolve. If priorities shift during development, we transparently recalibrate milestone deliverables and reallocate sprint capacity without bureaucratic friction.",
  },
  {
    category: "Pricing",
    q: "How are payment milestones scheduled?",
    a: "Standard milestone projects run on a 50/50 model (50% upfront to reserve sprint availability, 50% upon final staging approval and repository handoff). Monthly retainers bill at the beginning of each billing cycle.",
  },

  // ── Process ──
  {
    category: "Process",
    q: "What does the kickoff and discovery process look like?",
    a: "We start with a focused 30-minute discovery call to clarify core technical requirements, design assets, and delivery milestones. Within 48 hours, I provide an architectural plan and delivery schedule.",
  },

  {
    category: "Process",
    q: "How do code reviews and repository access work?",
    a: "I integrate directly into your Git workflow (GitHub/GitLab), writing atomic, well-documented pull requests with clean commits, linted code, and automated preview deployments via Vercel or Cloudflare.",
  },
  {
    category: "Process",
    q: "What does post-launch support and handoff entail?",
    a: "Every engagement includes clean documentation, environment setup guides, architecture walkthroughs, and two weeks of complimentary post-launch bug triage to guarantee stability.",
  },

  // ── Results ──
  {
    category: "Results",
    q: "How do you guarantee 95+ Core Web Vitals and Lighthouse scores?",
    a: "Performance is engineered into every line: asset preloading, image optimization with next/image, minimal client-side bundles, zero layout shifts (CLS), and edge-rendered architectures.",
  },
  {
    category: "Results",
    q: "Can you audit, refactor, and modernize an existing codebase?",
    a: "Yes. I routinely audit legacy codebases, introduce strict TypeScript types, resolve memory leaks, optimize bundle sizes, and migrate legacy class components to modern React Server Components.",
  },
  {
    category: "Results",
    q: "What happens if bugs are discovered after release?",
    a: "All deliverables are covered by a 14-day warranty period. Any bugs or regressions directly relating to the agreed project scope are remediated immediately at zero additional cost.",
  },

];

export const testimonials = [
  { quote: "Alex rebuilt our frontend from scratch in 8 weeks. Performance went from a 42 Lighthouse score to 98. Our conversion rate jumped 22% the week after launch.", name: "Sarah Chen", role: "CTO", company: "Nexus Analytics", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80&fit=crop&crop=face" },
  { quote: "The cleanest codebase I've inherited. Typed, documented, tested. Alex clearly cares about the engineers who come after him just as much as the product.", name: "Marcus Williams", role: "Engineering Lead", company: "VaultPay", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80&fit=crop&crop=face" },
  { quote: "LaunchKit saved us 3 weeks of setup. We went from idea to paying customers in 12 days. The code quality is exceptional — we haven't had to touch the boilerplate.", name: "Priya Menon", role: "Founder", company: "StoryFlow Labs", avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&q=80&fit=crop&crop=face" },
];
