import { ui } from "../data.js";

// Утасны товч: ◀ ▶ ⤒. Дарж байх хугацаанд input-ийн утга true байна.
// Товч бүр тусдаа pointer event-тэй тул хоёр хуруугаар зэрэг (алхаж + үсрэх) дарж болно.
export default function TouchControls({ input, t }) {
  function hold(name) {
    const release = () => (input[name] = false);
    return {
      onPointerDown: (e) => {
        e.currentTarget.setPointerCapture(e.pointerId); // хуруу товчноос гулсахад ч дуусгавар мэдэгдэнэ
        input[name] = true;
      },
      onPointerUp: release,
      onPointerCancel: release,
      onContextMenu: (e) => e.preventDefault(), // удаан дарахад цэс гарахгүй
    };
  }
  return (
    <div className="touch">
      <div className="touch-move">
        <button aria-label={t(ui.left)} {...hold("left")}>◀</button>
        <button aria-label={t(ui.right)} {...hold("right")}>▶</button>
      </div>
      <button aria-label={t(ui.jump)} {...hold("jump")}>⤒</button>
    </div>
  );
}
