import { ui } from "../data.js";

// Утасны товч: ◀ ▶ ба том Shoot товч. Дарж байх хугацаанд input-ийн утга true байна.
// Shoot = Space: цагирагийн өмнө шиднэ, бусад газар үсэрнэ (дээрх зоосыг авахад).
// Товч бүр тусдаа pointer event-тэй тул хоёр хуруугаар зэрэг (алхаж + шидэх) дарж болно.
export default function TouchControls({ input, canShoot, t }) {
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
      <button aria-label={t(ui.left)} {...hold("left")}>◀</button>
      <button aria-label={t(ui.right)} {...hold("right")}>▶</button>
      <button className="shoot" {...hold("jump")}>{canShoot ? t(ui.shoot) : t(ui.jump) + " ⤒"}</button>
    </div>
  );
}
