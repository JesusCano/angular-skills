export type PhaseStatus = 'not-started' | 'in-progress' | 'done';

export interface Topic {
  readonly title: string;
  readonly description: string;
}

export interface Phase {
  readonly id: string;
  readonly order: number;
  readonly title: string;
  readonly focus: string;
  readonly pace: string;
  readonly status: PhaseStatus;
  readonly topics: readonly Topic[];
}

export const ROADMAP_PHASES: readonly Phase[] = [
  {
    id: '00',
    order: 0,
    title: 'Foundations refresh',
    focus: 'Make sure the mental model underneath everything else is solid.',
    pace: '~3-4 days',
    status: 'in-progress',
    topics: [
      { title: 'TypeScript depth', description: 'Generics, utility types, discriminated unions, strict mode, decorators.' },
      { title: "Angular's compilation model", description: 'Ivy, AOT vs JIT, how templates become instructions.' },
      { title: 'Dependency injection fundamentals', description: 'Injector hierarchy, providers, injection tokens.' },
      { title: 'Component lifecycle', description: 'Full hook order and how it relates to change detection.' },
    ],
  },
  {
    id: '01',
    order: 1,
    title: 'Signals & modern reactivity',
    focus: 'The single biggest shift in Angular since components were introduced.',
    pace: '~1.5 weeks',
    status: 'not-started',
    topics: [
      { title: 'Core primitives', description: 'signal(), computed(), effect() and equality checks.' },
      { title: 'linkedSignal()', description: 'Derived-but-writable state.' },
      { title: 'resource() & httpResource()', description: 'Signal-based async data fetching.' },
      { title: 'Signal inputs, outputs & model()', description: 'input(), input.required(), output(), two-way model().' },
      { title: 'RxJS interop', description: 'toSignal(), toObservable(), and when to reach for each.' },
    ],
  },
  {
    id: '02',
    order: 2,
    title: 'Component architecture',
    focus: 'Standalone is now the only way components are built.',
    pace: '~1 week',
    status: 'not-started',
    topics: [
      { title: 'Standalone components', description: 'imports arrays, bootstrapApplication, provider config.' },
      { title: 'Content projection', description: 'ng-content, multi-slot projection, ng-template & ng-container.' },
      { title: 'hostDirectives', description: 'Behavior reuse without inheritance.' },
      { title: 'DI patterns', description: 'inject() vs constructor injection, injection context rules.' },
      { title: 'viewChild() / contentChild()', description: 'Signal-based query APIs.' },
    ],
  },
  {
    id: '03',
    order: 3,
    title: 'Templates & control flow',
    focus: 'Built-in control flow and deferrable views replaced the old structural directives.',
    pace: '~4-5 days',
    status: 'not-started',
    topics: [
      { title: 'Built-in control flow', description: '@if / @else, @for with required track, @switch.' },
      { title: '@let', description: 'Local template variables and scoping.' },
      { title: '@defer blocks', description: 'Triggers, placeholder/loading/error states, prefetching.' },
      { title: 'Migration mechanics', description: 'How the CLI schematic converts structural directives.' },
    ],
  },
  {
    id: '04',
    order: 4,
    title: 'Forms',
    focus: 'Reactive Forms is still the production default; Signal Forms is what signals you are current.',
    pace: '~1 week',
    status: 'not-started',
    topics: [
      { title: 'Reactive Forms mastery', description: 'FormGroup/FormArray, custom & async validators.' },
      { title: 'Typed Forms', description: 'Strict typing of form models.' },
      { title: 'Signal Forms (new)', description: 'The form() function over a signal model.' },
      { title: 'Custom form controls', description: 'ControlValueAccessor.' },
    ],
  },
  {
    id: '05',
    order: 5,
    title: 'Async data & RxJS interop',
    focus: 'Signals did not replace RxJS - they gave you a second tool and a decision to make.',
    pace: '~1.5 weeks',
    status: 'not-started',
    topics: [
      { title: 'RxJS fundamentals', description: 'Hot vs cold, subjects, switchMap/mergeMap/concatMap/exhaustMap.' },
      { title: 'HttpClient patterns', description: 'Functional interceptors, error handling, retry/backoff.' },
      { title: 'State management approaches', description: 'Signal-based services vs NgRx vs plain RxJS services.' },
      { title: 'Signals vs observables', description: 'A defensible rule of thumb you can articulate.' },
    ],
  },
  {
    id: '06',
    order: 6,
    title: 'Change detection & performance',
    focus: 'Zoneless is now the default for new apps.',
    pace: '~1 week',
    status: 'not-started',
    topics: [
      { title: 'Zone.js change detection (legacy)', description: 'How it patches async APIs and why it existed.' },
      { title: 'Zoneless Angular', description: 'provideZonelessChangeDetection() and migration.' },
      { title: 'OnPush strategy', description: 'Why it is now default-by-convention.' },
      { title: 'Bundle & runtime performance', description: 'Lazy boundaries, track, virtual scrolling, Core Web Vitals.' },
    ],
  },
  {
    id: '07',
    order: 7,
    title: 'Routing & application architecture',
    focus: 'Where "can code Angular" turns into "can architect an Angular app."',
    pace: '~1 week',
    status: 'not-started',
    topics: [
      { title: 'Router fundamentals', description: 'Functional guards/resolvers, lazy routes, route-level providers.' },
      { title: 'Feature-based architecture', description: 'shared/core/feature layering, public API boundaries.' },
      { title: 'Micro-frontends & monorepos', description: 'Nx workspace basics, module federation concepts.' },
      { title: 'Design patterns', description: 'Facade services, smart/presentational components.' },
    ],
  },
  {
    id: '08',
    order: 8,
    title: 'Testing',
    focus: 'Vitest is now the stable default test runner.',
    pace: '~5-6 days',
    status: 'not-started',
    topics: [
      { title: 'Vitest fundamentals', description: 'Config differences from Karma/Jasmine, watch mode, coverage.' },
      { title: 'Component testing', description: 'TestBed with standalone components, harnesses.' },
      { title: 'Testing signals', description: 'Computed values, effects, resource() loading states.' },
      { title: 'Testing strategy', description: 'Unit vs integration boundary, mocking HttpClient.' },
    ],
  },
  {
    id: '09',
    order: 9,
    title: 'SSR, hydration & full-stack Angular',
    focus: "Angular's SSR story has matured fast.",
    pace: '~1 week',
    status: 'not-started',
    topics: [
      { title: 'SSR basics', description: 'server.ts, main.server.ts, app.config.server.ts.' },
      { title: 'Hydration', description: 'Full vs incremental hydration, event replay.' },
      { title: 'Route-level rendering', description: 'SSR, prerendering, or CSR per route.' },
      { title: 'SEO & meta tags', description: 'Meta/Title services, structured data.' },
    ],
  },
  {
    id: '10',
    order: 10,
    title: 'Tooling & ecosystem',
    focus: 'Fast, shallow, but expected.',
    pace: '~3-4 days',
    status: 'not-started',
    topics: [
      { title: 'Build system', description: 'esbuild/Vite-based application builder.' },
      { title: 'The Angular CLI', description: 'Schematics, ng update, migration schematics.' },
      { title: 'Angular DevTools', description: 'Component tree, signal graph, profiler.' },
      { title: 'Component libraries', description: 'Material, CDK, Angular Aria.' },
    ],
  },
  {
    id: '11',
    order: 11,
    title: 'System design & behavioral prep',
    focus: 'What actually separates mid-level from senior candidates.',
    pace: '~1 week',
    status: 'not-started',
    topics: [
      { title: 'Front-end system design', description: 'Design a component library or a live-data dashboard.' },
      { title: 'Scalability & team topics', description: 'Code review standards, shared UI library versioning.' },
      { title: 'Migration & legacy strategy', description: 'Incremental migration planning with rollback safety.' },
      { title: 'Behavioral stories', description: '4-5 STAR stories ready to go.' },
    ],
  },
  {
    id: '12',
    order: 12,
    title: 'Interview execution',
    focus: 'Delivery, not new material.',
    pace: '~1 week, ongoing',
    status: 'not-started',
    topics: [
      { title: 'Live coding practice', description: 'Timed exercises under pressure.' },
      { title: 'Portfolio walkthrough', description: 'A narrated tour of angular-skills.' },
      { title: 'Mock interviews', description: 'Full-length mocks with feedback.' },
      { title: 'Resume & story alignment', description: 'Every claim maps to something demoable.' },
    ],
  },
];
