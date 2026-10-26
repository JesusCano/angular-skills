import {
  Component, Injectable, InjectionToken, inject, signal, ApplicationConfig,
} from '@angular/core';
import {
  HttpClient, HttpInterceptorFn, HttpErrorResponse, provideHttpClient, withInterceptors,
} from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

// ---------------------------------------------------------------------------
// 1) InjectionToken — the config that says WHERE the API lives.
// 1) InjectionToken — la config que dice DÓNDE vive el API.
// ---------------------------------------------------------------------------
interface AppConfig { apiUrl: string; }
export const APP_CONFIG = new InjectionToken<AppConfig>('APP_CONFIG');

// ---------------------------------------------------------------------------
// 2) Shapes of the real PokeAPI response we actually care about.
// 2) Formas de la respuesta real de PokeAPI que realmente nos importan.
// ---------------------------------------------------------------------------
interface PokemonType { type: { name: string }; }
interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: { front_default: string | null };
  types: PokemonType[];
}

// ---------------------------------------------------------------------------
// 3) Interceptor — runs for EVERY HttpClient call, turns any failure into
// one consistent, friendly Error before it reaches a service or component.
// 3) Interceptor — corre para CADA llamada de HttpClient, convierte cualquier
// falla en un Error consistente y amigable antes de que llegue a un servicio o componente.
// ---------------------------------------------------------------------------
export const pokeApiErrorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      const message = err.status === 404
        ? 'That Pokémon does not exist.'
        : 'PokeAPI is unreachable right now.';
      return throwError(() => new Error(message));
    })
  );
};

// ---------------------------------------------------------------------------
// 4) Service — injects HttpClient (to call) + APP_CONFIG (to know the base
// URL). Does NOT subscribe; just returns the Observable.
// 4) Servicio — inyecta HttpClient (para llamar) + APP_CONFIG (para saber la
// URL base). NO se suscribe; solo regresa el Observable.
// ---------------------------------------------------------------------------
@Injectable({ providedIn: 'root' })
class PokemonService {
  private http = inject(HttpClient);
  private config = inject(APP_CONFIG);

  getPokemon(name: string) {
    return this.http.get<Pokemon>(`${this.config.apiUrl}/pokemon/${name}`);
  }
}

// ---------------------------------------------------------------------------
// 5) Component — the one that subscribes, and owns loading/error/data state.
// 5) Componente — el que se suscribe, y es dueño del estado de carga/error/data.
// ---------------------------------------------------------------------------
@Component({
  selector: 'app-pokemon-card',
  template: `
    @if (loading()) {
      <p>Loading…</p>
    } @else if (errorMessage()) {
      <p class="error">{{ errorMessage() }}</p>
    } @else if (pokemon(); as p) {
      <h3>{{ p.name }} (#{{ p.id }})</h3>
      @if (p.sprites.front_default) {
        <img [src]="p.sprites.front_default" [alt]="p.name" />
      }
      <p>Height: {{ p.height }} · Weight: {{ p.weight }}</p>
      <p>Types: {{ p.types.map(t => t.type.name).join(', ') }}</p>
    }
  `,
})
class PokemonCardComponent {
  private pokemonService = inject(PokemonService);

  protected readonly loading = signal(false);
  protected readonly errorMessage = signal<string | null>(null);
  protected readonly pokemon = signal<Pokemon | null>(null);

  search(name: string) {
    this.loading.set(true);
    this.errorMessage.set(null);

    this.pokemonService.getPokemon(name).subscribe({
      next: (p) => {
        this.pokemon.set(p);
        this.loading.set(false);
      },
      error: (err: Error) => {
        this.errorMessage.set(err.message);
        this.loading.set(false);
      },
    });
  }
}

// ---------------------------------------------------------------------------
// 6) main.ts wiring — where everything gets connected: the real apiUrl for
// APP_CONFIG, and the interceptor registered on HttpClient.
// 6) Cableado de main.ts — donde todo se conecta: el apiUrl real para
// APP_CONFIG, y el interceptor registrado en HttpClient.
// ---------------------------------------------------------------------------
export const appConfig: ApplicationConfig = {
  providers: [
    { provide: APP_CONFIG, useValue: { apiUrl: 'https://pokeapi.co/api/v2' } },
    provideHttpClient(withInterceptors([pokeApiErrorInterceptor])),
  ],
};

void PokemonCardComponent;
