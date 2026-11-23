import { ui } from "../data.js";
import { stationX } from "./physics.js";

// Станц = сагсан бөмбөгийн цагираг: шилэн самбар, цэнхэр дөрвөлжин, улбар шар цагираг, цагаан тор,
// хар хөх шон. Бүх хэмжээг CSS-д нэг --k (station.scale)-аас тооцно, тиймээс станц бүр өөр хэмжээтэй.
export default function Station({ station, index, scored, t }) {
  const built = station.built !== false;
  return (
    <div
      className={"station" + (built ? "" : " unbuilt") + (scored ? " scored" : "")}
      style={{ left: stationX(index) + "px", "--k": station.scale }}
    >
      <div className="pole" />
      <div className="base" />
      <div className="arm" />
      <div className="board">
        <span className="lv">LV {index + 1}</span>
        <span className="board-name">{t(station.label)}</span>
        {!built && <span className="lv">{t(ui.moreSoon)}</span>}
      </div>
      {built && (
        <>
          <div className="square" />
          <Rim />
        </>
      )}
    </div>
  );
}

// Цагираг ба тор (өөрсдөө зурсан SVG). Цагираг самбарын зүүн талд унжина
function Rim() {
  const net = "M8 10 L22 62 M18 11 L27 62 M28 11 L32 62 M38 11 L38 63 M48 11 L44 62 M58 11 L49 62 M68 10 L54 62 M13 30 Q38 35 63 30 M17 46 Q38 51 59 46";
  return (
    <svg className="rim" viewBox="0 0 78 70" aria-hidden="true">
      <path d={net} stroke="var(--net-shadow)" strokeWidth="3.6" fill="none" />
      <path d={net} stroke="#FFFFFF" strokeWidth="1.8" fill="none" />
      <path d="M68 6 H78" stroke="#C2410C" strokeWidth="5" />
      <ellipse cx="38" cy="6" rx="31" ry="5" fill="none" stroke="#F97316" strokeWidth="5" />
      <path d="M7 6 A31 5 0 0 0 69 6" fill="none" stroke="#C2410C" strokeWidth="5" />
    </svg>
  );
}
