import Icon from "./Icon.jsx";
import ProjectCarousel from "./ProjectCarousel.jsx";
import { profile, salesJobs, salesSummary, devHistory, skills, skillGroups, statusLabels, wantToLearn, awards, contact, ui } from "./data.js";

// «Энгийн горим»: data.js-ийн өгөгдлөөс үүссэн ердийн, семантик хуудас.
// Тоглоом ажиллахгүй үед ч 5 заавал байх хэсэг бүгд энд харагдана.
// Бүтэц: header (нэр + nav bar + toolbar) → main (hero + 5 хэсэг) → footer.
export default function SimpleMode({ t, toolbar }) {
  return (
    <div className="simple-page" id="top">
      <header className="site-header">
        <div className="bar">
          <a className="brand" href="#top">Garnett<span aria-hidden="true">.</span></a>
          <NavLinks t={t} label={t(ui.menu)} />
          {toolbar}
        </div>
      </header>

      <main className="simple">
        <section className="hero" aria-labelledby="hero-title">
          <p className="role">{t(profile.role)} · {t(profile.school)}</p>
          <h1 id="hero-title">{t(profile.name)}</h1>
          <p className="tagline">{t(profile.tagline)}</p>
          <div className="hero-actions">
            <a className="btn primary" href="#projects">{t(ui.seeProjects)}</a>
            <a className="btn" href="#contact">{t(ui.nav.contact)}</a>
            {/* PDF: хөтчийн хэвлэх цонх нээгдэнэ → «Save as PDF». Нэмэлт сан хэрэггүй */}
            <button className="btn" onClick={() => window.print()}>
              <Icon name="download" size="1.1rem" /> {t(ui.downloadPdf)}
            </button>
          </div>
          <SocialLinks />
        </section>

        <section id="about">
          <h2>{t(ui.nav.about)}</h2>
          <h3>{t(ui.salesTitle)}</h3>
          <Timeline items={salesJobs.filter((job) => job.visible)} t={t} />
          <p>{t(salesSummary)}</p>
          <h3>{t(ui.devTitle)}</h3>
          <Timeline items={devHistory} t={t} />
        </section>

        <section id="skills">
          <h2>{t(ui.nav.skills)}</h2>
          <SkillLegend t={t} />
          {Object.entries(skillGroups).map(([group, label]) => (
            <div key={group} className="skill-group">
              <h3>{t(label)}</h3>
              <ul className="chips skill-list">
                {skills.filter((s) => s.group === group).map((s) => (
                  <SkillChip key={s.id} skill={s} t={t} />
                ))}
              </ul>
            </div>
          ))}
          <WantToLearn t={t} />
        </section>

        <section id="projects">
          <h2>{t(ui.nav.projects)}</h2>
          <ProjectCarousel t={t} />
        </section>

        <section id="awards">
          <h2>{t(ui.nav.awards)}</h2>
          <ul className="list">
            {awards.map((a) => (
              <li key={a.title.en}><strong>{t(a.title)}</strong> — {t(a.result)}</li>
            ))}
          </ul>
        </section>

        <section id="contact">
          <h2>{t(ui.nav.contact)}</h2>
          <p>{t(ui.contactText)}</p>
          <ContactLinks />
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-grid">
          <div>
            <a className="brand" href="#top">Garnett<span aria-hidden="true">.</span></a>
            <p className="muted">{t(profile.role)}</p>
          </div>
          <NavLinks t={t} label={t(ui.footerMenu)} />
          <SocialLinks />
        </div>
        <div className="footer-bottom">
          <span>© 2026 {t(profile.name)} · {t(ui.footer)}</span>
          <a href="#top"><Icon name="arrowUp" /> {t(ui.backToTop)}</a>
        </div>
      </footer>
    </div>
  );
}

// Хэсгүүд рүү очих цэс (header ба footer-т давтагдана)
function NavLinks({ t, label }) {
  return (
    <nav aria-label={label}>
      <ul className="nav-links">
        {Object.entries(ui.nav).map(([id, text]) => (
          <li key={id}><a href={"#" + id}>{t(text)}</a></li>
        ))}
      </ul>
    </nav>
  );
}

