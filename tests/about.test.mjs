import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const source = readFileSync(new URL("../pages/about.tsx", import.meta.url), "utf8");

test("the about page passes the About | c-dash title to Layout", () => {
  const match = source.match(/<Layout[^>]*\btitle="([^"]*)"/);

  assert.ok(match, "the about page renders Layout with a title");
  assert.equal(match[1], "About | c-dash");
});
