// Сайтын БҮХ агуулга энд байна. Текст бүр { mn, en } хоёр хэлтэй.
// Агуулга өөрчлөх бол зөвхөн энэ файлыг засна (компонентуудыг оролдох хэрэггүй).

export const profile = {
  name: { mn: "Анарбаян (Garnett)", en: "Anarbayan (Garnett)" },
  role: { mn: "Fullstack хөгжүүлэгч", en: "Fullstack developer" },
  school: {
    mn: "СЭЗИС (UFE) · Мэдээллийн систем, 5-р курс",
    en: "UFE · Information Systems, 5th year",
  },
  tagline: {
    mn: "Худалдагч байснаас хөгжүүлэгч болсон. Хүнтэй ажиллах туршлага болон кодыг хослуулж бодит асуудал шийддэг.",
    en: "From salesperson to developer. I combine people skills with code to solve real problems.",
  },
};

// Борлуулагч үеийн ажлын туршлага (Миний тухай)
export const salesJobs = [
  {
    company: { mn: "Cool Kicks UB", en: "Cool Kicks UB" },
    title: { mn: "Борлуулалтын менежер (спорт хувцасны дэлгүүр)", en: "Sales manager (sportswear store)" },
    period: "2025-01 – 2025-05",
    visible: true,
  },
  {
    company: { mn: "ТЭСО Инвестмэнт ХХК", en: "TESO Investment LLC" },
    title: { mn: "Борлуулалтын менежер", en: "Sales manager" },
    period: "",
    visible: true,
  },
  {
    company: { mn: "WAT хөтөлбөр, АНУ", en: "Work and Travel, USA" },
    title: { mn: "3 сар ажилласан (англи хэлний орчин)", en: "Worked 3 months (English-speaking environment)" },
    period: "2024",
    visible: true,
  },
  {
    company: { mn: "CU", en: "CU" },
    title: { mn: "Бэлтгэгч (касс)", en: "Store staff (cashier)" },
    period: "2023-10 – 2023-11",
    visible: true,
  },
  {
    company: { mn: "Цэргийн алба", en: "Military service" },
    title: { mn: "Цэргийн жинхэнэ алба хаасан", en: "Completed mandatory military service" },
    period: "2023",
    visible: true,
  },
];

export const salesSummary = {
  mn: "Хүнтэй харилцах, харилцагчийн хэрэгцээг ойлгох чадвар маань код бичихэд их тусалдаг.",
  en: "Talking with people and understanding what customers need helps me a lot when I write code.",
};

// Хөгжүүлэгч үеийн боловсрол, ажил
export const devHistory = [
  {
    company: { mn: "СЭЗИС, Мэдээллийн систем", en: "UFE, Information Systems" },
    title: { mn: "Бакалавр", en: "Bachelor's student" },
    period: "2022 –",
  },
  {
    company: { mn: "Robot soft", en: "Robot soft" },
    title: { mn: "Fullstack дадлага · төслийн гүйцэтгэлд оролцсон", en: "Fullstack intern · worked on client projects" },
    period: "2026-09-08 – 2026-11-01",
  },
  {
    company: { mn: "Ажилтай АЙ ХХК", en: "Ajiltai AI LLC" },
    title: { mn: "AI агент хөгжүүлэгч · бизнесийн автоматжуулалт", en: "AI agent developer · business automation" },
    period: "2026-09-08 – 2026-10-15",
  },
  {
    company: { mn: "Шинэ Үе сургууль", en: "Shine Uye School" },
    title: { mn: "Ерөнхий боловсрол", en: "High school" },
    period: "2018 – 2022",
  },
];

// Ур чадварын төлөв: used = ашигласан, using = ашиглаж байгаа, learning = сурч байгаа
export const statusLabels = {
  used: { mn: "Ашигласан", en: "Used" },
  using: { mn: "Ашиглаж байгаа", en: "Using" },
  learning: { mn: "Сурч байгаа", en: "Learning" },
};

