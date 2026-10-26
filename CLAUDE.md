# angular-skills — working notes for Claude

This project is Yisus's hands-on prep space for Senior Angular interviews. It follows a 13-phase roadmap (00–12), each phase gets its own routed component under `src/app/features/`, and progress is tracked in the home menu (`src/app/features/home/roadmap-data.ts`) and in the `Phase00`-style content files per phase.

## Language convention (important — apply to all code from here on)

- **Code itself is always in English**: variable names, function names, types, class names, file names, commit messages. This matches the language's real-world standard and what Yisus will be expected to write in an actual job.
- **Comments and explanations are bilingual — English first, then Spanish**, in every code example, every inline comment, and every prose explanation I write about the code. Format: the English line/sentence, then the Spanish translation right after it (in a comment, on the next line or joined with " / ").
  - Example comment style:
    ```typescript
    // Constrain K to the union of T's own keys so invalid keys are rejected at compile time.
    // Restringe K a la union de las claves propias de T para que las claves invalidas se rechacen en tiempo de compilacion.
    function pluck<T, K extends keyof T>(obj: T, key: K): T[K] {
      return obj[key];
    }
    ```
  - In prose (chat explanations, Phase page descriptions, `remaining`/`intro` fields in content files), give the explanation in English, then a short Spanish recap of the same idea — not a full duplicate essay, just enough that a rusty English reader can double-check they followed it.
  - In `CodeExample.explanation` strings specifically: separate the English paragraph and the Spanish paragraph with a literal blank line (`\n\n`), never run them together in one paragraph. The `Phase00` component splits on that blank line (`explanationParts()` in `phase-00.ts`) and renders each half as its own `<p>`, with the Spanish half styled distinctly (`.explanation-es`) — reuse this same pattern (split on `\n\n`, two `<p>` elements) in every future phase's component/template, not just Phase 00. In chat replies, use an actual blank line between the English and Spanish text for the same reason — it should never read as one run-on paragraph.
- Purpose: Yisus's English is not advanced yet, and this project doubles as English practice for technical writing/reading, alongside the Angular content itself. Do not drop the Spanish half even when it feels redundant — that repetition is the point.
- Do not translate code identifiers, keywords, or console/compiler output — only comments and my own explanations get the bilingual treatment.

## Teaching format

- After every lesson/topic explanation (in chat or as a new example added to a phase page), ask one short comprehension question to check Yisus actually got it before moving on. Keep it quick - one question, not a quiz block - and wait for his answer before continuing to the next topic.

## Roadmap & content structure

- 13 phases, 00 through 12, defined in `src/app/features/home/roadmap-data.ts` (`ROADMAP_PHASES`). Each phase's `status` is `'not-started' | 'in-progress' | 'done'`.
- A phase becomes clickable in the home menu once it has a `route` set on its entry and a real route wired in `src/app/app.routes.ts`.
- Each phase's own page lives at `src/app/features/phase-XX/` (e.g. `phase-00.ts/html/scss` + a `phase-XX.content.ts` data file). Topics within a phase use `TopicStatus = 'not-started' | 'in-progress' | 'covered'`, and each topic holds `examples` (title, code, explanation) plus an optional `remaining` list of subtopics not yet demoed.
- Build one component per phase (not one per topic) — confirmed with Yisus. All topics for a phase live as sections on that phase's single page.
- When adding a new code example to a phase's content file, verify it against the real TypeScript/Angular compiler first (`tsc --strict --noEmit` for plain TS snippets, or the project's own `tsc -p tsconfig.app.json --noEmit` for anything touching Angular templates/strictTemplates) before writing the explanation, and reference what the compiler actually said rather than assumed behavior.

## Playground examples (not tied to a phase)

Some hands-on examples (e.g. DI + interceptor + PokeAPI, at `src/app/features/pokemon-demo/`) don't belong to a specific roadmap phase — they exist to show a concept working end-to-end against a real API. These live under `src/app/features/<name>/`, get their own route under `/playground/<name>` in `app.routes.ts`, and are linked from a "Playground" section at the bottom of the home page (`home.html`/`home.scss`). Shared, non-phase-specific pieces (InjectionTokens, interceptors) go in `src/app/core/`.

## Environment notes

- This project lives in a folder connected via the device bridge — edit files directly with `device_bash` (sed/python read-modify-write), never by re-typing full file contents from memory.
- `ng build` / `ng test` fail in the cloud sandbox shell specifically because of an esbuild darwin-arm64 vs linux-arm64 mismatch (the mounted node_modules has macOS binaries, the sandbox is Linux). This is NOT a real project bug — `tsc --noEmit` (with `strictTemplates` on in `tsconfig.json`) is the reliable way to verify changes from this session. Yisus can confirm the visual/runtime result himself with `ng serve` on his own machine.
- IMPORTANT: `tsc -p tsconfig.app.json --noEmit`'s `include: ["src/**/*.ts"]` glob silently skips dot-prefixed directories (e.g. `src/.scratch-foo/`). A scratch file placed in a dot-folder under `src/` is NOT actually type-checked — tsc exits 0 even with a syntax error inside it, giving a false "verified" result. Always use a non-dot folder name for scratch verification files under `src/` (e.g. `src/scratch-foo-demo/`), and always move it to `_to_delete/` right after, same as scratch folders outside `src/`.
- Google Calendar is connected for this session and used to schedule study blocks tied to the roadmap phases.

## Current schedule (as of last update)

All 13 phases scheduled across September (compressed from an original 8–12 week estimate to 1 month, 4 hrs/day): two daily blocks per phase, 9:00–12:00 AM and 3:00–4:00 PM America/Mexico_City, from Sep 1 through Sep 30. Ask before re-scheduling; adjust in place (delete + recreate the specific phase's AM/PM series) rather than touching the whole month if only one phase's timing needs to change.
