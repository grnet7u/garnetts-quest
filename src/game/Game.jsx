import { useEffect, useRef, useState } from "react";
import { stations, skills, ui } from "../data.js";
import { step, cameraFor, nearStation, stationX, coinX, coinY, touchesCoin, WORLD_W } from "./physics.js";
import Character from "./Character.jsx";
import Panel from "./Panel.jsx";
import Hud from "./Hud.jsx";
import TouchControls from "./TouchControls.jsx";
import { beep } from "./sound.js";

// Тоглоомын горим. Хоёр хэсэгтэй:
//  1) React — ертөнц, HUD, панелийг зурна. Зөвхөн «үйл явдал» (станцад хүрэх, зоос авах) болоход шинэчлэгдэнэ.
//  2) Game loop (requestAnimationFrame) — секундэд ~60 удаа дүр, camera-г DOM дээр шууд хөдөлгөнө.
//     60 удаа React render хийх шаардлагагүй тул state биш, ref ашиглана.
export default function Game({ t }) {
  const stageRef = useRef(null);
  const worldRef = useRef(null);
  const playerRef = useRef(null);

  // Дүрийн төлөв (game loop өөрчилнө). Эхлээд Start станц дээр зогсоно
  const player = useRef({ x: stationX(0), y: 0, vx: 0, vy: 0, facing: 1, onGround: true }).current;
  // Товчны төлөв. Гар (keyboard) болон утасны товч энийг өөрчилнө
  const input = useRef({ left: false, right: false, jump: false, enter: false }).current;

  // React state: дэлгэц дээр харагдах зүйлс
  const [panel, setPanel] = useState(0); // нээлттэй панелийн станц (-1 = хаалттай). Эхлэхэд Start нээлттэй
  const [current, setCurrent] = useState(0); // дүр одоо аль станц дээр байгаа (-1 = замд)
  const [visited, setVisited] = useState(() => new Set([0]));
  const [collected, setCollected] = useState(() => new Set());
  const [packet, setPacket] = useState({ to: -1, key: 0 });
  const [log, setLog] = useState([{ id: 0, text: "▶ run: Start" }]);

  // Game loop нь нэг л удаа эхэлдэг тул хамгийн сүүлийн утгыг ref-ээр уншина
  const live = useRef({});
  live.current = { panel, visited, collected, t };

  function addLog(text) {
    setLog((lines) => [...lines, { id: Date.now() + Math.random(), text }]);
  }

  // Станц нээх: панел гаргаж, workflow-д «run → success» бичиж, packet гүйлгэнэ
  function openStation(i) {
    setPanel(i);
    setCurrent(i);
    if (live.current.visited.has(i)) return;
    setVisited((old) => new Set(old).add(i));
    setPacket((old) => ({ to: i, key: old.key + 1 }));
    beep(660, 160);
    addLog("▶ run: " + live.current.t(stations[i].label));
    setTimeout(() => addLog("✔ success"), 700);
  }

  function collect(index) {
    const skill = skills[index];
    setCollected((old) => new Set(old).add(skill.id));
    addLog("✔ " + skill.name + " collected");
    beep(880);
  }

  // Fast travel: HUD-ийн зангилаа дээр дарахад тэр станц руу шууд очно
  function travel(i) {
    player.x = stationX(i);
    player.y = 0;
    openStation(i);
  }

  // Гарын товч
  useEffect(() => {
    function onKey(event, isDown) {
      if (event.key === "Escape") return setPanel(-1);
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
    const down = (e) => onKey(e, true);
    const up = (e) => onKey(e, false);
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, [input]);

  // Game loop
  useEffect(() => {
    let last = performance.now();
    let frameId;
    let lastNear = 0;

    function frame(now) {
      // dt = өмнөх frame-ээс хойш өнгөрсөн секунд (таб нуугдсан үед хэт том болохгүй байлгана)
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      // Панел нээлттэй үед дүр зогсоно
      if (live.current.panel === -1) {
        const wasOnGround = player.onGround;
        step(player, input, dt);
        if (wasOnGround && !player.onGround) beep(520); // үсэрсэн
        checkStations();
        checkCoins();
      }
      draw();
      frameId = requestAnimationFrame(frame);
    }

    // Станцад хүрсэн эсэх: шинэ станц бол автоматаар нээнэ, очсон бол Enter дарж нээнэ
    function checkStations() {
      const near = nearStation(player.x, stations.length);
      if (near !== lastNear) {
        lastNear = near;
        setCurrent(near);
        if (near !== -1 && !live.current.visited.has(near)) openStation(near);
      }
      if (input.enter && near !== -1) {
        input.enter = false;
        openStation(near);
      }
    }

    function checkCoins() {
      skills.forEach((skill, i) => {
        if (!live.current.collected.has(skill.id) && touchesCoin(player, i)) {
          live.current.collected.add(skill.id); // дараагийн render хүртэл давхар авахаас сэргийлнэ
          collect(i);
        }
      });
    }

    function draw() {
      const cam = cameraFor(player.x, stageRef.current.clientWidth);
      worldRef.current.style.transform = `translate3d(${-cam}px, 0, 0)`;
      stageRef.current.style.setProperty("--cam", cam); // parallax давхаргууд үүнийг ашиглана

      const el = playerRef.current;
      el.style.transform = `translate3d(${player.x}px, ${-player.y}px, 0)`;
      el.classList.toggle("walking", player.vx !== 0 && player.onGround);
      el.classList.toggle("jumping", !player.onGround);
      el.classList.toggle("face-left", player.facing < 0);
    }

    frameId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(frameId);
    // openStation/collect нь зөвхөн setState дууддаг тул loop-ийг дахин эхлүүлэх шаардлагагүй
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="game" ref={stageRef}>
      <div className="sky" />
      <Skyline className="layer far" count={70} maxH={14} seed={3} />
      <Skyline className="layer mid" count={90} maxH={9} seed={7} />

      <div className="world" ref={worldRef} style={{ width: WORLD_W + "px" }}>
        <div className="ground">
          <div className="track" />
        </div>
        {stations.map((st, i) => (
          <div key={st.id} className="gate" style={{ left: stationX(i) + "px" }}>
            <div className="ring">{visited.has(i) ? "✓" : i + 1}</div>
            <div className="sign">{t(st.label)}</div>
          </div>
        ))}
        {skills.map((skill, i) =>
          collected.has(skill.id) ? null : (
            <div key={skill.id} className="coin" title={skill.name}
              style={{ left: coinX(i) + "px", "--lift": coinY(i) + "px" }}>
              {skill.name.slice(0, 2)}
            </div>
          )
        )}
        <div className="player" ref={playerRef}>
          <Character />
        </div>
      </div>

      <Hud current={current} visited={visited} collected={collected} packet={packet} log={log} onTravel={travel} t={t} />
      {panel !== -1 && <Panel index={panel} collected={collected} onClose={() => setPanel(-1)} t={t} />}
      <p className="hint">{t(ui.hint)}</p>
      <TouchControls input={input} t={t} />
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
