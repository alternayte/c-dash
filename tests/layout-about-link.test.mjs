import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const layout = readFileSync(new URL("../components/Layout.tsx", import.meta.url), "utf8");
const about = readFileSync(new URL("../pages/about.tsx", import.meta.url), "utf8");

test("the about page link keeps the target /about", () => {
  assert.match(layout, /<Link href="\/about">\s*<a>About c-dash<\/a>\s*<\/Link>/);
});

test("the navigation keeps the Home, Users List, and Users API links", () => {
  assert.match(layout, /<Link href="\/">\s*<a>Home<\/a>\s*<\/Link>/);
  assert.match(layout, /<Link href="\/users">\s*<a>Users List<\/a>\s*<\/Link>/);
  assert.match(layout, /<a href="\/api\/users">Users API<\/a>/);
});

test("the about page heading and content are unchanged", () => {
  assert.match(about, /<h1>About<\/h1>/);
  assert.match(about, /<p>This is the about page<\/p>/);
  assert.match(about, /<Link href="\/">\s*<a>Go home<\/a>\s*<\/Link>/);
});
