import { useEffect, useState } from "react";
import { load, save, defaultLang, defaultTheme } from "./settings.js";
import { ui } from "./data.js";
import SimpleMode from "./SimpleMode.jsx";

export default function App() {
  const [lang, setLang] = useState(() => load("lang", defaultLang));
  const [theme, setTheme] = useState(() => load("theme", defaultTheme));

  // Хэл солигдох бүрт <html lang> болон хадгалсан утгыг шинэчилнэ
  useEffect(() => {
    document.documentElement.lang = lang;
    save("lang", lang);
  }, [lang]);

  // Горим солигдох бүрт data-theme атрибут → CSS variables солигдоно
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    save("theme", theme);
  }, [theme]);

  // t(): { mn, en } объектоос одоогийн хэлний текстийг авна
  const t = (text) => text[lang];

  return (
    <>
      <div className="toolbar">
        <button onClick={() => setLang(lang === "mn" ? "en" : "mn")} aria-label={t(ui.langLabel)}>
          {t(ui.langButton)}
        </button>
        <button onClick={() => setTheme(theme === "light" ? "dark" : "light")} aria-label={t(ui.themeLabel)}>
          {theme === "light" ? "🌙" : "☀"}
        </button>
      </div>
      <SimpleMode t={t} />
    </>
  );
}
