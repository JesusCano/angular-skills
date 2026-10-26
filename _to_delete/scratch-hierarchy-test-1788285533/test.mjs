import { Injector, InjectionToken } from '@angular/core';

const GREETING = new InjectionToken('GREETING');

// ROOT injector: provides a default value.
// Injector RAIZ: provee un valor por defecto.
const rootInjector = Injector.create({
  providers: [{ provide: GREETING, useValue: 'Hello from ROOT' }],
});

// CHILD injector: provides its own, different value, with rootInjector as parent.
// Injector HIJO: provee su propio valor, distinto, con rootInjector como padre.
const childInjector = Injector.create({
  providers: [{ provide: GREETING, useValue: 'Hello from CHILD' }],
  parent: rootInjector,
});

// GRANDCHILD injector: provides NOTHING for GREETING - must climb up to find it.
// Injector NIETO: NO provee nada para GREETING - debe subir para encontrarlo.
const grandchildInjector = Injector.create({
  providers: [],
  parent: childInjector,
});

console.log('Asked at ROOT:       ', rootInjector.get(GREETING));
console.log('Asked at CHILD:      ', childInjector.get(GREETING));
console.log('Asked at GRANDCHILD: ', grandchildInjector.get(GREETING));