// Ажлын түүх: компани, албан тушаал, хугацаа
export function Timeline({ items, t }) {
  return (
    <ul className="list">
      {items.map((item) => (
        <li key={item.company.en}>
          <strong>{t(item.company)}</strong> — {t(item.title)}
          {item.period && <span className="muted"> · {item.period}</span>}
        </li>
      ))}
    </ul>
  );
}

// Төлөвийг өнгөөр биш, тэмдэг + хүрээний хэлбэрээр ялгана (✓ дүүрсэн, ● хүрээтэй, ◌ тасархай)
const statusIcon = { used: "✓", using: "●", learning: "◌" };
// Хувь: data.js-д skill.level өгвөл тэрийг, үгүй бол төлөвөөс нь авна
const levelByStatus = { used: 90, using: 70, learning: 40 };

export function SkillChip({ skill, t }) {
  const level = skill.level ?? levelByStatus[skill.status];
  return (
    <li className={"chip " + skill.status} title={t(statusLabels[skill.status])}>
      <span aria-hidden="true">{statusIcon[skill.status]}</span> <Icon name={skill.icon} /> {skill.name}
      <span className="sr-only"> ({t(statusLabels[skill.status])})</span>
      <span className="bar" aria-hidden="true"><span style={{ width: level + "%" }} /></span>
      <span className="pct">{level}%</span>
    </li>
  );
}

// «Сурах хүсэлтэй»: сэдэв бүр (AWS, …) доор нь задалсан дэд сэдвүүд тасархай chip-ээр
export function WantToLearn({ t }) {
  return (
    <div className="skill-group">
      <h3>{t(ui.wantToLearn)}</h3>
      {wantToLearn.map((topic) => (
        <div key={topic.name} className="learn-topic">
          <h4>◌ {topic.name}</h4>
          <ul className="chips small">
            {topic.items.map((item) => (
              <li key={item.en} className="chip learning">{t(item)}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function SkillLegend({ t }) {
  return (
    <ul className="chips legend">
      {Object.keys(statusLabels).map((status) => (
        <li key={status} className={"chip " + status}>
          <span aria-hidden="true">{statusIcon[status]}</span> {t(statusLabels[status])}
        </li>
      ))}
    </ul>
  );
}

export function ProjectCard({ project, t }) {
  return (
    <article className="card">
      <img src={project.image} alt={t(project.title)} width="640" height="360" loading="lazy" />
      <div className="card-text">
        <h3>{t(project.title)}</h3>
        <p>{t(project.description)}</p>
        {project.tech.length > 0 && (
          <ul className="chips small">
            {project.tech.map((name) => <li key={name} className="chip">{name}</li>)}
          </ul>
        )}
        <p className="links">
          {project.demoUrl && <a href={project.demoUrl} target="_blank" rel="noreferrer">{t(ui.demo)} <Icon name="external" /></a>}
          {project.repoUrl && <a href={project.repoUrl} target="_blank" rel="noreferrer">{t(ui.repo)} <Icon name="external" /></a>}
          {!project.demoUrl && !project.repoUrl && <span className="muted">{t(ui.linkSoon)}</span>}
        </p>
      </div>
    </article>
  );
}

// Холбоо барих: текстгүй том icon товчнууд
export function ContactLinks() {
  return <SocialLinks big />;
}

// big = Холбоо барих хэсгийн том хувилбар. Icon-ы утгыг aria-label ба title (tooltip)-аар өгнө
export function SocialLinks({ big = false }) {
  const links = [
    { name: "mail", label: "Email: " + contact.email, href: "mailto:" + contact.email },
    { name: "facebook", label: "Facebook: garnett1027", href: contact.facebook },
    { name: "github", label: "GitHub: grnet7u", href: contact.github },
  ].filter((link) => link.href);
  return (
    <ul className={"social" + (big ? " big" : "")}>
      {links.map((link) => (
        <li key={link.name}>
          <a href={link.href} aria-label={link.label} title={link.label}
            {...(link.name === "mail" ? {} : { target: "_blank", rel: "noreferrer" })}>
            <Icon name={link.name} size={big ? "1.75rem" : "1.25rem"} />
          </a>
        </li>
      ))}
    </ul>
  );
}