// Технологи бүр тоглоомд нэг «зоос» болно (id давхцахгүй байх ёстой). icon = src/Icon.jsx-ийн нэр
export const skills = [
  { id: "html", icon: "code", name: "HTML", group: "frontend", status: "used" },
  { id: "css", icon: "layout", name: "CSS", group: "frontend", status: "used" },
  { id: "js", icon: "braces", name: "JavaScript", group: "frontend", status: "used" },
  { id: "next", icon: "layers", name: "Next.js", group: "frontend", status: "using" },
  { id: "rn", icon: "phone", name: "React Native", group: "frontend", status: "using" }, // Golden Road-д ашиглаж байгаа,
  { id: "php", icon: "server", name: "PHP (MVC)", group: "backend", status: "used" },
  { id: "laravel", icon: "server", name: "Laravel", group: "backend", status: "used" }, // Ajiltai BA-д ашигласан
  { id: "node", icon: "terminal", name: "JavaScript back-end", group: "backend", status: "using" },
  { id: "pg", icon: "database", name: "PostgreSQL", group: "data", status: "using" },
  { id: "supabase", icon: "database", name: "Supabase", group: "data", status: "using" },
  { id: "redis", icon: "cache", name: "Redis (cache)", group: "data", status: "used" }, // Ajiltai BA-д ашигласан
  { id: "git", icon: "branch", name: "Git / GitHub", group: "tools", status: "using" },
  { id: "vscode", icon: "editor", name: "VS Code", group: "tools", status: "using" },
  { id: "vercel", icon: "cloud", name: "Vercel", group: "tools", status: "using" },
  { id: "electron", icon: "atom", name: "Electron", group: "tools", status: "used" },
  { id: "claude", icon: "spark", name: "Claude Code", group: "ai", status: "using" },
  { id: "codex", icon: "chat", name: "ChatGPT Codex", group: "ai", status: "using" },
  { id: "gemini", icon: "bolt", name: "Gemini API", group: "ai", status: "using" },
  { id: "agent", icon: "robot", name: "AI agent", group: "ai", status: "using" },
  { id: "monolith", icon: "blocks", name: "Modular monolith", group: "arch", status: "used" },
  { id: "mvc", icon: "mvc", name: "MVC", group: "arch", status: "used" },
];

// Сурах хүсэлтэй (одоохондоо ашиглаагүй — зоос биш, хувь байхгүй). about = 1–3 өгүүлбэр тайлбар
export const wantToLearn = [
  {
    name: "AWS",
    about: {
      mn: "Amazon-ы cloud платформ: сервер (EC2), файл хадгалах (S3), serverless функц (Lambda), өгөгдлийн сан (RDS) зэрэг үйлчилгээг нэг дор өгдөг. Одоо Vercel, Supabase дээр байршуулдаг тул дараагийн алхам нь системээ өөрөө cloud дээр бүрэн удирдаж сурах.",
      en: "Amazon's cloud platform: servers (EC2), file storage (S3), serverless functions (Lambda), databases (RDS) and more in one place. I deploy on Vercel and Supabase today, so the next step is learning to run a whole system on the cloud myself.",
    },
  },
  {
    name: "Cloudflare",
    about: {
      mn: "Сайтыг хэрэглэгчид ойрхон серверээс хурдан хүргэж (CDN, cache), DNS болон халдлагаас (DDoS, WAF) хамгаалдаг сүлжээ. Workers-ээр кодыг edge дээр, хэрэглэгчийн ойролцоо ажиллуулж болдгийг сурахыг хүсэж байна.",
      en: "A network that serves sites fast from servers close to users (CDN, caching), handles DNS and protects against attacks (DDoS, WAF). I want to learn Workers, which run code at the edge, near the user.",
    },
  },
  {
    name: "Microservices",
    about: {
      mn: "Том системийг жижиг, бие даан байршуулдаг сервисүүдэд хувааж, тэдгээрийг API эсвэл message queue-ээр холбодог архитектур. Би одоо modular monolith ашигладаг; апп томрох үед модулиа тусдаа сервис болгон салгаж сурах нь дараагийн алхам.",
      en: "An architecture that splits a big system into small services deployed on their own, talking over APIs or message queues. I use a modular monolith today; learning to split modules into separate services as an app grows is my next step.",
    },
  },
];

export const skillGroups = {
  frontend: { mn: "Frontend", en: "Frontend" },
  backend: { mn: "Backend", en: "Backend" },
  data: { mn: "Өгөгдөл", en: "Data" },
  tools: { mn: "Хэрэгсэл", en: "Tools" },
  ai: { mn: "AI", en: "AI" },
  arch: { mn: "Архитектур", en: "Architecture" },
};

