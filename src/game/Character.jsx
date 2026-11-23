// «Garnett» дүр: өөрсдөө зурсан энгийн SVG. Сагсан бөмбөг барьсан, том гуталтай хөгжүүлэгч.
// Хөдөлгөөн (алхах, үсрэх) нь CSS-д: .walking, .jumping класс нэмэгдэхэд хөл хөдөлнө.
export default function Character() {
  return (
    <svg className="character" viewBox="0 0 64 104" aria-hidden="true">
      {/* Арын хөл */}
      <g className="leg leg-back">
        <rect x="26" y="66" width="8" height="26" rx="3" fill="#0B1B3A" />
        <rect x="22" y="90" width="20" height="10" rx="5" fill="#0B1B3A" />
        <rect x="22" y="97" width="20" height="4" rx="2" fill="#FFFFFF" />
      </g>
      {/* Урд хөл */}
      <g className="leg leg-front">
        <rect x="32" y="66" width="8" height="26" rx="3" fill="#1E3A8A" />
        <rect x="30" y="90" width="22" height="10" rx="5" fill="#1E3A8A" />
        <rect x="30" y="97" width="22" height="4" rx="2" fill="#FFFFFF" />
      </g>
      {/* Шорт ба майк */}
      <rect x="22" y="56" width="22" height="14" rx="3" fill="#1D4ED8" />
      <path d="M20 34 Q32 28 44 34 L46 60 L18 60 Z" fill="#1D4ED8" />
      <path d="M26 31 Q32 38 38 31" fill="none" stroke="#FFFFFF" strokeWidth="2" />
      <text x="32" y="53" textAnchor="middle" fontSize="11" fontWeight="800" fill="#FFFFFF" fontFamily="Montserrat, sans-serif">
        G
      </text>
      {/* Арын гар */}
      <rect className="arm-back" x="16" y="35" width="7" height="20" rx="3.5" fill="#DBEAFE" />
      {/* Толгой, үс, нүд */}
      <circle cx="32" cy="18" r="13" fill="#DBEAFE" />
      <path d="M19 16 Q20 3 33 4 Q45 5 45 15 Q38 10 30 12 Q24 13 19 16 Z" fill="#0B1B3A" />
      <circle cx="38" cy="19" r="1.8" fill="#0B1B3A" />
      <path d="M35 25 Q38 27 41 24" fill="none" stroke="#0B1B3A" strokeWidth="1.5" strokeLinecap="round" />
      {/* Урд гар бөмбөгтэй */}
      <g className="ball-arm">
        <rect x="40" y="36" width="7" height="18" rx="3.5" fill="#DBEAFE" transform="rotate(-25 43 36)" />
        <g className="held-ball">
          <circle cx="51" cy="54" r="9" fill="#1D4ED8" stroke="#0B1B3A" strokeWidth="1.5" />
          <path d="M42 54h18M51 45v18M45 48q4 6 0 12M57 48q-4 6 0 12" fill="none" stroke="#0B1B3A" strokeWidth="1.2" />
        </g>
      </g>
    </svg>
  );
}
