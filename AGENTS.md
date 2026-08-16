# AGENTS.md

Operational guide for `@askrjs/logos`, which owns a small, explicit set of Askr
brand-logo wrappers.

## Askr North Star

Keep each export a thin, narratable wrapper over the shared icon contract.
Enforce accessibility and SVG invariants in the generator or shared primitive,
not through comments on generated files. Keep source data, generation, exports,
and package output as visible seams. Prefer an explicit curated export over
automatic discovery, and add a logo only for a demonstrated application need.
Failure messages from generation and package checks must identify the logo and
the correction required.

Run `npm run check` before declaring a change ready. Change generators or source
data rather than hand-editing generated output.

## Optimization Gate

A benchmark number is only half of an optimization's success criterion. The
change must also preserve a causal path that a human or agent can narrate in one
sentence.

Every benchmark-driven change must include:

1. the one-sentence causal description of the optimized path;
2. the exact fallback trigger and proof that optimized and fallback paths have
   identical observable behavior and error surfaces;
3. an explicit legibility-cost statement, including `none` when no new path or
   concept is introduced; and
4. evidence that a measured bottleneck in a real application justifies the
   optimization now.

Prefer making the existing single path faster. New caches, inference,
memoization, shortcuts, fast paths, or scheduler states require an explicit
legibility decision; a speedup alone does not justify them.
