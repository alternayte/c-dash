import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

test("the about page names the product under the heading", () => {
  const source = readFileSync(new URL("../pages/about.tsx", import.meta.url), "utf8");
  const heading = source.indexOf("<h1>About</h1>");
  const sentence = source.indexOf("<p>C-Dash shows the state of your crypto bots.</p>");
  assert.notEqual(heading, -1);
  assert.notEqual(sentence, -1);
  assert.ok(heading < sentence, "the sentence comes after the About heading");
});
