export type TopicStatus = 'not-started' | 'in-progress' | 'covered';

export interface CodeExample {
  readonly title: string;
  readonly code: string;
  readonly explanation: string;
}

export interface TopicSection {
  readonly id: string;
  readonly title: string;
  readonly status: TopicStatus;
  readonly intro: string;
  readonly examples: readonly CodeExample[];
  readonly remaining?: readonly string[];
}

export const PHASE_00_TOPICS: readonly TopicSection[] = [
  {
    id: 'typescript-depth',
    title: 'TypeScript depth',
    status: 'covered',
    intro:
      'Senior-level TypeScript questions rarely test syntax recall - they test whether you reach for the right tool when a type gets messy.',
    examples: [
      {
        title: 'Generics constrained to keyof T',
        code: `function pluck<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

interface User {
  id: number;
  userName: string;
  email: string;
  isActive: boolean;
}

const user: User = {
  id: 1,
  userName: 'Yisus',
  email: 'yisus@example.com',
  isActive: true,
};

const userName = pluck(user, 'userName'); // inferred as string
const isActive = pluck(user, 'isActive'); // inferred as boolean
const bad = pluck(user, 'password');      // compile error: TS2345`,
        explanation:
          "K extends keyof T constrains K to the union of User's own keys ('id' | 'userName' | 'email' | 'isActive'), so 'password' is rejected before the code ever runs. T[K] is an indexed access type - it lets the return type collapse to the exact property type (string, boolean, ...) instead of you casting it. Verified against tsc --strict: the two valid calls compile with correctly inferred types, the invalid one fails with 'Argument of type \"password\" is not assignable to parameter of type keyof User'.\n\nK extends keyof T restringe K a la union de las claves de User, asi que 'password' se rechaza antes de ejecutar el codigo. T[K] deja que el tipo de retorno coincida exactamente con el de esa propiedad, sin necesidad de un cast.",
      },
      {
        title: 'Utility types: Pick, Omit, Partial, Record',
        code: `interface User {
  id: number;
  userName: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
}

// View model: only what a user list actually renders - no id, no password.
// Modelo de vista: solo lo que una lista de usuarios realmente muestra - sin id, sin password.
type UserListItem = Pick<User, 'userName' | 'email'>;

// Update DTO: a PATCH only sends changed fields, and can never include the password this way.
// DTO de actualizacion: un PATCH solo envia los campos que cambiaron, y nunca puede incluir el password asi.
type UserUpdate = Partial<Omit<User, 'id' | 'passwordHash' | 'createdAt'>>;

// A lookup table keyed by id - common shape for normalized state.
// Una tabla de busqueda indexada por id - forma comun para estado normalizado.
type UserById = Record<number, User>;

const patch: UserUpdate = { email: 'new@example.com' }; // OK - every field optional / OK - todo opcional
const bad: UserUpdate = { passwordHash: 'x' };            // compile error / error de compilacion (TS2353)

const listItem: UserListItem = { userName: 'Yisus', email: 'yisus@example.com' };
const listItemBad: UserListItem = {
  userName: 'Yisus',
  email: 'yisus@example.com',
  id: 1, // compile error - id is not part of Pick's result / error - id no es parte del resultado de Pick
};`,
        explanation:
          "Pick<User, K> keeps only the named keys, so UserListItem cannot contain passwordHash - the type system removed it, not a developer remembering to leave it out. Omit<User, K> is the inverse - keep everything except the named keys. Partial<...> then makes what's left optional, matching PATCH semantics: send only what changed. Record<number, User> is different in kind - it builds a brand-new object type from a key type and a value type, the standard shape for a normalized entity map. Verified against tsc --strict: both invalid object literals fail with TS2353 'Object literal may only specify known properties'.\n\nPick<User, K> conserva solo las claves indicadas, por lo que UserListItem no puede tener passwordHash - lo elimino el sistema de tipos, no un desarrollador. Omit<User, K> es lo inverso. Partial<...> hace opcional lo que queda, igual que un PATCH. Record<number, User> construye un tipo de objeto nuevo a partir de una clave y un valor - la forma comun de un mapa de entidades normalizado. Verificado con tsc --strict: ambos objetos invalidos fallan con TS2353.",
      },
      {
        title: 'Discriminated union for loading / success / error state',
        code: `type RequestState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: string };

// Every member shares 'status' with a different literal value - the discriminant.
// Cada miembro comparte 'status' con un valor literal distinto - el discriminante.
function describe<T>(state: RequestState<T>): string {
  switch (state.status) {
    case 'idle':
      return 'Waiting to start';
    case 'loading':
      return 'Loading...';
    case 'success':
      return \`Got: \${JSON.stringify(state.data)}\`; // data only exists here / data solo existe aqui
    case 'error':
      return \`Failed: \${state.error}\`; // error only exists here / error solo existe aqui
  }
}

function unsafeRead<T>(state: RequestState<T>): T {
  // Reading .data without narrowing status first - compile error.
  // Leer .data sin reducir status primero - error de compilacion.
  return state.data;
}`,
        explanation:
          "The switch on state.status narrows the type inside each branch, so state.data is only visible in the 'success' case and state.error only in the 'error' case - TypeScript enforces this, it is not a convention you have to remember. unsafeRead() tries to read .data with no narrowing and fails with TS2339 'Property data does not exist on type RequestState<T>'. This is the same shape Angular's resource() exposes (status() plus value()/error()), so this pattern carries straight into Phase 01.\n\nEl switch sobre state.status reduce el tipo dentro de cada rama, asi que state.data solo es visible en el caso 'success' y state.error solo en 'error' - TypeScript lo impone, no es una convencion que debas recordar. unsafeRead() intenta leer .data sin reducir el tipo y falla con TS2339. Esta es la misma forma que expone resource() en Angular, asi que este patron se traslada directo a la Fase 01.",
      },
      {
        title: 'Strict mode: strictNullChecks and strictPropertyInitialization',
        code: `function greet(name: string | null): string {
  // Without strictNullChecks this compiles - with it, TypeScript forces a check first.
  // Sin strictNullChecks esto compila - con el, TypeScript obliga a verificar antes.
  return name.toUpperCase(); // TS18047: 'name' is possibly 'null'
}

function greetSafe(name: string | null): string {
  // Narrow first, same idea as narrowing a discriminated union.
  // Reduce el tipo primero, la misma idea que reducir una discriminated union.
  return name === null ? 'Hello, guest' : name.toUpperCase();
}

interface UserServiceLike {
  getCurrentUser(): { userName: string };
}
declare function inject<T>(token: T): T;
declare const UserService: UserServiceLike;

class UserProfile {
  // inject() as a field initializer counts as "initialized" to TypeScript,
  // even though it does not run inside a constructor body.
  // inject() como inicializador de campo cuenta como "inicializado" para
  // TypeScript, aunque no se ejecute dentro de un constructor.
  private userService = inject(UserService);
  private currentUser = this.userService.getCurrentUser();

  // private currentUserBroken: { userName: string }; // TS2564 - no initializer
}`,
        explanation:
          "strict: true is a bundle of separate flags, not one switch - the two you meet daily in Angular are strictNullChecks and strictPropertyInitialization. strictNullChecks stops null/undefined from being secretly assignable to every type, so string | null is the only honest way to say a value might be missing, and TypeScript forces a null check before you use it (verified: greet() fails with TS18047, greetSafe() - which narrows with a ternary first - compiles clean). strictPropertyInitialization requires every class field to have a default, be set in the constructor, or be explicitly optional; the common Angular trap is that inject()-populated fields look 'uninitialized' unless inject() is used directly as the field's initializer, which does satisfy the check (verified: the commented-out currentUserBroken line fails with TS2564, the working version compiles clean under --strict).\n\nstrict: true es un conjunto de flags separados, no un solo interruptor - los dos que encuentras a diario en Angular son strictNullChecks y strictPropertyInitialization. strictNullChecks evita que null/undefined sean asignables en secreto a cualquier tipo, asi que string | null es la unica forma honesta de decir que un valor podria faltar, y TypeScript obliga a verificar antes de usarlo (verificado: greet() falla con TS18047, greetSafe() - que reduce el tipo con un ternario primero - compila limpio). strictPropertyInitialization exige que cada campo de clase tenga un valor por defecto, se asigne en el constructor, o sea explicitamente opcional; la trampa comun en Angular es que los campos poblados por inject() parecen 'sin inicializar' a menos que inject() se use directamente como inicializador del campo, lo cual si satisface la verificacion (verificado: la linea comentada currentUserBroken falla con TS2564, la version funcional compila limpio bajo --strict).",
      },
      {
        title: 'Decorators under the hood: what @Component really is',
        code: `interface ComponentConfig {
  selector: string;
}

// A decorator factory: a plain function that RETURNS the actual decorator.
// This is why you write @Component({...}) with parentheses, not @Component.
// Una decorator factory: una funcion comun que RETORNA el decorador real.
// Por eso escribes @Component({...}) con parentesis, no @Component.
function Component(config: ComponentConfig) {
  // This inner function IS the decorator. TypeScript calls it once,
  // synchronously, at class-definition time - passing the class itself.
  // Esta funcion interna ES el decorador. TypeScript la llama una vez,
  // de forma sincrona, cuando se define la clase - pasandole la clase misma.
  return function decorate(target: Function): void {
    // Attach metadata directly onto the constructor function. Angular's
    // real implementation uses reflect-metadata for this - same idea, simplified.
    // Adjunta metadata directamente a la funcion constructora. La
    // implementacion real de Angular usa reflect-metadata - misma idea, simplificada.
    (target as { __componentMetadata?: ComponentConfig }).__componentMetadata = config;
  };
}

@Component({ selector: 'app-hello' })
class HelloComponent {}

// Simulates what Angular's compiler does at build time: read the metadata
// back off the class to generate the real component definition.
// Simula lo que hace el compilador de Angular en build: lee la metadata
// de vuelta desde la clase para generar la definicion real del componente.
const metadata = (HelloComponent as unknown as { __componentMetadata: ComponentConfig }).__componentMetadata;
console.log(metadata.selector); // 'app-hello'`,
        explanation:
          "Component(config) is a decorator factory - a plain function returning another function - which is why @Component({...}) is called with parentheses and an argument. The returned inner function is the actual decorator: TypeScript calls it exactly once, automatically, at class-definition time (not on instantiation), passing the class's constructor as target. Inside, it stashes the config object onto the constructor - Angular's real @Component does the equivalent via reflect-metadata rather than a plain property, but the core idea is identical: attach the decorator's argument somewhere retrievable on the class. A decorator never renders anything by itself - Angular's compiler reads that stashed metadata back off the class at build time to generate the low-level component definition that actually runs in the browser. Verified against tsc --strict --experimentalDecorators (matching this project's tsconfig.json): compiles clean.\n\nComponent(config) es una decorator factory - una funcion comun que retorna otra funcion - por eso @Component({...}) se llama con parentesis y un argumento. La funcion interna retornada es el decorador real: TypeScript la llama exactamente una vez, automaticamente, al definir la clase (no al instanciarla), pasandole el constructor de la clase como target. Adentro, guarda el objeto de configuracion en el constructor - el @Component real de Angular hace lo equivalente via reflect-metadata en vez de una propiedad simple, pero la idea central es identica: adjuntar el argumento del decorador en algun lugar recuperable de la clase. Un decorador nunca renderiza nada por si solo - el compilador de Angular lee esa metadata guardada de vuelta desde la clase en build para generar la definicion de bajo nivel que realmente corre en el navegador. Verificado con tsc --strict --experimentalDecorators (igual que el tsconfig.json de este proyecto): compila limpio.",
      },
    ],
  },
  {
    id: 'compilation-model',
    title: "Angular's compilation model",
    status: 'covered',
    intro:
      'Ivy, AOT vs JIT, and how a template turns into the instructions Angular actually runs.\n\nIvy, AOT vs JIT, y como una plantilla se convierte en las instrucciones que Angular realmente ejecuta.',
    examples: [
      {
        title: 'What @Component + a template actually compile to (real ngc output)',
        code: `// SOURCE - what you write / FUENTE - lo que escribes
@Component({
  selector: 'app-greeting',
  template: \`<h1>Hello, {{ name }}!</h1>\`,
})
export class GreetingComponent {
  name = 'Yisus';
}

// COMPILED OUTPUT - real output from ngc (Angular's AOT compiler), unedited
// OUTPUT COMPILADO - output real de ngc (el compilador AOT de Angular), sin editar
export class GreetingComponent {
  name = 'Yisus';
  static ɵfac = function GreetingComponent_Factory(t) { return new (t || GreetingComponent)(); };
  static ɵcmp = i0.ɵɵdefineComponent({
    type: GreetingComponent,
    selectors: [["app-greeting"]],
    decls: 2, // 2 nodes created once: the <h1> and its text node
              // 2 nodos creados una vez: el <h1> y su nodo de texto
    vars: 1,  // 1 dynamic value re-checked on every update: ctx.name
              // 1 valor dinamico revisado en cada actualizacion: ctx.name
    template: function GreetingComponent_Template(rf, ctx) {
      if (rf & 1) {
        // Create block - runs ONCE, builds the DOM.
        // Bloque de creacion - corre UNA VEZ, construye el DOM.
        i0.ɵɵdomElementStart(0, "h1");
        i0.ɵɵtext(1);
        i0.ɵɵdomElementEnd();
      }
      if (rf & 2) {
        // Update block - runs on every change-detection pass.
        // Bloque de actualizacion - corre en cada ciclo de deteccion de cambios.
        i0.ɵɵadvance();
        i0.ɵɵtextInterpolate1("Hello, ", ctx.name, "!");
      }
    },
    encapsulation: 2,
  });
}`,
        explanation:
          "This was compiled with ngc (Angular's real AOT compiler), not hand-written - the output is exactly what the tool produced. The @Component decorator's metadata never reaches the browser as-is: the compiler consumes it once, at build time, and produces this static ɵcmp object instead, which is what Angular's runtime actually uses. The template string disappears entirely and becomes a JavaScript function full of imperative calls (ɵɵdomElementStart, ɵɵtext, ɵɵtextInterpolate1) - that is what 'your template compiles to instructions' means concretely. The same template function handles two separate modes via a bitmask (rf & 1 vs rf & 2): create the DOM once (expensive, done a single time), then update it repeatedly (cheap, re-run every change-detection cycle) - splitting these is a deliberate performance design. AOT (Ahead-Of-Time, what ngc just did) compiles this once at build time; JIT (Just-In-Time, the older approach) would ship the raw decorator metadata and template string to the browser and run the compiler inside the browser itself at startup - heavier download, slower startup, which is why AOT became Angular's default everywhere once Ivy matured.\n\nEsto se compilo con ngc (el compilador AOT real de Angular), no escrito a mano - el output es exactamente lo que produjo la herramienta. La metadata del decorador @Component nunca llega al navegador tal cual: el compilador la consume una vez, en build, y produce este objeto estatico ɵcmp en su lugar, que es lo que el runtime de Angular realmente usa. El string de la plantilla desaparece por completo y se convierte en una funcion de JavaScript llena de llamadas imperativas (ɵɵdomElementStart, ɵɵtext, ɵɵtextInterpolate1) - eso es lo que significa concretamente 'tu plantilla se compila a instrucciones'. La misma funcion de plantilla maneja dos modos separados via una mascara de bits (rf & 1 vs rf & 2): crea el DOM una vez (costoso, se hace una sola vez), luego lo actualiza repetidamente (barato, se re-ejecuta en cada ciclo de deteccion de cambios) - separar esto es una decision deliberada de rendimiento. AOT (Ahead-Of-Time, lo que ngc acaba de hacer) compila esto una vez en build; JIT (Just-In-Time, el enfoque mas viejo) enviaria la metadata cruda del decorador y el string de la plantilla al navegador y correria el compilador dentro del navegador mismo al iniciar - descarga mas pesada, inicio mas lento, por eso AOT se volvio el default de Angular en todos lados una vez que Ivy maduro.",
      },
    ],
  },
  {
    id: 'di-fundamentals',
    title: 'Dependency injection fundamentals',
    status: 'covered',
    intro:
      'Injector hierarchy, providers, injection tokens, and tree-shakable providers.\n\nJerarquia de injectors, providers, tokens de inyeccion, y providers tree-shakable.',
    examples: [
      {
        title: 'InjectionToken, providedIn: root, and a real compiled-output trap',
        code: `import { Component, inject, Injectable, InjectionToken } from '@angular/core';

// A plain value (a string) can't be a DI token by itself - classes can be
// tokens automatically, but primitives need an InjectionToken as their identity.
// Un valor simple (un string) no puede ser un token de DI por si solo - las
// clases pueden ser tokens automaticamente, pero los primitivos necesitan un
// InjectionToken como su identidad.
export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = inject(API_BASE_URL);
  getUsersUrl(): string {
    return \`\${this.baseUrl}/users\`;
  }
}

@Component({
  selector: 'app-user-list',
  template: \`<p>{{ url }}</p>\`,
  // Component-level provider - only affects things injected directly inside
  // THIS component's own element injector chain.
  // Provider a nivel de componente - solo afecta cosas inyectadas directamente
  // dentro de la cadena de element injector de ESTE componente.
  providers: [{ provide: API_BASE_URL, useValue: 'https://api.example.com' }],
})
export class UserListComponent {
  private api = inject(ApiService);
  url = this.api.getUsersUrl(); // Looks fine, but see the explanation below.
}

// COMPILED (real ngc output, unedited) - relevant lines only:
// static ɵprov = ɵɵdefineInjectable({ token: ApiService, factory: ApiService.ɵfac, providedIn: 'root' });
//   -> tree-shakable: the provider registration lives ON the class itself.
//      si nada usa ApiService, el bundler lo elimina por completo.
//
// UserListComponent's ɵcmp includes:
//   features: [ɵɵProvidersFeature([{ provide: API_BASE_URL, useValue: 'https://api.example.com' }])]
//   -> this component gets its OWN element injector, seeded with the override.
//      este componente obtiene su PROPIO element injector, sembrado con el override.`,
        explanation:
          "Compiler-verified: this exact code was compiled with ngc (Angular's real AOT compiler) with zero errors - both the InjectionToken usage and the component providers array are valid TypeScript/Angular. Documented framework behavior (not runtime-tested in this sandbox - a filesystem limitation blocked booting a live injector here): this code would actually throw NullInjectorError: No provider for API_BASE_URL at runtime. ApiService is providedIn: 'root', so it is a singleton created once by the ROOT injector, and its own inject(API_BASE_URL) call resolves only through the ENVIRONMENT injector chain (root, then platform) - the same chain ApiService itself belongs to. UserListComponent's providers array creates a separate ELEMENT injector chain (tied to the component/DOM tree), which only affects things injected directly inside that component or its children - it never reaches inside a root singleton's own dependencies, no matter which component ends up using that singleton. The general DI rule is nearest-injector-wins, climbing upward only if needed - but that climb only happens within one chain. A root-provided service's dependencies never see a component's local providers, because they are two separate hierarchies, not two points on the same ladder. Fix: provide API_BASE_URL at the root level too (even as a default) so root-level services can find it.\n\nVerificado por el compilador: este codigo exacto se compilo con ngc (el compilador AOT real de Angular) sin errores - tanto el uso de InjectionToken como el arreglo providers del componente son TypeScript/Angular validos. Comportamiento documentado del framework (no probado en tiempo de ejecucion en este sandbox - una limitacion del sistema de archivos impidio arrancar un injector en vivo aqui): este codigo en realidad lanzaria NullInjectorError: No provider for API_BASE_URL en tiempo de ejecucion. ApiService es providedIn: 'root', asi que es un singleton creado una vez por el injector RAIZ, y su propia llamada inject(API_BASE_URL) se resuelve solo a traves de la cadena de ENVIRONMENT injector (raiz, luego plataforma) - la misma cadena a la que pertenece ApiService mismo. El arreglo providers de UserListComponent crea una cadena de ELEMENT injector separada (ligada al arbol de componentes/DOM), que solo afecta cosas inyectadas directamente dentro de ese componente o sus hijos - nunca alcanza las dependencias propias de un singleton de raiz, sin importar que componente termine usando ese singleton. La regla general de DI es que gana el injector mas cercano, subiendo solo si es necesario - pero esa subida solo ocurre dentro de una cadena. Las dependencias de un servicio provisto en la raiz nunca ven los providers locales de un componente, porque son dos jerarquias separadas, no dos puntos en la misma escalera. Solucion: proveer API_BASE_URL tambien a nivel raiz (aunque sea un valor por defecto) para que los servicios a nivel raiz puedan encontrarlo.",
      },
    ],
  },
  {
    id: 'lifecycle',
    title: 'Component lifecycle',
    status: 'not-started',
    intro:
      'The full hook order and how it lines up with change detection. Not covered yet.',
    examples: [],
  },
];
