import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// The smallest real check of the repository. It proves the test runner works, and it gives a
// Factoree Run one deterministic assertion to answer before a task adds its own.
test("the package declares the scripts the checks need", () => {
  const manifest = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8"));
  assert.equal(typeof manifest.scripts["type-check"], "string");
  assert.equal(typeof manifest.scripts.test, "string");
});
