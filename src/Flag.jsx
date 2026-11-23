// Хэл солих товчны туг (өөрсдөө хялбарчилж зурсан SVG; emoji туг Windows дээр харагддаггүй тул).
// code = "mn" → Монгол Улсын туг, "en" → АНУ-ын туг. Нарийн хэмжээ биш, жижиг icon-д зориулсан.
export default function Flag({ code }) {
  return code === "mn" ? <MongoliaFlag /> : <UsaFlag />;
}

function MongoliaFlag() {
  return (
    <svg className="flag" viewBox="0 0 30 15" aria-hidden="true">
      <rect width="30" height="15" fill="#DA2032" />
      <rect x="10" width="10" height="15" fill="#0066B3" />
      {/* Соёмбо (хялбарчилсан): гал, нар, сар, гурвалжин, тэгш өнцөгт, арга билэг, хоёр багана */}
      <g fill="#FFD900">
        <path d="M5 1.2 5.6 2.6 5 2.3 4.4 2.6z" />
        <circle cx="5" cy="3.6" r="0.75" />
        <path d="M3.9 4.6a1.1 1.1 0 0 0 2.2 0 1.1 0.7 0 0 1-2.2 0z" />
        <path d="M3.9 6.2h2.2L5 7.3z" />
        <rect x="3.9" y="7.6" width="2.2" height="0.5" />
        <circle cx="5" cy="9.4" r="1" />
        <rect x="3.9" y="10.7" width="2.2" height="0.5" />
        <rect x="3.2" y="6.2" width="0.5" height="5" />
        <rect x="6.3" y="6.2" width="0.5" height="5" />
      </g>
      <circle cx="5" cy="9.4" r="0.35" fill="#DA2032" />
    </svg>
  );
}

function UsaFlag() {
  // 13 судал → 7 улаан судал цагаан дэвсгэр дээр, зүүн дээд буланд цэнхэр талбай + од (цэг)
  const stripes = [0, 2, 4, 6, 8, 10, 12];
  return (
    <svg className="flag" viewBox="0 0 26 13.7" aria-hidden="true">
      <rect width="26" height="13.7" fill="#FFFFFF" />
      {stripes.map((i) => (
        <rect key={i} y={i * 1.054} width="26" height="1.054" fill="#B22234" />
      ))}
      <rect width="10.4" height="7.38" fill="#3C3B6E" />
      <g fill="#FFFFFF">
        {[1.2, 3.1, 5, 6.9, 8.8].map((x) =>
          [1.2, 3.7, 6.2].map((y) => <circle key={x + "-" + y} cx={x + 0.3} cy={y} r="0.45" />)
        )}
      </g>
    </svg>
  );
}
