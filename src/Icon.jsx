// Өөрсдөө зурсан энгийн icon-ууд (24×24, зөвхөн шугам). Брэндийн лого хуулаагүй:
// технологи бүрийг ерөнхий дүрсээр илэрхийлнэ (код, өгөгдлийн сан, git салаа, робот…).
// Өнгө нь currentColor тул эргэн тойрныхоо текстийн өнгийг авна.
const paths = {
  code: "M8 7 3 12l5 5M16 7l5 5-5 5M14 4l-4 16",
  layout: "M4 4h16v16H4zM4 9h16M9 9v11",
  braces: "M8 4c-3 0-2 6-4 8 2 2 1 8 4 8M16 4c3 0 2 6 4 8-2 2-1 8-4 8",
  layers: "m12 3 9 5-9 5-9-5 9-5zM3 13l9 5 9-5",
  phone: "M8 2h8a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM11 18h2",
  server: "M4 4h16v6H4zM4 14h16v6H4zM8 7h.01M8 17h.01",
  terminal: "M4 4h16v16H4zM8 9l3 3-3 3M13 15h3",
  database: "M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3zM4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3",
  branch: "M6 3v12M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM18 9c0 6-12 3-12 9",
  editor: "M3 5h18v14H3zM3 9h18M7 13l-2 2 2 2M11 13l2 2-2 2",
  cloud: "M7 18a4 4 0 0 1-.5-8A6 6 0 0 1 18 9a4.5 4.5 0 0 1-1 9zM12 11v6M9.5 13.5 12 11l2.5 2.5",
  atom: "M12 12h.01M12 3c2 0 3.5 4 3.5 9s-1.5 9-3.5 9-3.5-4-3.5-9S10 3 12 3zM4.2 7.5c1-1.7 5.3-1 9.6 1.5s7 6 6 7.5-5.3 1-9.6-1.5-7-6-6-7.5z",
  spark: "M12 3v6M12 15v6M3 12h6M15 12h6M6 6l3 3M15 15l3 3M18 6l-3 3M9 15l-3 3",
  bolt: "M13 2 4 14h7l-1 8 9-12h-7l1-8z",
  robot: "M5 8h14v11H5zM12 4v4M9 13h.01M15 13h.01M9 16h6M2 12v3M22 12v3",
  blocks: "M3 3h8v8H3zM13 3h8v8h-8zM3 13h8v8H3zM13 13h8v8h-8z",
  // интерфейсийн icon
  sun: "M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4",
  moon: "M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z",
  soundOn: "M11 5 6 9H2v6h4l5 4V5zM15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14",
  soundOff: "M11 5 6 9H2v6h4l5 4V5zM22 9l-6 6M16 9l6 6",
  mail: "M3 5h18v14H3zM3 7l9 6 9-6",
  user: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21c0-4 4-6 8-6s8 2 8 6",
};

export default function Icon({ name, size = "1em" }) {
  return (
    <svg className="icon" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={paths[name]} />
    </svg>
  );
}