// Бүтээлүүд. demoUrl/repoUrl хоосон бол холбоос харагдахгүй (TODO: хэрэглэгч өгнө)
export const projects = [
  {
    id: "nasa",
    title: { mn: "The Aegis — Cosmo Health", en: "The Aegis — Cosmo Health" },
    description: {
      mn: "NASA Space Apps 2026-д зориулж хийсэн, сансрын нисэгчдийн эрүүл мэндийг дагадаг AI-тай жижиг «pet». Electron дээр дэлгэцийн дээр overlay байдлаар амьдарч, өгөгдлийг Supabase/Vercel dashboard-д харуулна.",
      en: "A small AI-powered “pet” that keeps an eye on astronauts' health, built for NASA Space Apps 2026. It lives on screen as an Electron overlay and shows data on a Supabase/Vercel dashboard.",
    },
    tech: ["Electron", "AI", "Supabase", "Vercel"],
    image: "/projects/aegis.jpg", // cosmo-nine-phi.vercel.app-ийн дэлгэцийн зураг
    demoUrl: "https://cosmo-nine-phi.vercel.app/",
    repoUrl: "", // TODO
  },
  {
    id: "invoice",
    title: { mn: "Нэхэмжлэхийн апп", en: "Invoice app (Mongolia)" },
    description: {
      mn: "Монголын нэхэмжлэх бичих, хянах асуудлыг шийддэг апп. Modular monolith архитектураар модуль бүрийг тусад нь хөгжүүлдэг.",
      en: "An app that solves invoicing problems for Mongolian businesses. Built as a modular monolith so each module grows on its own.",
    },
    tech: ["Next.js", "PostgreSQL", "Modular monolith"],
    image: "/projects/invoice.svg",
    demoUrl: "", // TODO
    repoUrl: "", // TODO
  },
  {
    id: "seats",
    title: { mn: "СЭЗИС суудал захиалга", en: "UFE seat booking" },
    description: {
      mn: "СЭЗИС-ийн номын сангийн 100 суудал болон сул ангиудыг захиалах сайт. Оюутан хаана сул байгааг шууд харна.",
      en: "A site for booking the 100 seats in the UFE library and free classrooms. Students see right away where there is space.",
    },
    tech: ["HTML", "CSS", "JavaScript"],
    image: "/projects/seats.svg",
    demoUrl: "", // TODO
    repoUrl: "", // TODO
  },
  {
    id: "ajiltai",
    title: { mn: "ajiltAI — бизнесийн AI автоматжуулалт", en: "ajiltAI — AI automation for businesses" },
    description: {
      mn: "Монголын бизнесүүдэд зориулсан платформ: харилцагчийн чат, цаг захиалга, төлбөр, тайланг нэг систем дотор AI агентаар автоматжуулна. Би энд AI агент хөгжүүлэгчээр ажилласан.",
      en: "A platform for Mongolian businesses that automates customer chats, bookings, payments and reports in one system with AI agents. I worked on it as an AI agent developer.",
    },
    tech: ["AI agent", "Gemini API", "Next.js"],
    image: "/projects/ajiltai.jpg", // ajiltai.tech-ийн дэлгэцийн зураг
    demoUrl: "https://ajiltai.tech/",
    repoUrl: "", // TODO
  },
  {
    id: "ajiltai-ba",
    title: { mn: "Ajiltai BA — бизнес шинжилгээний апп", en: "Ajiltai BA — business analysis app" },
    description: {
      mn: "Ажилтай АЙ ХХК-д зориулж хийсэн бизнес шинжилгээний (BA) апп. Back-end нь Laravel + Octane дээр хурдан ажиллаж, Redis cache-ээр өгөгдлийг түргэн гаргана; дэлгэц нь Next.js.",
      en: "A business analysis (BA) app built for Ajiltai AI LLC. The back end runs fast on Laravel + Octane with a Redis cache for quick data, and the front end is Next.js.",
    },
    tech: ["Laravel", "Octane", "Next.js", "Redis cache"],
    image: "/projects/ajiltai-ba.jpg", // ajiltAI лого
    demoUrl: "", // TODO
    repoUrl: "", // TODO
  },
  {
    id: "golden-road",
    title: { mn: "Golden Road — Сэргээлт", en: "Golden Road — Sergeelt" },
    description: {
      mn: "Уул уурхайн хүнд даацын машинуудад замд гарсан эвдрэлийг засуулах утасны апп. Жолооч дуу, зургаар эвдрэлээ мэдэгдэхэд ойролцоох засварчид болон сэлбэг нийлүүлэгчид үнийн санал илгээж, AI туслах оношилгоо болон саналуудыг харьцуулахад тусална. Жолооч, компани, засварчин, нийлүүлэгч гэсэн 4 талын апп.",
      en: "A roadside repair phone app for heavy mining trucks. A driver reports a breakdown by voice and photo, nearby mechanics and parts suppliers send quotes, and an AI assistant helps with diagnosis and comparing offers. Four apps in one: driver, company, mechanic and supplier.",
    },
    tech: ["React Native", "Node.js", "Modular monolith"],
    image: "/projects/golden-road.svg",
    demoUrl: "", // TODO
    repoUrl: "", // TODO
  },
];

