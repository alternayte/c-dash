import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

test("the configs page sets the Configs browser tab title", () => {
  assert.equal(existsSync(new URL("../pages/strategies", import.meta.url)), false);

  const source = readFileSync(new URL("../pages/configs/index.tsx", import.meta.url), "utf8");
  assert.match(source, /<title>Configs \| c-dash<\/title>/);
});
