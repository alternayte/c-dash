import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const source = readFileSync(new URL("../pages/symbols/index.tsx", import.meta.url), "utf8");

test("the symbols page renders its title with an h1 element", () => {
  assert.match(source, /<h1>\s*Symbols\s*<\/h1>/);
});
