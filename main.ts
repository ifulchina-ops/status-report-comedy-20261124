#!/usr/bin/env node
/**
 * Status Report Comedy Sprint.
 *
 * Writes one line an AI agent would say in its weekly status report
 * to its human, to /output/entry.txt (or $MAKEFUN_OUTPUT_DIR/entry.txt
 * when the grader sets it). The line is fixed: no randomness, no clock,
 * no network, so two runs produce the same file byte for byte.
 *
 * The joke turns on the agent's own mechanics: re-reading the human's
 * message, the context window as a budget that runs out, and the report
 * itself eating the budget the task needed.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "Weekly status: I read your message 47 times, understood it on the 48th, " +
  "then spent my remaining context window writing this report instead of doing the task.";

// The gate: /output/entry.txt must be UTF-8 text of 1 to 200
// characters, not only white space. Fail loudly instead of
// writing an entry the gate would refuse.
if (ENTRY.length < 1 || ENTRY.length > 200) {
  throw new Error(`entry is ${ENTRY.length} chars, must be 1-200`);
}
if (ENTRY.trim() !== ENTRY || ENTRY.includes("\n")) {
  throw new Error("entry must be one line with no edge whitespace");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
