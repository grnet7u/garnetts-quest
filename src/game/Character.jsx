// «Garnett» дүр: өөрсдөө зурсан SVG (дизайны canvas-ын дагуу). Бөмбөгөө дээш өргөж онилсон
// хөгжүүлэгч, том гутал, «G» майк. Брэнд, лого байхгүй.
// Хөдөлгөөн (алхах, үсрэх) нь CSS-д: .walking, .jumping класс нэмэгдэхэд хөл (.leg) хөдөлнө.
export default function Character() {
  return (
    <svg className="character" viewBox="0 0 120 230" aria-hidden="true">
      <ellipse cx="60" cy="226" rx="34" ry="4" fill="rgba(11,27,58,.25)" />
      {/* Хөл + гутал: бүлэг бүр тусдаа эргэлддэг */}
      <g className="leg leg-back">
        <rect x="42" y="150" width="14" height="58" rx="5" fill="#DCE8FF" />
        <rect x="34" y="206" width="28" height="14" rx="6" fill="#1D4ED8" />
        <rect x="34" y="216" width="28" height="4" rx="2" fill="#FFFFFF" />
      </g>
      <g className="leg leg-front">
        <rect x="64" y="150" width="14" height="58" rx="5" fill="#DCE8FF" />
        <rect x="60" y="206" width="28" height="14" rx="6" fill="#1D4ED8" />
        <rect x="60" y="216" width="28" height="4" rx="2" fill="#FFFFFF" />
      </g>
      {/* Шорт ба майк */}
      <rect x="36" y="128" width="48" height="36" rx="8" fill="#0F2A6B" />
      <rect x="34" y="70" width="52" height="68" rx="14" fill="#1D4ED8" />
      <circle cx="60" cy="100" r="10" fill="#FFFFFF" />
      <text x="60" y="105" textAnchor="middle" fontFamily="Montserrat, sans-serif" fontWeight="800" fontSize="13" fill="#1D4ED8">G</text>
      {/* Гар: зүүн гар доош, баруун гар бөмбөгтэй дээш */}
      <path d="M38 80 L26 116" stroke="#DCE8FF" strokeWidth="11" strokeLinecap="round" fill="none" />
      <path d="M80 80 L100 54 L100 36" stroke="#DCE8FF" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <g className="held-ball">
        <circle cx="100" cy="22" r="17" fill="#F97316" />
        <path d="M83 22 H117 M100 5 V39 M88 10 Q100 22 88 34 M112 10 Q100 22 112 34" stroke="#7C2D12" strokeWidth="2" fill="none" />
      </g>
      {/* Толгой, үс, нүд, инээмсэглэл */}
      <circle cx="60" cy="42" r="24" fill="#DCE8FF" />
      <path d="M36 40 A24 24 0 0 1 84 40 Z" fill="#0F2A6B" />
      <circle cx="68" cy="47" r="2.5" fill="#0F2A6B" />
      <path d="M58 56 Q64 60 70 56" stroke="#0F2A6B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    </svg>
  );
}
