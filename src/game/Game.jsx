import { useEffect, useRef, useState } from "react";
import { stations, skills, ui } from "../data.js";
import {
  step, cameraFor, stationX, coinX, coinY, touchesCoin, WORLD_W,
  shootZone, shootSpot, rimCenter, meterPos, isHit, zoneHalf, bezier, arcControl,
} from "./physics.js";
import Character from "./Character.jsx";
import Panel from "./Panel.jsx";
import Hud from "./Hud.jsx";
import Station from "./Station.jsx";
import TouchControls from "./TouchControls.jsx";
import { beep } from "./sound.js";

// Тоглоомын горим. Хоёр хэсэгтэй:
//  1) React — ертөнц, HUD, панелийг зурна. Зөвхөн «үйл явдал» (гол, зоос, панел) болоход шинэчлэгдэнэ.
//  2) Game loop (requestAnimationFrame) — секундэд ~60 удаа дүр, бөмбөг, camera, POWER тэмдгийг
//     DOM дээр шууд хөдөлгөнө. 60 удаа React render хийх шаардлагагүй тул state биш, ref ашиглана.
export default function Game({ t }) {
  const stageRef = useRef(null);
  const worldRef = useRef(null);
  const playerRef = useRef(null);
  const ballRef = useRef(null);
  const markerRef = useRef(null);

  // Дүрийн төлөв (game loop өөрчилнө). Эхлээд Start станцын өмнө зогсоно
  const player = useRef({ x: shootSpot(0), y: 0, vx: 0, vy: 0, facing: 1, onGround: true }).current;
  // Товчны төлөв. Гар (keyboard) болон утасны товч энийг өөрчилнө. jump = Space / Shoot товч
  const input = useRef({ left: false, right: false, jump: false, enter: false }).current;
  // Шидэлтийн төлөв: aim = POWER хэмжигч ажиллаж байна, flight = бөмбөг нисэж байна
  const shot = useRef({ aim: null, flight: null, misses: 0 }).current;
  // Дэлгэцийн масштаб (ws): намхан дэлгэц дээр (утас) станцууд HUD-тай давхцахгүйн тулд жижгэрнэ
  const view = useRef({ ws: 1, snap: true }).current; // snap = camera-г шууд байрлуулах

  // React state: дэлгэц дээр харагдах зүйлс
  const [panel, setPanel] = useState(0); // нээлттэй панелийн станц (-1 = хаалттай). Эхлэхэд Start нээлттэй
  const [current, setCurrent] = useState(0); // дүр аль станцын шидэх бүсэд байгаа (-1 = замд)
  const [visited, setVisited] = useState(() => new Set([0]));
  const [collected, setCollected] = useState(() => new Set());
  const [packet, setPacket] = useState({ to: -1, key: 0 });
  const [log, setLog] = useState([{ id: 0, text: "✔ success: Start" }]);
  const [aiming, setAiming] = useState(null); // POWER хэмжигч харагдах эсэх { half } эсвэл null
  const [goal, setGoal] = useState(null); // «Гол! +3 XP» шошго { key, i }
  const [toast, setToast] = useState(null); // жижиг мэдэгдэл { key, text }

  // Game loop нь нэг л удаа эхэлдэг тул хамгийн сүүлийн утгыг ref-ээр уншина
  const live = useRef({});
  live.current = { panel, visited, collected, t };

  function addLog(text) {
    setLog((lines) => [...lines, { id: Date.now() + Math.random(), text }]);
  }
  function showToast(text) {
    setToast((old) => ({ key: (old?.key ?? 0) + 1, text }));
  }

  // Станцыг «дууссан» болгох: HUD-д ✓, утсаар packet гүйнэ, log-д success
  function markDone(i) {
    if (live.current.visited.has(i)) return;
    setVisited((old) => new Set(old).add(i));
    setPacket((old) => ({ to: i, key: old.key + 1 }));
    addLog("✔ success: " + live.current.t(stations[i].label));
  }

  // Шидэлтгүйгээр шууд нээх (Enter, «Үргэлжлүүлэх»)
  function openStation(i) {
    if (stations[i].built === false) return showToast(live.current.t(ui.soon));
    markDone(i);
    setCurrent(i);
    setPanel(i);
  }

  // Гол орсон: самбар гэрэлтэж, шошго гарч, хэсэг хугацааны дараа панел нээгдэнэ
  function score(i) {
    shot.misses = 0;
    setGoal((old) => ({ key: (old?.key ?? 0) + 1, i }));
    beep(988);
    setTimeout(() => beep(1319, 150), 110);
    markDone(i);
    setTimeout(() => setPanel(i), 700);
  }

  function miss() {
    shot.misses += 1;
    addLog("✖ miss");
    beep(220, 160);
    if (shot.misses === 2) showToast(live.current.t(ui.wider));
  }

  function collect(index) {
    const skill = skills[index];
    setCollected((old) => new Set(old).add(skill.id));
    addLog("✔ " + skill.name + " collected");
    beep(880);
  }

  // Fast travel: HUD-ийн зангилаа дээр дарахад тэр станцын шидэх газар руу шууд очно
  function travel(i) {
    shot.aim = null;
    setAiming(null);
    player.x = shootSpot(i);
    player.y = 0;
    view.snap = true; // fast travel: camera удаан гүйлгүй шууд очно
    setCurrent(i);
    if (stations[i].built === false) showToast(live.current.t(ui.soon));
  }

  // Гарын товч
  useEffect(() => {
    function onKey(event, isDown) {
      if (event.key === "Escape") {
        shot.aim = null; // онилж байсныг цуцална
        setAiming(null);
        return setPanel(-1);
      }
      // Панел нээлттэй, эсвэл товч/холбоос дээр focus байвал дарсан товчийг тэдэнд үлдээнэ.
      // Харин товч суллах (keyup)-ыг үргэлж бүртгэнэ, эс бөгөөс дүр «гацаж» өөрөө алхсаар байна.
      // (window дээр шууд үүссэн event-д closest байхгүй тул ?. ашиглана)
      const busy = live.current.panel !== -1 || event.target.closest?.("button, a");
      if (isDown && busy) return;
      const key = event.key.toLowerCase();
      if (key === "arrowleft" || key === "a") input.left = isDown;
      else if (key === "arrowright" || key === "d") input.right = isDown;
      else if (key === " " || key === "arrowup" || key === "w") input.jump = isDown;
      else if (key === "enter") input.enter = isDown;
      else return;
      event.preventDefault(); // хуудас гүйлгэгдэхээс сэргийлнэ
    }
    // Хулганаар товч дарсны дараа focus-ийг авна, эс бөгөөс дараагийн Space тэр товчийг дахин дарна.
    // (e.detail > 0 = хулгана/хуруу; клавиатураар дарахад 0 тул клавиатурын хэрэглэгчийн focus хэвээр)
    function onClick(e) {
      if (e.detail > 0) e.target.closest?.("button")?.blur();
    }
    const down = (e) => onKey(e, true);
    const up = (e) => onKey(e, false);
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    window.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
      window.removeEventListener("click", onClick);
    };
  }, [input, shot]);

  // Game loop
  useEffect(() => {
    let last = performance.now();
    let frameId;
    let lastZone = 0;
    let prevJump = false;
    let camX = 0; // camera-ийн одоогийн байрлал (зорилт руугаа зөөлөн гүйнэ)

    function frame(now) {
      // dt = өмнөх frame-ээс хойш өнгөрсөн секунд (таб нуугдсан үед хэт том болохгүй байлгана)
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      // «Дарсан агшин»: өмнөх frame-д дараагүй, одоо дарсан (удаан дарж байхад давтагдахгүй)
      const pressed = input.jump && !prevJump;
      prevJump = input.jump;

      // Панел нээлттэй үед бүх зүйл зогсоно
      if (live.current.panel === -1) {
        const zone = shootZone(player.x, stations.length);
        if (shot.flight) updateFlight(now);
        else if (shot.aim) updateAim(now, pressed);
        else {
          if (pressed && zone !== -1 && player.onGround) startAim(zone, now);
          // Шидэх бүсэд Space үсрүүлэхгүй
          step(player, { ...input, jump: input.jump && zone === -1 }, dt);
        }
        checkZone(zone);
        checkCoins();
      }
      draw(dt);
      frameId = requestAnimationFrame(frame);
    }

    // HUD-ийн «одоогийн» зангилаа ба Enter-ээр шууд нээх
    function checkZone(zone) {
      if (zone !== lastZone) {
        lastZone = zone;
        setCurrent(zone);
      }
      if (input.enter) {
        input.enter = false;
        if (zone !== -1) {
          shot.aim = null;
          setAiming(null);
          openStation(zone);
        }
      }
      const canShoot = zone !== -1 && stations[zone].built !== false && !shot.aim && !shot.flight;
      playerRef.current.classList.toggle("can-shoot", canShoot);
    }

    function startAim(i, now) {
      if (stations[i].built === false) return showToast(live.current.t(ui.soon));
      shot.aim = { i, start: now };
      setAiming({ half: zoneHalf(shot.misses) });
      addLog("▶ run: " + live.current.t(stations[i].label));
    }

    // POWER тэмдэг хөдөлнө. Дахин дарахад тэр байрлалаар шиднэ
    function updateAim(now, pressed) {
      const pos = meterPos((now - shot.aim.start) / 1000);
      if (markerRef.current) markerRef.current.style.left = pos * 100 + "%";
      if (!pressed) return;
      const { i } = shot.aim;
      shot.aim = null;
      setAiming(null);
      launch(i, isHit(pos, shot.misses), pos < 0.5, now);
    }

    // Бөмбөгний замыг тооцно: гараас (p0) цагираг руу (p2). Алдвал цагирагийн урд ирмэг
    // (сул шидсэн) эсвэл самбар (хүчтэй шидсэн) руу очоод буцаж үсэрнэ.
    function launch(i, hit, short, now) {
      const k = stations[i].scale * view.ws; // CSS-тэй ижил масштаб, эс бөгөөс бөмбөг цагирагт хүрэхгүй
      const rim = rimCenter(i, k);
      const hand = playerRef.current.offsetHeight * 0.85;
      const p0 = { x: player.x + 20, y: player.y + hand };
      const p2 = hit ? { x: rim.x, y: rim.y + 8 } : short ? { x: rim.x - 40 * k, y: rim.y } : { x: rim.x + 60 * k, y: rim.y + 50 * k };
      shot.flight = { i, hit, p0, p1: arcControl(p0, p2, 200), p2, t0: now, dur: 800, bounce: false };
      player.facing = 1;
      playerRef.current.classList.add("throwing");
      beep(440);
    }

    // Бөмбөгийг Bézier-ийн t (0→1)-ээр хөдөлгөнө
    function updateFlight(now) {
      const f = shot.flight;
      const t = Math.min((now - f.t0) / f.dur, 1);
      const p = bezier(f.p0, f.p1, f.p2, t);
      ballRef.current.style.transform = `translate3d(${p.x}px, ${-p.y}px, 0)`;
      ballRef.current.style.opacity = 1;
      if (t < 1) return;

      if (f.hit) return endFlight(() => score(f.i));
      if (!f.bounce) {
        // Цагираг/самбарт мөргөөд дүр рүү буцаж үсэрнэ
        const back = { x: player.x + 60, y: 0 };
        shot.flight = { ...f, p0: f.p2, p1: arcControl(f.p2, back, 80), p2: back, t0: now, dur: 600, bounce: true };
        return;
      }
      endFlight(miss);
    }

    function endFlight(after) {
      shot.flight = null;
      ballRef.current.style.opacity = 0;
      playerRef.current.classList.remove("throwing");
      after();
    }

    function checkCoins() {
      skills.forEach((skill, i) => {
        if (!live.current.collected.has(skill.id) && touchesCoin(player, i)) {
          live.current.collected.add(skill.id); // дараагийн render хүртэл давхар авахаас сэргийлнэ
          collect(i);
        }
      });
    }

    // Хамгийн том станц (k=1.25, 505px) газар ба HUD-ын хооронд багтах масштаб
    function updateScale() {
      const stage = stageRef.current;
      const groundTop = stage.clientHeight - stage.querySelector(".ground").offsetHeight;
      const hudBottom = stage.querySelector(".hud").getBoundingClientRect().bottom;
      const room = groundTop - hudBottom - 24; // HUD-ын доод ирмэгээс газар хүртэлх зай
      view.ws = Math.min(1, Math.max(0.45, room / 520));
      stage.style.setProperty("--ws", view.ws);
    }
    updateScale();
    window.addEventListener("resize", updateScale);

    function draw(dt) {
      // Шидэх бүсэд camera дүр ба цагирагийн дундуур харна (утсан дээр цагираг дэлгэцнээс гарахгүй)
      const zone = lastZone;
      const focusX = zone !== -1 ? (player.x + stationX(zone)) / 2 : player.x;
      const target = cameraFor(focusX, stageRef.current.clientWidth);
      camX = view.snap ? target : camX + (target - camX) * Math.min(1, dt * 6); // зөөлөн дагах (lerp)
      view.snap = false;
      worldRef.current.style.transform = `translate3d(${-camX}px, 0, 0)`;
      stageRef.current.style.setProperty("--cam", camX); // parallax давхаргууд үүнийг ашиглана

      const el = playerRef.current;
      el.style.transform = `translate3d(${player.x}px, ${-player.y}px, 0)`;
      el.classList.toggle("walking", player.vx !== 0 && player.onGround);
      el.classList.toggle("jumping", !player.onGround);
      el.classList.toggle("face-left", player.facing < 0);
    }

    frameId = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", updateScale);
    };
    // score/miss/collect нь зөвхөн setState дууддаг тул loop-ийг дахин эхлүүлэх шаардлагагүй
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // XP: бэлэн станц бүрт 3 оноо (6 станц × 3 = 18)
  const xp = 3 * [...visited].filter((i) => stations[i].built !== false).length;

  return (
    <div className="game" ref={stageRef}>
      <div className="sky" />
      <Skyline className="layer far" count={80} maxH={14} seed={3} />
      <Skyline className="layer mid" count={100} maxH={9} seed={7} />

      <div className="world" ref={worldRef} style={{ width: WORLD_W + "px" }}>
        <div className="ground">
          <div className="track" />
        </div>
        {stations.map((st, i) => (
          <Station key={st.id} station={st} index={i} scored={visited.has(i)} t={t} />
        ))}
        {goal && (
          <div key={goal.key} className="goal-pill"
            style={{ left: stationX(goal.i) + "px", "--k": stations[goal.i].scale }}>
            {t(ui.goal)}
          </div>
        )}
        {skills.map((skill, i) =>
          collected.has(skill.id) ? null : (
            <div key={skill.id} className="coin" title={skill.name}
              style={{ left: coinX(i) + "px", "--lift": coinY(i) + "px" }}>
              {skill.name.slice(0, 2)}
            </div>
          )
        )}
        <div className="player" ref={playerRef}>
          <span className="prompt">{t(ui.shootPrompt)}</span>
          <Character />
        </div>
        <div className="ball" ref={ballRef} aria-hidden="true" />
      </div>

      <Hud current={current} visited={visited} xp={xp} packet={packet} log={log} onTravel={travel} t={t} />
      {aiming && (
        <div className="power">
          <span className="power-title">{t(ui.powerTitle)}</span>
          <div className="power-bar">
            <div className="sweet" style={{ left: (0.5 - aiming.half) * 100 + "%", width: aiming.half * 200 + "%" }} />
            <div className="marker" ref={markerRef} />
          </div>
          <span className="power-note">{t(ui.powerNote)}</span>
        </div>
      )}
      {toast && <div key={toast.key} className="toast" role="status">{toast.text}</div>}
      {panel !== -1 && <Panel index={panel} collected={collected} onClose={() => setPanel(-1)} t={t} />}
      <p className="hint">{t(ui.hint)}</p>
      <TouchControls input={input} canShoot={current !== -1 && stations[current].built !== false} t={t} />
    </div>
  );
}

// Хотын siluet: тэгш өнцөгт байшингууд. Өндрийг санамсаргүй биш, томъёогоор гаргадаг
// тул дахин ачаалахад ижил харагдана. Давхарга бүр --cam-аас өөр хурдтай хөдөлнө (parallax).
function Skyline({ className, count, maxH, seed }) {
  const buildings = [];
  for (let i = 0; i < count; i++) {
    const h = 3 + ((i * seed * 7) % maxH); // rem
    const w = 3 + ((i * seed) % 3); // rem
    buildings.push(<span key={i} style={{ height: h + "rem", width: w + "rem" }} />);
  }
  return <div className={className} aria-hidden="true">{buildings}</div>;
}
