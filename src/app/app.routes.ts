import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home').then((m) => m.Home),
    title: 'Senior Angular Path',
  },
  {
    path: '00',
    loadComponent: () => import('./features/phase-00/phase-00').then((m) => m.Phase00),
    title: 'Phase 00 - Foundations refresh',
  },
  {
    path: 'playground/pokemon',
    loadComponent: () =>
      import('./features/pokemon-demo/pokemon-demo').then((m) => m.PokemonDemo),
    title: 'Playground - DI + PokeAPI',
  },
];
