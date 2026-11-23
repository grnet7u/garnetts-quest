import { useRef, useState } from "react";
import { projects, ui } from "./data.js";
import { ProjectCard } from "./SimpleMode.jsx";
import Icon from "./Icon.jsx";

// Бүтээлүүдийн carousel. Гүйлгэлтийг хөтөч өөрөө хийдэг (CSS scroll-snap): утсан дээр хуруугаар
// гүйлгэхэд слайд бүр голдоо «тогтоно». JS зөвхөн ‹ › товч, цэг, «2 / 4» тоолуурыг удирдана.
export default function ProjectCarousel({ t }) {
  const trackRef = useRef(null);
  const [index, setIndex] = useState(0);
  const count = projects.length;

  // i-р слайд руу гүйлгэнэ (сүүлчийнхээс цааш дарвал эхэнд нь буцна)
  function go(i) {
    const track = trackRef.current;
    const target = track.children[(i + count) % count];
    const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollTo({ left: target.offsetLeft, behavior: calm ? "auto" : "smooth" });
  }

  // Гүйлгэх үед аль слайд харагдаж байгааг тооцно (цэг ба тоолуурт)
  function onScroll() {
    const track = trackRef.current;
    const slideWidth = track.children[1].offsetLeft - track.children[0].offsetLeft;
    setIndex(Math.round(track.scrollLeft / slideWidth));
  }

  return (
    <div className="carousel" role="region" aria-roledescription="carousel" aria-label={t(ui.projectsLabel)}>
      <ul className="carousel-track" ref={trackRef} onScroll={onScroll}>
        {projects.map((p, i) => (
          <li key={p.id} className="carousel-slide" aria-roledescription="slide" aria-label={`${i + 1} / ${count}`}>
            <ProjectCard project={p} t={t} />
          </li>
        ))}
      </ul>
      <div className="carousel-controls">
        <button onClick={() => go(index - 1)} aria-label={t(ui.prev)}><Icon name="arrowLeft" size="1.25rem" /></button>
        <div className="dots">
          {projects.map((p, i) => (
            <button key={p.id} className="dot" aria-label={`${t(ui.goTo)} ${i + 1}: ${t(p.title)}`}
              aria-current={i === index ? "true" : undefined} onClick={() => go(i)} />
          ))}
        </div>
        <span className="counter" aria-live="polite">{index + 1} / {count}</span>
        <button onClick={() => go(index + 1)} aria-label={t(ui.next)}><Icon name="arrowRight" size="1.25rem" /></button>
      </div>
    </div>
  );
}
