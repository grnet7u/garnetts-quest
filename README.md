# Garnett's Quest — Анарбаяны портфолио

UFE SWE334 · Бие даалт 2. Тоглоом маягийн хувийн портфолио: Garnett дүр 2D ертөнцөөр алхаж, станц бүр дээр
сагсан бөмбөг шидэж миний түүх, ур чадвар, бүтээлийг нээнэ. Тоглохыг хүсэхгүй хүнд зориулсан **«Энгийн горим»**
(ердийн хуудас) бас бий.

**Vercel холбоос:** https://garnetts-quest.vercel.app/

## Бүтээлч санаа

- **Станц = сагсны цагираг.** 6 станц (Эхлэл → Борлуулагч → Хөгжүүлэгч → Бүтээл → Шагнал → Холбоо) мэдлэг
  өсөхийн хэрээр томорно (k = 0.6 → 1.25). Сүүлд нь «TO BE CONTINUED…» станц — түүх үргэлжилнэ.
- **Шидэлт = станц нээх.** Space (утсанд «Шидэх») дарахад POWER хэмжигч ажиллана, тод бүсэд дарвал бөмбөг
  нумаар (quadratic Bézier) цагирагт орж панел нээгдэнэ. 2 удаа алдвал тод бүс өргөснө. Enter = шууд нээх.
- **Workflow HUD** (n8n маягийн): дээд талд зангилаа ба утас. Станц дуусахад зангилаа ✓ болж, утсаар packet
  гүйж, log-д `▶ run → ✔ success` бичигдэнэ. Зангилаа дээр дарвал тэр станц руу шууд очно (fast travel).
- **Технологийн зоос:** 21 технологи бүр нэг зоос, үсэрч цуглуулна.
- EN / МН хоёр хэл, өдөр / шөнийн горим, утасны товч, WebAudio дуу (файлгүй), `prefers-reduced-motion`.

## Технологи

- React 19 + Vite 8 (JavaScript), CSS, SVG — back-end байхгүй, static сайт
- Тоглоомын loop: `requestAnimationFrame` + `dt` (frame rate-аас хамааралгүй хөдөлгөөн)
- Тест: Node-ийн суурь `node:test` (физик ба шидэлтийн цэвэр функцууд)
- Байршуулалт: Vercel

## Ажиллуулах

```bash
npm install
npm run dev      # http://localhost:5173
npm test         # физикийн тест
npm run build    # dist/ үүснэ (Vercel үүнийг байршуулна)
```

## Бүтэц

```
index.html
src/
├── main.jsx, App.jsx      ← эхлэл; хэл, горим, тоглоом/энгийн горим солих
├── data.js                ← БҮХ агуулга { mn, en } (энд л засна)
├── SimpleMode.jsx         ← «Энгийн горим» (5 заавал хэсэг)
├── settings.js            ← localStorage (try/catch)
├── style.css              ← өнгө (CSS variables), layout, тоглоом, HUD, панел
└── game/
    ├── Game.jsx           ← game loop, удирдлага, шидэлт, camera
    ├── physics.js         ← цэвэр функцууд: хөдөлгөөн, бүс, POWER, Bézier
    ├── physics.test.js
    ├── Station.jsx        ← цагираг (шилэн самбар, тор), --k хэмжээ
    ├── Character.jsx      ← Garnett SVG
    ├── Hud.jsx            ← workflow HUD
    ├── Panel.jsx          ← станцын карт
    ├── TouchControls.jsx  ← ◀ ▶ Шидэх товч
    └── sound.js           ← WebAudio beep
public/                    ← favicon, бүтээлийн placeholder зураг (SVG)
```

## Эх сурвалж

- Фонт: **Montserrat** (Google Fonts, SIL Open Font License)
- Дүр, цагираг, бөмбөг, хот, бүтээлийн зураг — бүгдийг өөрсдөө SVG/CSS-ээр зурсан. Брэнд, NBA, бэлэн зураг ашиглаагүй.
- Дуу: WebAudio oscillator-оор кодоор үүсгэсэн, аудио файл байхгүй.
- Санаа: workflow HUD-ийн харагдах байдал n8n зэрэг автоматжуулалтын хэрэгслээс санаа авсан (код нь өөрийн).
- AI хэрэгсэл: Claude Code (код бичих, тест хийхэд туслуулсан). Дизайныг Claude дээрх canvas-д гаргасан.
  Бүх кодыг Анарбаян шалгаж, тайлбарлаж чадна.
