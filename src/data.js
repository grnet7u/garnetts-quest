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
    company: { mn: "CU", en: "CU" },
    title: { mn: "Бэлтгэгч (касс)", en: "Store staff (cashier)" },
    period: "2023-10 – 2023-11",
    visible: true,
  },
  {
    // Хэрэглэгч шийднэ: харуулах бол visible: true болго
    company: { mn: "WAT хөтөлбөр, АНУ", en: "Work and Travel, USA" },
    title: { mn: "3 сар ажилласан (англи хэлний орчин)", en: "Worked 3 months (English-speaking environment)" },
    period: "2024",
    visible: false,
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
  { id: "rn", icon: "phone", name: "React Native", group: "frontend", status: "learning" },
  { id: "php", icon: "server", name: "PHP (MVC)", group: "backend", status: "used" },
  { id: "laravel", icon: "server", name: "Laravel", group: "backend", status: "used" }, // Ajiltai BA-д ашигласан
  { id: "node", icon: "terminal", name: "JavaScript back-end", group: "backend", status: "using" },
  { id: "pg", icon: "database", name: "PostgreSQL", group: "data", status: "using" },
  { id: "supabase", icon: "database", name: "Supabase", group: "data", status: "using" },
  { id: "git", icon: "branch", name: "Git / GitHub", group: "tools", status: "using" },
  { id: "vscode", icon: "editor", name: "VS Code", group: "tools", status: "using" },
  { id: "vercel", icon: "cloud", name: "Vercel", group: "tools", status: "using" },
  { id: "electron", icon: "atom", name: "Electron", group: "tools", status: "used" },
  { id: "claude", icon: "spark", name: "Claude Code", group: "ai", status: "using" },
  { id: "groq", icon: "bolt", name: "Groq API", group: "ai", status: "using" },
  { id: "agent", icon: "robot", name: "AI agent", group: "ai", status: "using" },
  { id: "monolith", icon: "blocks", name: "Modular monolith", group: "arch", status: "used" },
  { id: "mvc", icon: "mvc", name: "MVC", group: "arch", status: "used" },
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
    image: "/projects/nasa.svg",
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
    tech: ["AI agent", "Groq API", "Next.js"],
    image: "/projects/ajiltai.svg",
    demoUrl: "https://ajiltai.tech/",
    repoUrl: "", // TODO
  },
  {
    id: "ajiltai-ba",
    title: { mn: "Ajiltai BA — бизнес шинжилгээний апп", en: "Ajiltai BA — business analysis app" },
    description: {
      mn: "Ажилтай АЙ ХХК-д зориулж хийсэн бизнес шинжилгээний (BA) апп.", // TODO: хэрэглэгч дэлгэрүүлнэ
      en: "A business analysis (BA) app built for Ajiltai AI LLC.",
    },
    tech: ["Laravel", "Octane", "Next.js", "Redis cache"],
    image: "/projects/ajiltai-ba.svg",
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
    title: { mn: "СЭЗИС-ийн сагсан бөмбөгийн аварга шалгаруулах тэмцээн 2022", en: "UFE basketball championship 2022" },
    result: { mn: "Оролцсон", en: "Participant" },
  },
];

export const contact = {
  email: "changaanz7@gmail.com",
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
  demo: { mn: "Демо", en: "Demo" },
  repo: { mn: "Код", en: "Code" },
  linkSoon: { mn: "Холбоос удахгүй", en: "Link coming soon" },
  contactText: {
    mn: "Хамтран ажиллах, асуух зүйл байвал бичээрэй.",
    en: "Want to work together or have a question? Get in touch.",
  },
  langButton: { mn: "EN", en: "МН" },
  langLabel: { mn: "Switch to English", en: "Монгол хэл рүү солих" },
  themeLabel: { mn: "Өдөр/шөнийн горим солих", en: "Toggle light/dark mode" },
  footer: { mn: "Бүх код, зургийг өөрөө хийсэн.", en: "All code and art made by me." },
  start: { mn: "Эхлэх ▶", en: "Start ▶" },
  seeProjects: { mn: "Бүтээлүүд харах", en: "See my projects" },
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
  shootPrompt: { mn: "Space: Шидэх", en: "Space: Shoot" },
  shoot: { mn: "Шидэх", en: "Shoot" },
  powerTitle: { mn: "POWER · тод бүсэд дахин дар", en: "POWER · press again in the bright zone" },
  powerNote: { mn: "2 удаа алдвал дараагийн шидэлтэд тод бүс өргөснө.", en: "Miss twice and the next shot gets a wider zone." },
  goal: { mn: "Гол! +3 XP", en: "Swish! +3 XP" },
  wider: { mn: "Тод бүс өргөслөө", en: "Bright zone is wider now" },
  moreSoon: { mn: "Үргэлжлэл бий…", en: "More coming…" },
  soon: { mn: "Удахгүй…", en: "Coming soon…" },
  toSimple: { mn: "Энгийн харах", en: "Simple view" },
  toGame: { mn: "Тоглох", en: "Play" },
  hint: {
    mn: "← → эсвэл A/D: алхах · Space: үсрэх / шидэх · Enter: станц нээх",
    en: "← → or A/D: walk · Space: jump / shoot · Enter: open station",
  },
};
