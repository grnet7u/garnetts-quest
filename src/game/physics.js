// Тоглоомын физик: жижиг, цэвэр (pure) функцууд. DOM, React хамаагүй тул тест бичихэд амар.
// Нэгж: пиксел (px), секунд (s). y = газраас дээш өндөр (0 = газар дээр).

export const WORLD_W = 6400; // ертөнцийн нийт өргөн
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

// Дүр аль нэг станцын радиус дотор байвал тэр станцын дугаарыг, үгүй бол -1
export function nearStation(x, count) {
  for (let i = 0; i < count; i++) {
    if (Math.abs(x - stationX(i)) < STATION_RADIUS) return i;
  }
  return -1;
}

// «Зоос» (технологи бүр нэг зоос): Хөгжүүлэгч ба Бүтээл станцын хооронд эгнэнэ.
// Сондгой зоос дээгүүр (110 px) байрладаг тул авахын тулд үсрэх хэрэгтэй.
export const coinX = (i) => stationX(2) + 170 + i * 48;
export const coinY = (i) => (i % 2) * 110;

export function touchesCoin(p, i) {
  return Math.abs(p.x - coinX(i)) < 30 && Math.abs(p.y - coinY(i)) < 50;
}

// Easter egg: сагсны цагираг Холбоо барих станцын баруун талд.
// Энэ бүсэд Space дарвал үсрэхийн оронд бөмбөг шиднэ.
export const HOOP_X = stationX(5) + 300;
export const RIM_H = 230; // цагирагийн өндөр (газраас), px
export const inHoopZone = (x) => x > stationX(5) - STATION_RADIUS;
