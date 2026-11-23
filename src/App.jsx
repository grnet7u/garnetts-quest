import { Component, useEffect, useState } from "react";
import { load, save, defaultLang, defaultTheme } from "./settings.js";
import { ui } from "./data.js";
import SimpleMode from "./SimpleMode.jsx";
import Game from "./game/Game.jsx";
import Icon from "./Icon.jsx";
import Flag from "./Flag.jsx";
import { setSoundEnabled } from "./game/sound.js";

export default function App() {
  const [lang, setLang] = useState(() => load("lang", defaultLang));
  const [theme, setTheme] = useState(() => load("theme", defaultTheme));
  const [mode, setMode] = useState("simple"); // эхэндээ CV (энгийн горим), тоглоом нь товчоор
  const [sound, setSound] = useState(false); // анхны утга OFF

  function toggleSound() {
    setSoundEnabled(!sound);
    setSound(!sound);
  }

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
  // Toolbar: тоглоомд баруун дээд буланд хөвнө, энгийн горимд header дотор байрлана
  const toolbar = (
      <div className="toolbar">
        <button onClick={() => setMode(mode === "game" ? "simple" : "game")}>
          {mode === "game" ? t(ui.toSimple) : t(ui.toGame)}
        </button>
        {mode === "game" && (
          <button onClick={toggleSound} aria-label={t(sound ? ui.soundOff : ui.soundOn)}>
            <Icon name={sound ? "soundOn" : "soundOff"} size="1.25rem" />
          </button>
        )}
        <button onClick={() => setLang(lang === "mn" ? "en" : "mn")} aria-label={t(ui.langLabel)}>
          <Flag code={lang === "mn" ? "en" : "mn"} /> {/* солих хэлний туг */}
        </button>
        <button onClick={() => setTheme(theme === "light" ? "dark" : "light")} aria-label={t(ui.themeLabel)}>
          <Icon name={theme === "light" ? "moon" : "sun"} size="1.25rem" />
        </button>
      </div>
  );
  const simple = <SimpleMode t={t} toolbar={toolbar} />;

  return (
    <>
      {mode === "game" && toolbar}
      {mode === "game" ? (
        <FallbackToSimple fallback={<SimpleMode t={t} />}>
          <Game t={t} />
        </FallbackToSimple>
      ) : (
        simple
      )}
    </>
  );
}

// Тоглоомд алдаа гарвал хуудас хоосон үлдэхгүй, энгийн горим автоматаар гарна.
// (React-д алдаа барих нь зөвхөн class компонентоор боломжтой.)
class FallbackToSimple extends Component {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}
