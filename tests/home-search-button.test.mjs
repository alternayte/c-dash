import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// The home page has no DOM test dependency, so this reads the source and checks the label the
// symbol search button renders.
test("the home page search button is labeled \"Search symbol\"", () => {
  const source = readFileSync(new URL("../pages/index.tsx", import.meta.url), "utf8");
  assert.match(source, /<Button[\s\S]*?>\s*Search symbol\s*<\/Button>/);
});
