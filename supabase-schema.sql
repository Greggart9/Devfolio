-- ==============================================================================
-- DEVFOLIO DATABASE SCHEMA & SEED SCRIPT (PostgreSQL on Supabase)
-- ==============================================================================

-- 1. Create Projects Table (Covers 100% of project detail & slug properties)
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  tagline TEXT NOT NULL,
  category TEXT NOT NULL,
  industry TEXT,
  service TEXT,
  year TEXT,
  client TEXT,
  role TEXT,
  duration TEXT,
  description TEXT NOT NULL,
  challenge TEXT,
  solution TEXT,
  tags TEXT[] DEFAULT '{}',
  cover TEXT NOT NULL,
  hero TEXT,
  video TEXT DEFAULT '',
  screens TEXT[] DEFAULT '{}',
  live_url TEXT,
  github_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  display_order INT DEFAULT 0
);

-- 2. Create Services Table
CREATE TABLE IF NOT EXISTS public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  desc_text TEXT NOT NULL,
  icon TEXT,
  image TEXT NOT NULL,
  tools TEXT[] DEFAULT '{}',
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create Skills (Falling Tags) Table
CREATE TABLE IF NOT EXISTS public.skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  label TEXT NOT NULL,
  theme TEXT CHECK (theme IN ('white', 'dark', 'accent')) DEFAULT 'dark',
  display_order INT DEFAULT 0
);

