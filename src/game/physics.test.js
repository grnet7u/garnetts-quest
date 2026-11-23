// Физикийн жижиг тест. Ажиллуулах: npm test
import { test } from "node:test";
import assert from "node:assert/strict";
import { step, cameraFor, nearStation, stationX, WORLD_W, SPEED } from "./physics.js";

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

test("станцад ойртвол түүний дугаар буцна", () => {
  assert.equal(nearStation(stationX(2) + 50, 6), 2);
  assert.equal(nearStation(stationX(2) + 500, 6), -1);
});
