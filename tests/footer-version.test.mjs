import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// The footer reads the version from the package manifest, so the manifest is the one
// source of truth for the value the dashboard displays.
test("package.json declares the app version 0.1.0", () => {
  const manifest = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8"));
  assert.equal(manifest.version, "0.1.0");
});

test("the dashboard footer shows the version from package.json", () => {
  const layout = readFileSync(
    new URL("../components/layouts/SimpleSidebarLayout.tsx", import.meta.url),
    "utf8"
  );
  assert.match(layout, /from '\.\.\/\.\.\/package\.json'/);
  assert.match(layout, /v\{packageInfo\.version\}/);
});
