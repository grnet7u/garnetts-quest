import { useEffect, useRef } from "react";
import { profile, salesJobs, salesSummary, devHistory, skills, awards, stations, ui } from "../data.js";
import { SkillChip, ContactLinks } from "../SimpleMode.jsx";
import ProjectCarousel from "../ProjectCarousel.jsx";

// Станц нээгдсэний дараах карт (компьютерт баруун талд, утсанд доороос гарах bottom sheet).
// Бүтэц: LV · XP шошго, ✕, гарчиг, 1–2 өгүүлбэр, түүхэн жагсаалт, «Үргэлжлүүлэх →» товч.
// Агуулга нь энгийн горимын компонентуудыг дахин ашигладаг (давхардал байхгүй).
export default function Panel({ index, xp, onClose, onContinue, t }) {
  const panelRef = useRef(null);

  // Нээгдэхэд панел өөрөө focus авна: Tab дарвал доторх товч руу орно, Esc хаана.
  // (✕ товч дээр focus тавивал үсэрч байсан тоглогчийн Space панелийг шууд хаачихна.)
  useEffect(() => panelRef.current.focus(), [index]);

  // Enter = дараагийн станц (холбоос/товч дээр focus байвал тэдний Enter ажиллана)
  function onKeyDown(event) {
    if (event.key === "Enter" && event.target === event.currentTarget) {
      // Тоглоомын window listener энэ Enter-ийг «станц нээх» гэж дахин уншихгүй байх ёстой
      event.stopPropagation();
      onContinue();
    }
  }

  const station = stations[index];
  const next = stations[index + 1];
  return (
    <section className="panel" aria-labelledby="panel-title" tabIndex={-1} ref={panelRef} onKeyDown={onKeyDown}>
      <div className="panel-head">
        <span className="panel-pill">LV {index + 1} · {xp}/18 XP</span>
        <button onClick={onClose} aria-label={t(ui.close)}>✕</button>
      </div>
      <h2 id="panel-title">{index === 0 ? t(profile.name) : t(station.label)}</h2>
      <PanelContent id={station.id} t={t} />
      {next && (
        <button className="continue" onClick={onContinue}>
          {t(ui.continueTo)}: {t(next.label)} →
        </button>
      )}
      <span className="panel-keys">{t(ui.panelKeys)}</span>
    </section>
  );
}

function PanelContent({ id, t }) {
  if (id === "start") {
    return (
      <>
        <p className="lead">{t(profile.role)} · {t(profile.school)}</p>
        <p className="lead">{t(profile.tagline)}</p>
        <p className="muted">{t(ui.startHint)}</p>
      </>
    );
  }
  if (id === "sales") {
    return (
      <>
        <p className="lead">{t(salesSummary)}</p>
        <History items={salesJobs.filter((job) => job.visible).map((j) => ({ title: t(j.title), meta: [t(j.company), j.period] }))} />
      </>
    );
  }
  if (id === "dev") {
    return (
      <>
        <p className="lead">{t(stations[2].lead)}</p>
        <History items={devHistory.map((j) => ({ title: t(j.company), meta: [t(j.title), j.period] }))} />
        <h3>{t(ui.nav.skills)} · {skills.length}</h3> {/* оноо биш, нийт ур чадварын тоо */}
        <ul className="chips">
          {skills.map((s) => (
            <SkillChip key={s.id} skill={s} t={t} />
          ))}
        </ul>
      </>
    );
  }
  if (id === "projects") {
    return (
      <>
        <p className="lead">{t(stations[3].lead)}</p>
        <ProjectCarousel t={t} />
      </>
    );
  }
  if (id === "awards") {
    return (
      <>
        <p className="lead">{t(stations[4].lead)}</p>
        <History items={awards.map((a) => ({ title: t(a.title), meta: [t(a.result)] }))} />
      </>
    );
  }
  return (
    <>
      <p className="lead">{t(ui.contactText)}</p>
      <ContactLinks />
    </>
  );
}

// Түүхэн жагсаалт: зүүн талд босоо шугам + цэнхэр цэг, баруун талд гарчиг ба тайлбар
function History({ items }) {
  return (
    <ul className="history">
      {items.map((item, i) => (
        <li key={i}>
          <strong>{item.title}</strong>
          <span className="muted">{item.meta.filter(Boolean).join(" · ")}</span>
        </li>
      ))}
    </ul>
  );
}
