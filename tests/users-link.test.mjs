import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const layout = readFileSync(new URL("../components/Layout.tsx", import.meta.url), "utf8");

test("the navigation link to the users list is labelled All users", () => {
  assert.match(layout, /<Link href="\/users">\s*<a>All users<\/a>/);
});

test("the All users link still targets the /users route", () => {
  assert.match(layout, /<Link href="\/users">\s*<a>All users<\/a>/);
  assert.doesNotMatch(layout, /<a>Users List<\/a>/);
});
