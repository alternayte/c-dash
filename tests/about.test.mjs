import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const source = readFileSync(new URL("../pages/about.tsx", import.meta.url), "utf8");

test("the About page links back to the dashboard at /", () => {
  assert.match(source, /<Link href="\/">\s*<a>Back to the dashboard<\/a>\s*<\/Link>/);
});

test("the About page no longer says Go home", () => {
  assert.doesNotMatch(source, /Go home/);
});
