// Тоглоомын физик: жижиг, цэвэр (pure) функцууд. DOM, React хамаагүй тул тест бичихэд амар.
// Нэгж: пиксел (px), секунд (s). y = газраас дээш өндөр (0 = газар дээр).

export const WORLD_W = 7500; // ертөнцийн нийт өргөн (7 станц)
export const SPEED = 340; // алхах хурд, px/s
export const JUMP = 820; // үсрэлтийн эхний хурд, px/s
export const GRAVITY = 2300; // таталцал, px/s²

// Станц бүрийн байрлал: 400-аас эхлээд 1100 px зайтай
export const stationX = (index) => 400 + index * 1100;
export const STATION_RADIUS = 110;

export function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

// Нэг алхам (frame): input-ээс хурдыг тооцоод байрлалыг dt секундээр урагшлуулна.
// dt-ээр үржүүлдэг тул 60Hz, 144Hz дэлгэц дээр ижил хурдтай явна.
export function step(s, input, dt) {
  const dir = (input.right ? 1 : 0) - (input.left ? 1 : 0);
  s.vx = dir * SPEED;
  if (dir !== 0) s.facing = dir;

  // Газар дээр байхдаа л үсэрнэ (агаарт дахин үсрэхгүй)
  if (input.jump && s.onGround) {
    s.vy = JUMP;
    s.onGround = false;
  }

  s.vy -= GRAVITY * dt;
  s.x = clamp(s.x + s.vx * dt, 0, WORLD_W);
  s.y += s.vy * dt;

  // Газарт буусан
  if (s.y <= 0) {
    s.y = 0;
    s.vy = 0;
    s.onGround = true;
  }
}

// Camera: дүрийг дэлгэцийн голд барина, гэхдээ ертөнцийн захаас хэтрэхгүй
export function cameraFor(x, viewW) {
  return clamp(x - viewW / 2, 0, Math.max(0, WORLD_W - viewW));
}

// Шидэх бүс: дүр цагирагийн өмнө (зүүн талд) 40–420 px зайд зогсвол Space = шидэх.
// Бүсэд байгаа станцын дугаарыг, үгүй бол -1 буцаана.
export function shootZone(x, count) {
  for (let i = 0; i < count; i++) {
    const sx = stationX(i);
    if (x > sx - 420 && x < sx - 40) return i;
  }
  return -1;
}
// Fast travel хийхэд дүр зогсох газар (шидэх бүсийн дунд)
export const shootSpot = (i) => stationX(i) - 260;

// «Зоос» (технологи бүр нэг зоос): Хөгжүүлэгч станцын ард, Бүтээлийн шидэх бүсээс өмнө эгнэнэ.
// Сондгой зоос дээгүүр (110 px) байрладаг тул авахын тулд үсрэх хэрэгтэй.
export const coinX = (i) => stationX(2) + 50 + i * 31;
export const coinY = (i) => (i % 2) * 110;

export function touchesCoin(p, i) {
  return Math.abs(p.x - coinX(i)) < 30 && Math.abs(p.y - coinY(i)) < 50;
}

// Станц бүрийн цагирагийн голын байрлал. Бүх хэмжээ станцын k (scale)-аас хамаарна:
// самбар 180k өргөн, станц 404k өндөр, цагираг самбарын зүүн доод талд унжина.
export function rimCenter(i, k) {
  return { x: stationX(i) - 120 * k, y: 308 * k };
}

// ===== Шидэлт =====
// POWER хэмжигч: тэмдэг 0→1→0 гэж 1.4 секундэд нэг удаа явж ирнэ (гурвалжин долгион)
export function meterPos(seconds) {
  const p = (seconds / 1.4) % 1;
  return p < 0.5 ? p * 2 : 2 - p * 2;
}
// Тод бүсийн хагас өргөн: ердийн үед 0.125 (нийтдээ 25%), 2 удаа алдсаны дараа 2 дахин өргөн
export const zoneHalf = (misses) => (misses >= 2 ? 0.25 : 0.125);
export const isHit = (pos, misses) => Math.abs(pos - 0.5) <= zoneHalf(misses);

// Quadratic Bézier: эхлэл p0, хяналтын цэг p1 (нумын орой татагч), төгсгөл p2, t = 0…1
export function bezier(p0, p1, p2, t) {
  const u = 1 - t;
  return { x: u * u * p0.x + 2 * u * t * p1.x + t * t * p2.x, y: u * u * p0.y + 2 * u * t * p1.y + t * t * p2.y };
}
// Хоёр цэгийн дундуур, өндрөөс нь дээш arc px-д хяналтын цэг тавина
export const arcControl = (p0, p2, arc) => ({ x: (p0.x + p2.x) / 2, y: Math.max(p0.y, p2.y) + arc });
