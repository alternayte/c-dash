import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

test("the configs page renders Configs as a level-one heading", () => {
  const page = readFileSync(new URL("../pages/configs/index.tsx", import.meta.url), "utf8");
  assert.match(page, /<h1[^>]*>\s*Configs\s*<\/h1>/);
});
