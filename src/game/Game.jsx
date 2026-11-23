import { useEffect, useRef } from "react";
import { stations, ui } from "../data.js";
import { step, cameraFor, stationX, WORLD_W } from "./physics.js";
import Character from "./Character.jsx";

// Тоглоомын горим. Хоёр хэсэгтэй:
//  1) React — ертөнцийн бүтцийг (давхарга, станц) нэг удаа зурна.
//  2) Game loop (requestAnimationFrame) — секундэд ~60 удаа дүр, camera-г DOM дээр шууд хөдөлгөнө.
//     Энэ нь React state-ээр дамжихгүй, учир нь 60 удаа дахин render хийх шаардлагагүй.
export default function Game({ t }) {
  const stageRef = useRef(null);
  const worldRef = useRef(null);
  const playerRef = useRef(null);
  // Товчны төлөв. Гар (keyboard) болон дараа нь утасны товч энийг өөрчилнө
  const input = useRef({ left: false, right: false, jump: false });

  // Гарын товч
  useEffect(() => {
    function onKey(event, isDown) {
      // Товч/холбоос дээр focus байхад Space, Enter-ийг тэдэнд үлдээнэ
      // (window дээр шууд үүссэн event-д closest байхгүй тул ?. ашиглана)
      if (event.target.closest?.("button, a")) return;
      const key = event.key.toLowerCase();
      if (key === "arrowleft" || key === "a") input.current.left = isDown;
      else if (key === "arrowright" || key === "d") input.current.right = isDown;
      else if (key === " " || key === "arrowup" || key === "w") input.current.jump = isDown;
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
  }, []);

  // Game loop
  useEffect(() => {
    const player = { x: 120, y: 0, vx: 0, vy: 0, facing: 1, onGround: true };
    let last = performance.now();
    let frameId;

    function frame(now) {
      // dt = өмнөх frame-ээс хойш өнгөрсөн секунд (таб нуугдсан үед хэт том болохгүй байлгана)
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      step(player, input.current, dt);
      draw(player);
      frameId = requestAnimationFrame(frame);
    }

    function draw(p) {
      const cam = cameraFor(p.x, stageRef.current.clientWidth);
      worldRef.current.style.transform = `translate3d(${-cam}px, 0, 0)`;
      stageRef.current.style.setProperty("--cam", cam); // parallax давхаргууд үүнийг ашиглана

      const el = playerRef.current;
      el.style.transform = `translate3d(${p.x}px, ${-p.y}px, 0)`;
      el.classList.toggle("walking", p.vx !== 0 && p.onGround);
      el.classList.toggle("jumping", !p.onGround);
      el.classList.toggle("face-left", p.facing < 0);
    }

    frameId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(frameId);
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
            <div className="ring">{i + 1}</div>
            <div className="sign">{t(st.label)}</div>
          </div>
        ))}
        <div className="player" ref={playerRef}>
          <Character />
        </div>
      </div>

      <p className="hint">{t(ui.hint)}</p>
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
