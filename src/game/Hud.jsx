import { stations, skills, ui } from "../data.js";

// Workflow HUD (n8n маягийн диаграм): зангилаа = станц, утас = тэдгээрийн хоорондох шугам.
// Төлөв: locked (очоогүй), active (одоо энд), done (очсон, ✓).
// Зангилаа дээр дарвал дүр тэр станц руу шууд очно (fast travel).
export default function Hud({ current, visited, collected, packet, log, onTravel, t }) {
  return (
    <div className="hud">
      <ol className="flow" aria-label={t(ui.workflow)}>
        {stations.map((st, i) => {
          const state = i === current ? "active" : visited.has(i) ? "done" : "locked";
          return (
            <li key={st.id} className="flow-item">
              {/* Өмнөх зангилаанаас ирэх утас. Очсон бол «урсана», packet энд гүйнэ */}
              {i > 0 && (
                <span className={"wire" + (visited.has(i) ? " live" : "")} aria-hidden="true">
                  {packet.to === i && <span key={packet.key} className="packet" />}
                </span>
              )}
              <button className="node" data-state={state} onClick={() => onTravel(i)}
                aria-current={i === current ? "step" : undefined}>
                <span className="node-mark" aria-hidden="true">{state === "done" ? "✓" : i + 1}</span>
                <span className="node-label">{t(st.label)}</span>
              </button>
            </li>
          );
        })}
      </ol>
      <div className="side">
        <span className="xp">XP {collected.size}/{skills.length}</span>
        <ul className="log" aria-live="polite">
          {log.slice(-3).map((line) => <li key={line.id}>{line.text}</li>)}
        </ul>
      </div>
    </div>
  );
}