-- 4. Create About Profile Table
CREATE TABLE IF NOT EXISTS public.about_profile (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  headline TEXT NOT NULL,
  subheadline TEXT NOT NULL,
  intro TEXT NOT NULL,
  detailed_bio TEXT NOT NULL,
  highlights TEXT[] DEFAULT '{}',
  experience_years TEXT DEFAULT '3+',
  resume_url TEXT NOT NULL,
  avatar_url TEXT DEFAULT 'https://res.cloudinary.com/degearesj/image/upload/v1787267525/Pfp_grnrga.png',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Create FAQs Table
CREATE TABLE IF NOT EXISTS public.faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL CHECK (category IN ('General', 'Pricing', 'Process', 'Results')),
  q TEXT NOT NULL,
  a TEXT NOT NULL,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.about_profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;

-- Allow public read access to everyone
DROP POLICY IF EXISTS "Public read access for projects" ON public.projects;
CREATE POLICY "Public read access for projects" ON public.projects FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read access for services" ON public.services;
CREATE POLICY "Public read access for services" ON public.services FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read access for skills" ON public.skills;
CREATE POLICY "Public read access for skills" ON public.skills FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read access for about_profile" ON public.about_profile;
CREATE POLICY "Public read access for about_profile" ON public.about_profile FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read access for faqs" ON public.faqs;
CREATE POLICY "Public read access for faqs" ON public.faqs FOR SELECT USING (true);

-- Allow authenticated admin write access
DROP POLICY IF EXISTS "Admin write access for projects" ON public.projects;
CREATE POLICY "Admin write access for projects" ON public.projects FOR ALL 
USING (auth.jwt() ->> 'email' = 'oluwadamilare.greggart9@gmail.com')
WITH CHECK (auth.jwt() ->> 'email' = 'oluwadamilare.greggart9@gmail.com');

DROP POLICY IF EXISTS "Admin write access for services" ON public.services;
CREATE POLICY "Admin write access for services" ON public.services FOR ALL 
USING (auth.jwt() ->> 'email' = 'oluwadamilare.greggart9@gmail.com')
WITH CHECK (auth.jwt() ->> 'email' = 'oluwadamilare.greggart9@gmail.com');

DROP POLICY IF EXISTS "Admin write access for skills" ON public.skills;
CREATE POLICY "Admin write access for skills" ON public.skills FOR ALL 
USING (auth.jwt() ->> 'email' = 'oluwadamilare.greggart9@gmail.com')
WITH CHECK (auth.jwt() ->> 'email' = 'oluwadamilare.greggart9@gmail.com');

DROP POLICY IF EXISTS "Admin write access for about_profile" ON public.about_profile;
CREATE POLICY "Admin write access for about_profile" ON public.about_profile FOR ALL 
USING (auth.jwt() ->> 'email' = 'oluwadamilare.greggart9@gmail.com')
WITH CHECK (auth.jwt() ->> 'email' = 'oluwadamilare.greggart9@gmail.com');

DROP POLICY IF EXISTS "Admin write access for faqs" ON public.faqs;
CREATE POLICY "Admin write access for faqs" ON public.faqs FOR ALL 
USING (auth.jwt() ->> 'email' = 'oluwadamilare.greggart9@gmail.com')
WITH CHECK (auth.jwt() ->> 'email' = 'oluwadamilare.greggart9@gmail.com');

-- ==============================================================================
-- INITIAL DATA SEEDING (FROM EXISTING DATA.TS)
-- ==============================================================================

-- 1. Seed Projects
INSERT INTO public.projects (
  slug, title, tagline, category, industry, service, year, client, role, duration,
  description, challenge, solution, tags, cover, hero, video, screens, live_url, github_url, display_order
) VALUES 
(
  'aldena',
  'ALDENA',
  'Creative Agency',
  'Website',
  'Creative / Design Agency',
  'Frontend Development',
  '2026',
  'Personal Project',
  'Frontend Developer & UI Designer',
  '1 Weeks',
  'Aldena is an editorial-grade creative agency platform designed to showcase brand identities, digital products, and design systems through interactive card stacks, fluid typography, and scroll-driven micro-interactions.',
  'Creating an ultra-refined design agency site that blends heavy editorial typography with complex scroll animations without compromising performance, mobile responsiveness, or accessibility across viewports.',
  'Built with Next.js App Router, TypeScript, and Tailwind CSS. Integrated GSAP ScrollTrigger for pinned interactive testimonial card stacks, custom drop-text scroll effects, marquee logo tickers, dynamic project slug routes, and responsive grid layouts.',
  ARRAY['Next.js', 'TypeScript', 'Tailwind CSS', 'GSAP', 'Framer Motion', 'Lucide React', 'Vercel'],
  'https://res.cloudinary.com/degearesj/image/upload/v1790435878/asset2_o9qubq.png',
  'https://res.cloudinary.com/degearesj/image/upload/v1790435878/asset2_o9qubq.png',
  'https://res.cloudinary.com/degearesj/video/upload/v1790436508/aldena_ffu2lq.mp4',
  ARRAY['/image/asset29.webp', '/image/asset30.webp'],
  'https://aldena.oluwadamilare.xyz/',
  'https://github.com/Greggart9/Aldena',
  1
),
(
  'essential',
  'ESSENTIAL',
  'Full-Stack E-Commerce & Content Platform',
  'Web App',
  'E-commerce / SaaS',
  'Full-Stack Development',
  '2026',
  'Personal Project',
  'Full-Stack Developer',
  '2 Weeks',
  'Essential is a full-stack e-commerce and content platform built for a beauty and skincare brand to sell products, publish blog content, and manage everything from a custom admin panel.',
  'The client needed a fully custom storefront — no Shopify, no templates. A platform they own completely, with a blog, cart system, and the ability to manage all content without touching code.',
  'Built with Next.js and PostgreSQL on a serverless architecture. Features a product store with cart, blog system, live search, Cloudinary image uploads, email notifications via Resend, rate limiting with Upstash Redis, and a password-protected admin panel with full CRUD on all content.',
  ARRAY['Next.js', 'TypeScript', 'PostgreSQL', 'Resend', 'Cloudinary', 'Tailwind', 'Upstash', 'Vercel', 'Framer Motion'],
  'https://res.cloudinary.com/degearesj/image/upload/v1771338552/asset8_fehfol.png',
  'https://res.cloudinary.com/degearesj/image/upload/v1771338552/asset8_fehfol.png',
  'https://res.cloudinary.com/degearesj/video/upload/v1773442261/0302_xc0vzr.mp4',
  ARRAY['/image/asset2.webp', '/image/asset3.webp'],
  'https://essential.oluwadamilare.xyz/',
  'https://github.com/Greggart9/ecommerce',
  2
),
(
  'gregatek',
  'Gregatek',
  'Modern Tech Development Platform',
  'Website',
  'Technology / Web Development',
  'Frontend Development',
  '2026',
  'Personal Project',
  'Frontend Developer',
  '2 Weeks',
  'Gregatek is a modern tech website focused on building fast, scalable, and visually engaging digital experiences. The platform showcases modern web development practices, interactive UI components, and clean frontend architecture built with the latest technologies.',
  'Creating a tech-focused platform that balances strong visual design with performance and scalability. The goal was to build a modern interface that feels dynamic and professional while maintaining fast load times, responsive layouts, and clean code architecture.',
  'Gregatek was built using modern frontend technologies including Next.js, TypeScript, and Tailwind CSS. Framer Motion powers smooth UI animations and micro-interactions, while a modular component structure ensures scalability and maintainability. The result is a fast, responsive tech website designed for performance and clean user experience.',
  ARRAY['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  '/image/asset6.webp',
  '/image/asset10.webp',
  'https://res.cloudinary.com/degearesj/video/upload/v1773442048/smaller_screen_jzyo54.mp4',
  ARRAY['/image/asset7.webp', '/image/asset8.webp'],
  'https://gregatek.oluwadamilare.xyz/',
  'https://github.com/Greggart9/gregatek',
  3
),
(
  'gregtodo',
  'Greg To do',
  'Task Manager App',
  'Web App',
  'Productivity',
  'Frontend Development',
  '2026',
  'Personal Project',
  'Frontend Developer',
  '24 Hours',
  'Greg To do is a premium task management app built for developers and power users who want beauty without sacrificing function. It supports categorised tasks, due dates, inline editing, and persistent storage — all wrapped in a luxury dark glassmorphism UI with a custom cursor and animated background.',
  'Most to do apps are either too plain or too bloated. The goal was to build something that feels genuinely premium — cinematic animations, glassmorphic cards, a living cursor orb — while staying snappy, keyboard-friendly, and completely stateless (no backend needed).',
  'Built with React and TypeScript on Vite. All state persists via localStorage so tasks survive refreshes. Features include category filtering with animated pills, colour-coded category badges, a shimmer gold progress bar, floating background orbs, and a lag-interpolated cursor ball using requestAnimationFrame. Fully responsive with staggered entrance animations on every load.',
  ARRAY['React', 'TypeScript', 'Vite', 'Tailwind CSS'],
  '/image/asset13.webp',
  '/image/asset13.webp',
  'https://res.cloudinary.com/degearesj/video/upload/v1773715267/gregtodo_xihrao.mp4',
  ARRAY['/image/asset11.webp', '/image/asset12.webp'],
  'https://gregtodo.oluwadamilare.xyz/',
  'https://github.com/Greggart9/gregtodo',
  4
),
(
  'mygresume',
  'MyGresume',
  'Upload. Tailor. Land the job.',
  'AI Web App',
  'HR Tech / Career Tech / Productivity SaaS',
  'Full-Stack Development',
  '2026',
  'Personal Project',
  'Full-Stack Developer',
  'Ongoing',
  'MyGresume is an AI-powered resume tailoring web app built with Next.js 15 and TypeScript. You upload your existing CV, paste a job description with the job title and company name, and the AI rewrites your resume to match that specific role. You can preview, switch templates, and download as PDF or DOCX — with every tailored version saved to history. A cover letter generator is also included, allowing you to create a matching cover letter for any job application.',
  'Most job seekers send the same generic resume to every application, failing to match the specific keywords and responsibilities that ATS systems and hiring managers look for — resulting in rejections before a human ever reads their CV.',
  'MyGresume lets you upload your existing resume once, paste any job description, and instantly receive an AI-tailored version with rewritten bullets and summary optimized for that specific role — complete with a matching cover letter, multiple professional templates, and one-click download in PDF or DOCX format.',
  ARRAY['Next.js', 'TypeScript', 'AI Integration', 'Zustand', 'Framer Motion', 'Tailwind CSS v4'],
  '/image/asset16.webp',
  '/image/asset15.webp',
  'https://res.cloudinary.com/degearesj/video/upload/v1778676877/updated_gresume_aaqrvq.mp4',
  ARRAY['/image/asset20.webp', '/image/asset21.webp'],
  'https://mygresume.oluwadamilare.xyz/',
  'https://github.com/Greggart9/mygresume',
  5
),
(
  'zavian',
  'Zavian',
  'Your story, captured boldly.',
  'Portfolio',
  'Photography / Creative Services / Personal Branding',
  'Full-Stack Development & Creative Web Design',
  '2026',
  'Personal Project',
  'Full-Stack Developer & UI Designer',
  '4 Weeks',
  'Zavian is a modern photography portfolio website designed to showcase editorial, portrait, fashion, and commercial photography through immersive visuals and smooth interactions. The website features full-screen project showcases, dynamic project pages, image galleries, before-and-after sliders, animated page transitions, blog content, and a contact experience for potential clients. Built with Next.js, TypeScript, GSAP, and Tailwind CSS, Zavian focuses on strong visual storytelling, responsive design, and a premium browsing experience across desktop, tablet, and mobile devices.',
  'Photography portfolios often rely on basic image grids that fail to communicate the personality, atmosphere, and creative direction behind each project. The challenge was to build a visually striking portfolio that gives every image enough space to stand out while still remaining fast, responsive, easy to navigate, and engaging across different screen sizes.',
  'Zavian uses immersive full-screen imagery, stacked project sections, animated galleries, subtle page transitions, and reusable dynamic project pages to create a more cinematic portfolio experience. Each project is powered by structured data, allowing new case studies to be added without creating a separate page layout. Responsive layouts, optimized Next.js images, GSAP animations, and clear navigation ensure that the experience remains polished and accessible on mobile, tablet, and desktop.',
  ARRAY['Next.js', 'TypeScript', 'GSAP', 'Tailwind CSS'],
  '/image/asset 80.webp',
  '/image/asset 72.webp',
  'https://res.cloudinary.com/degearesj/video/upload/v1782863648/zavian_nkygmg.mp4',
  ARRAY['/image/asset24.webp', '/image/asset23.webp'],
  'https://zavian.oluwadamilare.xyz/',
  'https://github.com/Greggart9/zavian',
  6
),
(
  'subscription-tracker-api',
  'Subscription Tracker API',
  'Track subscriptions and never miss a renewal.',
  'Backend Development',
  'Fintech / Personal Finance / SaaS',
  'Backend API Development',
  '2026',
  'Personal Project',
  'Backend Developer',
  '1 week',
  'Subscription Tracker API is a backend application designed to help users manage recurring subscriptions, monitor renewal dates, and receive automated reminders before upcoming payments. The API includes user authentication, protected routes, subscription ownership validation, automatic renewal-date calculation, email notifications, background workflows, request protection, and centralized error handling. It was built with Node.js, Express, MongoDB, Mongoose, JWT, Arcjet, Upstash Workflow, Nodemailer, and Day.js.',
  'Managing recurring subscriptions requires reliable authentication, accurate renewal tracking, secure access controls, and automated communication. The challenge was to build a backend system that could securely associate subscriptions with individual users, calculate renewal dates, protect sensitive endpoints, trigger scheduled workflows, and deliver reminder emails while remaining suitable for deployment on a managed cloud platform.',
  'The API uses JWT authentication and authorization middleware to protect routes and ensure users can only access their own subscriptions. Mongoose models manage user and subscription data, while schema hooks calculate renewal dates based on billing frequency. Upstash Workflow handles scheduled reminder processes, Nodemailer delivers renewal emails, and Arcjet provides request protection and rate limiting. The application is deployed on Render and connected to MongoDB Atlas for persistent cloud storage.',
  ARRAY['Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'JWT', 'Arcjet', 'Upstash Workflow', 'Nodemailer'],
  '/image/subscription-tracker-cove.webp',
  '/image/asset26.webp',
  '',
  ARRAY['/image/asset25.webp', '/image/asset26.webp'],
  'https://subscription-tracker-api-7j9i.onrender.com/',
  'YOUR_GITHUB_REPOSITORY_URL',
  7
)
ON CONFLICT (slug) DO NOTHING;

-- 2. Seed Services
INSERT INTO public.services (image, icon, title, desc_text, tools, display_order)
VALUES 
  ('/image/services/frontend.webp', '⬡', 'Frontend Development', 'Fast, accessible, pixel-perfect UIs. React, Next.js, and the modern web stack — built to perform.', ARRAY['Next.js', 'React', 'TypeScript', 'Tailwind', 'Responsive Design'], 1),
  ('/image/services/cms.webp', '◈', 'CMS Development', 'Building and managing dynamic websites using CMS platforms with custom themes, plugins, and structured content management.', ARRAY['WordPress', 'Themes', 'Plugins', 'Content Management'], 2),
  ('/image/services/management.webp', '✦', 'Web Management', 'Managing live websites including updates, hosting configuration, backups, and maintaining site performance and security.', ARRAY['Hosting', 'cPanel', 'Maintenance', 'Security'], 3),
  ('/image/services/performance.webp', '◎', 'Performance Optimization', 'Improving website speed and efficiency through code optimization, asset compression, and performance best practices.', ARRAY['Lighthouse', 'SEO', 'Caching', 'Lazy Loading'], 4),
  ('/image/services/testing.webp', '⟐', 'Testing & Debugging', 'Identifying, diagnosing, and fixing bugs to ensure websites function correctly across different browsers, devices, and environments.', ARRAY['Bug Fixing', 'DevTools', 'Error Handling'], 5),
  ('/image/services/illustration.webp', '◇', 'Custom Illustration', 'Designing custom website logos, icons, and SVG illustrations that strengthen brand identity and improve user experience.', ARRAY['SVG', 'Figma', 'Icons', 'Logo Design'], 6)
ON CONFLICT DO NOTHING;

-- 3. Seed Skills
INSERT INTO public.skills (label, theme, display_order)
VALUES 
  ('React', 'white', 1),
  ('Next.js', 'dark', 2),
  ('TypeScript', 'accent', 3),
  ('Tailwind CSS', 'dark', 4),
  ('Framer Motion', 'white', 5),
  ('Three.js / 3D', 'dark', 6),
  ('UI / UX Design', 'white', 7),
  ('Performance & SEO', 'white', 8),
  ('Core Web Vitals', 'accent', 9),
  ('Figma to Code', 'dark', 10),
  ('Microinteractions', 'white', 11),
  ('Clean Code', 'dark', 12),
  ('JavaScript', 'white', 13),
  ('Responsive Layouts', 'dark', 14),
  ('Animations', 'accent', 15),
  ('GSAP', 'accent', 16)
ON CONFLICT DO NOTHING;

-- 4. Seed About Profile
INSERT INTO public.about_profile (headline, subheadline, intro, detailed_bio, highlights, experience_years, resume_url, avatar_url)
VALUES (
  'Code that''s clean,',
  'fast & production-ready.',
  'I’m Olúwadámiláre, a frontend developer focused on building visually engaging, high-performance web applications. I bridge design aesthetics with solid technical execution.',
  'My focus is on modern web development. I’ve spent the last few years developing different types of web applications. I thrive on the technical challenges of the frontend, whether that means optimizing Core Web Vitals under the hood or ensuring a complex UI is perfectly responsive.',
  ARRAY[
    'Pixel-Perfect UI Execution',
    'App Router & Server Actions',
    'Sub-300ms Fluid Animations',
    '100% Responsive & Accessible'
  ],
  '3+',
  'https://docs.google.com/document/d/1-ueGgt97JmLLSbXA332Heyxcb5Q2HGiqcsIMSbmqOhg/edit?usp=sharing',
  'https://res.cloudinary.com/degearesj/image/upload/v1787267525/Pfp_grnrga.png'
)
ON CONFLICT DO NOTHING;

-- 5. Seed FAQs
INSERT INTO public.faqs (category, q, a, display_order)
VALUES 
  ('General', 'What types of projects do you typically take on?', 'I specialize in high-performance web applications, modern SaaS dashboards, interactive landing pages, and complex design-to-code implementations using Next.js, React, and TypeScript.', 1),
  ('General', 'Do you work with startups or established companies?', 'Both. I work with venture-backed seed and series-A startups moving from MVP to production scale, as well as established product teams needing specialized senior frontend firepower.', 2),
  ('General', 'Can you work directly from Figma or existing design systems?', 'Yes. I treat Figma files as living specifications, faithfully translating design tokens, fluid responsive layouts, microinteractions, and typography hierarchies into modular, accessible components.', 3),
  ('General', 'Are you available for full-time roles or exclusively contract/freelance?', 'I am open to both. I engage in high-impact contract sprint engagements, ongoing product retainers, and select full-time engineering roles with ambitious teams.', 4),
  ('Pricing', 'How do you structure your pricing?', 'Engagements are structured either as fixed-price milestones for well-defined scopes, weekly sprints for rapid product builds, or monthly retainers for continuous feature iterations.', 5),
  ('Pricing', 'Can we adjust scope or switch engagement tiers midway?', 'Absolutely. Project needs evolve. If priorities shift during development, we transparently recalibrate milestone deliverables and reallocate sprint capacity without bureaucratic friction.', 6),
  ('Pricing', 'How are payment milestones scheduled?', 'Standard milestone projects run on a 50/50 model (50% upfront to reserve sprint availability, 50% upon final staging approval and repository handoff). Monthly retainers bill at the beginning of each billing cycle.', 7),
  ('Process', 'What does the kickoff and discovery process look like?', 'We start with a focused 30-minute discovery call to clarify core technical requirements, design assets, and delivery milestones. Within 48 hours, I provide an architectural plan and delivery schedule.', 8),
  ('Process', 'How do code reviews and repository access work?', 'I integrate directly into your Git workflow (GitHub/GitLab), writing atomic, well-documented pull requests with clean commits, linted code, and automated preview deployments via Vercel or Cloudflare.', 9),
  ('Process', 'What does post-launch support and handoff entail?', 'Every engagement includes clean documentation, environment setup guides, architecture walkthroughs, and two weeks of complimentary post-launch bug triage to guarantee stability.', 10),
  ('Results', 'How do you guarantee 95+ Core Web Vitals and Lighthouse scores?', 'Performance is engineered into every line: asset preloading, image optimization with next/image, minimal client-side bundles, zero layout shifts (CLS), and edge-rendered architectures.', 11),
  ('Results', 'Can you audit, refactor, and modernize an existing codebase?', 'Yes. I routinely audit legacy codebases, introduce strict TypeScript types, resolve memory leaks, optimize bundle sizes, and migrate legacy class components to modern React Server Components.', 12),
  ('Results', 'What happens if bugs are discovered after release?', 'All deliverables are covered by a 14-day warranty period. Any bugs or regressions directly relating to the agreed project scope are remediated immediately at zero additional cost.', 13)
ON CONFLICT DO NOTHING;
