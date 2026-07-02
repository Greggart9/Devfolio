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
    role:     "Full-Stack Developer",
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
    slug:     "mygresume",
    title:    "MyGresume",
    tagline:  "Upload. Tailor. Land the job.",
    category: "AI Web App",
    industry: "HR Tech / Career Tech / Productivity SaaS",
    service:  "Full-Stack Development",
    year:     "2026",
    client:   "Personal Project",
    role:     "Full-Stack Developer",
    duration: "Ongoing",
    description:
      "MyGresume is an AI-powered resume tailoring web app built with Next.js 15 and TypeScript. You upload your existing CV, paste a job description with the job title and company name, and the AI rewrites your resume to match that specific role. You can preview, switch templates, and download as PDF or DOCX — with every tailored version saved to history. A cover letter generator is also included, allowing you to create a matching cover letter for any job application.",
    challenge:
      "Most job seekers send the same generic resume to every application, failing to match the specific keywords and responsibilities that ATS systems and hiring managers look for — resulting in rejections before a human ever reads their CV.",
    solution:
      "MyGresume lets you upload your existing resume once, paste any job description, and instantly receive an AI-tailored version with rewritten bullets and summary optimized for that specific role — complete with a matching cover letter, multiple professional templates, and one-click download in PDF or DOCX format.",
    tags: ["Next.js", "TypeScript", "AI Integration", "Zustand", "Framer Motion", "Tailwind CSS v4"],
    cover:   "/image/asset16.jpg",
    video:   "https://res.cloudinary.com/degearesj/video/upload/v1778676877/updated_gresume_aaqrvq.mp4",
    hero:    "/image/asset15.jpg",
    screens: [
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&q=80&fit=crop",
      "/image/asset20.png",
      "/image/asset21.png",
    ],
    liveUrl:   "https://mygresume.vercel.app",
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

  cover: "/image/asset 80.png",
  video: "https://res.cloudinary.com/degearesj/video/upload/v1782863648/zavian_nkygmg.mp4" ,
  hero: "/image/asset 72.png",

  screens: [
    "/image/asset22.png",
    "/image/asset24.png",
    "/image/asset23.png",
  ],

  liveUrl: "https://zavian.vercel.app/",
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

cover: "/image/subscription-tracker-cove.jpg",
video: "",
hero: "/image/asset26.jpg",

screens: [
"/image/asset26.jpg",
"/image/asset25.jpg",
"/image/asset26.jpg",
],

liveUrl: "https://subscription-tracker-api-7j9i.onrender.com/",
githubUrl: "YOUR_GITHUB_REPOSITORY_URL",
}

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
