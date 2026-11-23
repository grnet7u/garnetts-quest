import { useEffect, useRef } from "react";
import { profile, salesJobs, salesSummary, devHistory, skills, projects, awards, stations, ui } from "../data.js";
import { Timeline, SkillChip, ProjectCard, ContactLinks } from "../SimpleMode.jsx";

// Станц дээр нээгддэг панел. index = станцын дугаар (0–5).
// Агуулга нь энгийн горимын компонентуудыг дахин ашигладаг (давхардал байхгүй).
export default function Panel({ index, collected, onClose, t }) {
  const panelRef = useRef(null);

  // Нээгдэхэд панел өөрөө focus авна: Tab дарвал доторх товч руу орно, Esc хаана.
  // (✕ товч дээр focus тавивал үсэрч байсан тоглогчийн Space панелийг шууд хаачихна.)
  useEffect(() => panelRef.current.focus(), [index]);

  const station = stations[index];
  return (
    <div className="panel" role="dialog" aria-labelledby="panel-title" tabIndex={-1} ref={panelRef}>
      <div className="panel-head">
        <h2 id="panel-title">{index + 1}. {t(station.label)}</h2>
        <button onClick={onClose} aria-label={t(ui.close)}>✕</button>
      </div>
      <div className="panel-body">
        <PanelContent id={station.id} collected={collected} onClose={onClose} t={t} />
      </div>
    </div>
  );
}

function PanelContent({ id, collected, onClose, t }) {
  if (id === "start") {
    return (
      <>
        <p className="big">{t(profile.name)}</p>
        <p className="role">{t(profile.role)} · {t(profile.school)}</p>
        <p>{t(profile.tagline)}</p>
        <p className="muted">{t(ui.startHint)}</p>
        <button onClick={onClose}>{t(ui.start)}</button>
      </>
    );
  }
  if (id === "sales") {
    return (
      <>
        <Timeline items={salesJobs.filter((job) => job.visible)} t={t} />
        <p>{t(salesSummary)}</p>
      </>
    );
  }
  if (id === "dev") {
    return (
      <>
        <Timeline items={devHistory} t={t} />
        <h3>{t(ui.nav.skills)} · XP {collected.size}/{skills.length}</h3>
        <ul className="chips">
          {skills.map((s) => (
            <SkillChip key={s.id} skill={s} t={t} />
          ))}
        </ul>
      </>
    );
  }
  if (id === "projects") {
    return <div className="cards">{projects.map((p) => <ProjectCard key={p.id} project={p} t={t} />)}</div>;
  }
  if (id === "awards") {
    return (
      <ul className="list">
        {awards.map((a) => (
          <li key={a.title.en}><strong>{t(a.title)}</strong> — {t(a.result)}</li>
        ))}
      </ul>
    );
  }
  return (
    <>
      <p>{t(ui.contactText)}</p>
      <ContactLinks />
      <p className="muted">{t(ui.hoopHint)}</p>
    </>
  );
}
