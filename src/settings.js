// localStorage-д тохиргоо хадгалах жижиг туслах функцууд.
// Хувийн цонх зэрэгт localStorage алдаа өгч болох тул try/catch-тэй.

export function load(key, fallback) {
  try {
    return localStorage.getItem(key) || fallback;
  } catch {
    return fallback;
  }
}

export function save(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // хадгалж чадахгүй бол зүгээр л алгасна
  }
}

// Анхны хэл: хөтчийн хэл "mn"-ээр эхэлбэл Монгол, үгүй бол Англи
export const defaultLang = navigator.language.startsWith("mn") ? "mn" : "en";

// Анхны горим: системийн тохиргоо (prefers-color-scheme)
export const defaultTheme = matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
