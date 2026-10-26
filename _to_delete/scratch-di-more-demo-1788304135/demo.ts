import { Injectable, InjectionToken, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AsyncValidatorFn, AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { map, of, catchError } from 'rxjs';

// 1) InjectionToken — for plain VALUES, not classes (config, flags, environment strings).
// 1) InjectionToken — para VALORES simples, no clases (config, flags, strings de entorno).
interface AppConfig { apiUrl: string; featureFlagX: boolean; }
export const APP_CONFIG = new InjectionToken<AppConfig>('APP_CONFIG');

// 2) A functional Guard — modern Angular guards are plain functions, but they still
// call inject() to reach into the SAME injector tree as a component or service would.
// 2) Un Guard funcional — los guards modernos son funciones simples, pero igual
// llaman a inject() para entrar al MISMO árbol de injectors que usaría un componente o servicio.
class AuthService {
  isLoggedIn(): boolean { return true; }
}

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  return auth.isLoggedIn() ? true : router.parseUrl('/login');
};

// 3) An injectable async Validator — a class that Angular's DI creates like any
// other service, so it can inject HttpClient to check something against the backend
// (e.g. "is this username already taken?") while the user types in a form.
// 3) Un Validator asíncrono inyectable — una clase que el DI de Angular crea igual
// que cualquier otro servicio, para poder inyectar HttpClient y verificar algo contra
// el backend (p. ej. "¿este username ya está en uso?") mientras el usuario escribe.
@Injectable({ providedIn: 'root' })
class UniqueUsernameValidator {
  private http = inject(HttpClient);

  validate: AsyncValidatorFn = (control: AbstractControl) => {
    return this.http.get<{ taken: boolean }>(`/api/usernames/${control.value}`).pipe(
      map((res) => (res.taken ? { usernameTaken: true } : null)),
      catchError(() => of(null))
    );
  };
}
