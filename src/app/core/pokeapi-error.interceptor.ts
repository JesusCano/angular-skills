import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

// Runs for EVERY HttpClient request in the app, before it reaches any
// service. Turns a raw HTTP failure into one friendly, predictable Error —
// no service or component has to know PokeAPI's specific status codes.

// Corre para CADA request de HttpClient en la app, antes de llegar a
// cualquier servicio. Convierte una falla HTTP cruda en un solo Error
// amigable y predecible — ningún servicio o componente necesita conocer los
// códigos de estado específicos de PokeAPI.
export const pokeApiErrorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      const message = err.status === 404
        ? 'That Pokémon does not exist. / Ese Pokémon no existe.'
        : 'PokeAPI is unreachable right now. / PokeAPI no está disponible ahora mismo.';
      return throwError(() => new Error(message));
    })
  );
};
