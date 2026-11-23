// Физикийн жижиг тест. Ажиллуулах: npm test
import { test } from "node:test";
import assert from "node:assert/strict";
import { step, cameraFor, shootZone, stationX, WORLD_W, SPEED, meterPos, isHit, bezier, rimCenter } from "./physics.js";

const newPlayer = () => ({ x: 100, y: 0, vx: 0, vy: 0, facing: 1, onGround: true });

test("баруун тийш 1 секунд алхвал SPEED px явна", () => {
  const s = newPlayer();
  for (let i = 0; i < 60; i++) step(s, { right: true }, 1 / 60);
  assert.ok(Math.abs(s.x - (100 + SPEED)) < 0.001);
  assert.equal(s.facing, 1);
});

test("үсрээд буцаж газарт бууна", () => {
  const s = newPlayer();
  step(s, { jump: true }, 1 / 60);
  assert.equal(s.onGround, false);
  for (let i = 0; i < 120; i++) step(s, {}, 1 / 60);
  assert.equal(s.y, 0);
  assert.equal(s.onGround, true);
});

test("ертөнцийн хилээс гарахгүй", () => {
  const s = newPlayer();
  step(s, { left: true }, 10);
  assert.equal(s.x, 0);
  step(s, { right: true }, 100);
  assert.equal(s.x, WORLD_W);
});

test("camera захаас хэтрэхгүй", () => {
  assert.equal(cameraFor(10, 1000), 0);
  assert.equal(cameraFor(WORLD_W, 1000), WORLD_W - 1000);
  assert.equal(cameraFor(3000, 1000), 2500);
});

test("цагирагийн өмнө зогсвол шидэх бүс, шон дээр биш", () => {
  assert.equal(shootZone(stationX(2) - 200, 7), 2);
  assert.equal(shootZone(stationX(2), 7), -1);
  assert.equal(shootZone(stationX(2) - 700, 7), -1);
});

test("POWER хэмжигч 0→1→0 явна", () => {
  assert.equal(meterPos(0), 0);
  assert.equal(meterPos(0.7), 1);
  assert.ok(Math.abs(meterPos(1.05) - 0.5) < 1e-9);
});

test("тод бүс: голд орно, захад алдана, 2 алдсаны дараа өргөснө", () => {
  assert.equal(isHit(0.5, 0), true);
  assert.equal(isHit(0.7, 0), false);
  assert.equal(isHit(0.7, 2), true);
});

test("Bézier эхлэл ба төгсгөлд таарна, цагирагийн гол k-аар томорно", () => {
  const p0 = { x: 0, y: 0 }, p1 = { x: 50, y: 200 }, p2 = { x: 100, y: 50 };
  assert.deepEqual(bezier(p0, p1, p2, 0), p0);
  assert.deepEqual(bezier(p0, p1, p2, 1), p2);
  assert.ok(rimCenter(5, 1.25).y > rimCenter(0, 0.6).y);
});

test("доод зоосыг алхаж, дээд зоосыг үсэрч авна", async () => {
  const { coinX, touchesCoin } = await import("./physics.js");
  const walking = { x: coinX(0), y: 0 };
  assert.equal(touchesCoin(walking, 0), true);
  assert.equal(touchesCoin({ x: coinX(1), y: 0 }, 1), false);
  assert.equal(touchesCoin({ x: coinX(1), y: 100 }, 1), true);
});

