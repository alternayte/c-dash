import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

test("the About page heading names the dashboard", () => {
  const page = readFileSync(new URL("../pages/about.tsx", import.meta.url), "utf8");
  assert.match(page, /<h1>About this dashboard<\/h1>/);
});
