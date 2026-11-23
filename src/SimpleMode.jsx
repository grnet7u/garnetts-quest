import { profile, salesJobs, salesSummary, devHistory, skills, skillGroups, statusLabels, projects, awards, contact, ui } from "./data.js";

// «Энгийн горим»: data.js-ийн өгөгдлөөс үүссэн ердийн, семантик хуудас.
// Тоглоом ажиллахгүй үед ч 5 заавал байх хэсэг бүгд энд харагдана.
export default function SimpleMode({ t }) {
  return (
    <div className="simple">
      <header className="hero">
        <h1>{t(profile.name)}</h1>
        <p className="role">{t(profile.role)} · {t(profile.school)}</p>
        <p className="tagline">{t(profile.tagline)}</p>
        <nav aria-label="Sections">
          {Object.entries(ui.nav).map(([id, label]) => (
            <a key={id} href={"#" + id}>{t(label)}</a>
          ))}
        </nav>
      </header>

      <main>
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
              <ul className="chips">
                {skills.filter((s) => s.group === group).map((s) => (
                  <SkillChip key={s.id} skill={s} t={t} />
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section id="projects">
          <h2>{t(ui.nav.projects)}</h2>
          <div className="cards">
            {projects.map((p) => <ProjectCard key={p.id} project={p} t={t} />)}
          </div>
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

      <footer>{t(ui.footer)}</footer>
    </div>
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

export function SkillChip({ skill, t }) {
  return (
    <li className={"chip " + skill.status} title={t(statusLabels[skill.status])}>
      <span aria-hidden="true">{statusIcon[skill.status]}</span> {skill.name}
      <span className="sr-only"> ({t(statusLabels[skill.status])})</span>
    </li>
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
      <h3>{t(project.title)}</h3>
      <p>{t(project.description)}</p>
      <ul className="chips small">
        {project.tech.map((name) => <li key={name} className="chip">{name}</li>)}
      </ul>
      <p className="links">
        {project.demoUrl && <a href={project.demoUrl} target="_blank" rel="noreferrer">{t(ui.demo)} ↗</a>}
        {project.repoUrl && <a href={project.repoUrl} target="_blank" rel="noreferrer">{t(ui.repo)} ↗</a>}
        {!project.demoUrl && !project.repoUrl && <span className="muted">{t(ui.linkSoon)}</span>}
      </p>
    </article>
  );
}

export function ContactLinks() {
  return (
    <ul className="contact-links">
      <li><a href={"mailto:" + contact.email}>✉ {contact.email}</a></li>
      <li><a href={contact.facebook} target="_blank" rel="noreferrer">Facebook: garnett1027</a></li>
      {contact.github && <li><a href={contact.github} target="_blank" rel="noreferrer">GitHub</a></li>}
    </ul>
  );
}