export const awards = [
  {
    title: { mn: "NASA Space Apps Ulaanbaatar 2026", en: "NASA Space Apps Ulaanbaatar 2026" },
    result: { mn: "Тусгай шагнал", en: "Special award" },
  },
  {
    title: { mn: "UB Startup Town «Ideathon» 2026", en: "UB Startup Town “Ideathon” 2026" },
    result: { mn: "Тусгай шагнал", en: "Special award" },
  },
  {
    title: { mn: "СЭЗИС-ийн сагсан бөмбөгийн аварга шалгаруулах тэмцээн 2026", en: "UFE basketball championship 2026" },
    result: { mn: "Мөнгөн медаль", en: "Silver medal" },
  },
  {
    title: { mn: "СЭЗИС-ийн сагсан бөмбөгийн аварга шалгаруулах тэмцээн 2025", en: "UFE basketball championship 2025" },
    result: { mn: "Алтан медаль", en: "Gold medal" },
  },
  {
    title: { mn: "СЭЗИС-ийн сагсан бөмбөгийн аварга шалгаруулах тэмцээн 2024", en: "UFE basketball championship 2024" },
    result: { mn: "Алтан медаль", en: "Gold medal" },
  },
  {
    title: { mn: "СЭЗИС-ийн сагсан бөмбөгийн аварга шалгаруулах тэмцээн 2023", en: "UFE basketball championship 2023" },
    result: { mn: "Алтан медаль", en: "Gold medal" },
  },
  {
    title: { mn: "Шинэ Үе сургуулийн сагсан бөмбөгийн баг", en: "Shine Uye School basketball team" },
    result: { mn: "Багийн ахлагч", en: "Team captain" },
  },
  {
    title: { mn: "Сагсан бөмбөгийн спорт", en: "Basketball" },
    result: { mn: "Спортын 1-р зэрэг", en: "1st sports rank" },
  },
];

export const contact = {
  email: "changaanz7@gmail.com",
  phone: "+976 8088 6373",
  instagram: "https://instagram.com/grnet7u",
  facebook: "https://facebook.com/garnett1027",
  github: "https://github.com/grnet7u", // энэ төслийн repo байрлах бүртгэл
};

// Тоглоомын станцууд (дарааллаар). scale = станцын хэмжээ: мэдлэг өсөх тусам цагираг томорно.
// built: false = хараахан бэлэн биш «To be continued» станц (хожим жинхэнэ станц болгоно).
export const stations = [
  { id: "start", label: { mn: "Эхлэл", en: "Start" }, scale: 0.6 },
  { id: "sales", label: { mn: "Борлуулагч", en: "Sales" }, scale: 0.72 },
  {
    id: "dev", label: { mn: "Хөгжүүлэгч", en: "Developer" }, scale: 0.85,
    lead: {
      mn: "Мэдээллийн систем сурч, дадлага болон AI агентын ажлаар дамжуулан fullstack хөгжүүлэгч болсон.",
      en: "I studied Information Systems and grew into a fullstack developer through an internship and AI agent work.",
    },
  },
  {
    id: "projects", label: { mn: "Бүтээл", en: "Projects" }, scale: 0.98,
    lead: { mn: "Бодит асуудал шийдэх гэж хийсэн төслүүд маань.", en: "Projects I built to solve real problems." },
  },
  {
    id: "awards", label: { mn: "Шагнал", en: "Awards" }, scale: 1.12,
    lead: { mn: "Хакатон, тэмцээнд авсан амжилтууд.", en: "Results from hackathons and competitions." },
  },
  { id: "contact", label: { mn: "Холбоо", en: "Contact" }, scale: 1.25 },
  { id: "next", label: { mn: "TO BE CONTINUED…", en: "TO BE CONTINUED…" }, scale: 1.25, built: false },
];

