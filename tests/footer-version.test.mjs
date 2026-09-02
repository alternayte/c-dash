import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

test("the dashboard footer shows the package version", () => {
  const manifest = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8"));
  assert.ok(manifest.version, "package.json declares a version");
  const layout = readFileSync(new URL("../components/Layout.tsx", import.meta.url), "utf8");
  const footer = layout.match(/<footer>([\s\S]*?)<\/footer>/);
  assert.ok(footer, "Layout has a footer");
  assert.ok(
    footer[1].includes("v{version}"),
    "the footer renders the package version"
  );
  assert.ok(
    layout.includes(`import { version } from '../package.json'`),
    "the footer version comes from the package manifest"
  );
});