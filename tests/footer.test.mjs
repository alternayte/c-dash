import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const layout = readFileSync(new URL("../components/Layout.tsx", import.meta.url), "utf8");

test("the shared Layout footer renders the copyright line", () => {
  assert.ok(layout.includes("© 2026 C-Dash"));
});

test("the shared Layout footer no longer contains the old footer text", () => {
  assert.ok(!layout.includes("I'm here to stay (Footer)"));
});
