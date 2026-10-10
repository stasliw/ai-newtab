import { describe, expect, test } from "bun:test";
import { buildKickoffMessage, parseInterests } from "../packages/agent-core/prompt";

describe("interests mode", () => {
  test("parseInterests drops blanks and comments", () => {
    expect(parseInterests("F1\n\n  # note\n AI: https://x.com ")).toEqual(["F1", "AI: https://x.com"]);
  });

  test("kickoff skips history when interests are given", () => {
    const msg = buildKickoffMessage({ now: new Date(), interests: ["F1"] });
    expect(msg).toContain("- F1");
    expect(msg).toContain("Skip getHistory");
  });

  test("kickoff starts with history when no interests", () => {
    const msg = buildKickoffMessage({ now: new Date() });
    expect(msg).toContain("Start with getHistory");
    expect(msg).not.toContain("Interests");
  });
});
