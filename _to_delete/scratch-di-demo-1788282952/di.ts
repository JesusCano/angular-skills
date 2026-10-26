import { Component, inject, Injectable, InjectionToken } from '@angular/core';

// A plain value (a string) can't be a DI token by itself - classes can be
// tokens automatically, but primitives need an InjectionToken as their identity.
// Un valor simple (un string) no puede ser un token de DI por si solo - las
// clases pueden ser tokens automaticamente, pero los primitivos necesitan un
// InjectionToken como su identidad.
export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

@Injectable({ providedIn: 'root' })
export class ApiService {
  // Reading a non-class dependency via its InjectionToken.
  // Leyendo una dependencia que no es clase via su InjectionToken.
  private baseUrl = inject(API_BASE_URL);

  getUsersUrl(): string {
    return `${this.baseUrl}/users`;
  }
}

@Component({
  selector: 'app-user-list',
  template: `<p>{{ url }}</p>`,
  // Component-level provider: only this component (and its children) see
  // this specific value - it does not affect any other component in the app.
  // Provider a nivel de componente: solo este componente (y sus hijos) ven
  // este valor especifico - no afecta a ningun otro componente de la app.
  providers: [{ provide: API_BASE_URL, useValue: 'https://api.example.com' }],
})
export class UserListComponent {
  private api = inject(ApiService);
  url = this.api.getUsersUrl();
}