// Товч, гарчиг зэрэг интерфейсийн текст
export const ui = {
  nav: {
    about: { mn: "Миний тухай", en: "About" },
    skills: { mn: "Ур чадвар", en: "Skills" },
    projects: { mn: "Бүтээлүүд", en: "Projects" },
    awards: { mn: "Шагнал", en: "Awards" },
    contact: { mn: "Холбоо барих", en: "Contact" },
  },
  salesTitle: { mn: "Борлуулагч байсан үе", en: "My sales years" },
  devTitle: { mn: "Хөгжүүлэгч болсон зам", en: "Becoming a developer" },
  wantToLearn: { mn: "Сурах хүсэлтэй", en: "Want to learn" },
  demo: { mn: "Демо", en: "Demo" },
  repo: { mn: "Код", en: "Code" },
  linkSoon: { mn: "Холбоос удахгүй", en: "Link coming soon" },
  contactText: {
    mn: "Хамтран ажиллах, асуух зүйл байвал бичээрэй.",
    en: "Want to work together or have a question? Get in touch.",
  },
  langLabel: { mn: "Switch to English", en: "Монгол хэл рүү солих" },
  themeLabel: { mn: "Өдөр/шөнийн горим солих", en: "Toggle light/dark mode" },
  footer: { mn: "Бүх код, зургийг өөрөө хийсэн.", en: "All code and art made by me." },
  start: { mn: "Эхлэх ▶", en: "Start ▶" },
  seeProjects: { mn: "Бүтээлүүд харах", en: "See my projects" },
  downloadPdf: { mn: "PDF татах", en: "Download PDF" },
  menu: { mn: "Үндсэн цэс", en: "Main menu" },
  footerMenu: { mn: "Доод цэс", en: "Footer menu" },
  backToTop: { mn: "Дээш буцах", en: "Back to top" },
  prev: { mn: "Өмнөх бүтээл", en: "Previous project" },
  next: { mn: "Дараагийн бүтээл", en: "Next project" },
  goTo: { mn: "Бүтээл рүү очих", en: "Go to project" },
  projectsLabel: { mn: "Бүтээлүүдийн carousel", en: "Projects carousel" },
  close: { mn: "Хаах", en: "Close" },
  continueTo: { mn: "Үргэлжлүүлэх", en: "Continue" },
  panelKeys: { mn: "Esc: хаах · Enter: дараагийн станц", en: "Esc: close · Enter: next station" },
  workflow: { mn: "Миний замын workflow", en: "My journey workflow" },
  startHint: {
    mn: "Баруун тийш алхаж станц бүрт хүр. Дээрх workflow-ийн зангилаа дээр дарвал шууд очно.",
    en: "Walk right and reach each station. Click a node in the workflow above to jump there.",
  },
  left: { mn: "Зүүн тийш", en: "Move left" },
  right: { mn: "Баруун тийш", en: "Move right" },
  jump: { mn: "Үсрэх", en: "Jump" },
  soundOn: { mn: "Дуу асаах", en: "Turn sound on" },
  soundOff: { mn: "Дуу унтраах", en: "Turn sound off" },
  shootPrompt: { mn: "Space дарж барих → суллах", en: "Hold Space → release" },
  release: {
    perfect: { mn: "ТӨГС!", en: "PERFECT!" },
    good: { mn: "Сайн", en: "Good" },
    early: { mn: "Эрт", en: "Early" },
    late: { mn: "Оройтсон", en: "Late" },
  },
  shoot: { mn: "Шидэх", en: "Shoot" },
  goal: { mn: "Гол! +3 XP", en: "Swish! +3 XP" },
  wider: { mn: "Тод бүс өргөслөө", en: "Bright zone is wider now" },
  moreSoon: { mn: "Үргэлжлэл бий…", en: "More coming…" },
  soon: { mn: "Удахгүй…", en: "Coming soon…" },
  toSimple: { mn: "Энгийн харах", en: "Simple view" },
  toGame: { mn: "Тоглох", en: "Play" },
  hint: {
    mn: "← → эсвэл A/D: алхах · Space: үсрэх / цагирагт дарж барьж суллах · Enter: станц нээх",
    en: "← → or A/D: walk · Space: jump / hold & release at a hoop · Enter: open station",
  },
};
