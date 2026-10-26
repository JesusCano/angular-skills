import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG } from '../../core/app-config';

// Shapes matching the REAL PokeAPI response (verified against
// https://pokeapi.co/api/v2/pokemon/ditto — only the fields this demo uses).

// Formas que coinciden con la respuesta REAL de PokeAPI (verificado contra
// https://pokeapi.co/api/v2/pokemon/ditto — solo los campos que usa este demo).
export interface PokemonAbility {
  ability: { name: string };
  is_hidden: boolean;
}

export interface PokemonStat {
  base_stat: number;
  stat: { name: string };
}

export interface PokemonType {
  type: { name: string };
}

export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string | null;
    other: { 'official-artwork': { front_default: string | null } };
  };
  types: PokemonType[];
  stats: PokemonStat[];
  abilities: PokemonAbility[];
}

// The service injects BOTH HttpClient (to make the call) and APP_CONFIG (to
// know the base URL). It does NOT subscribe — it just returns the
// Observable, so any component can consume it however it needs.

// El servicio inyecta TANTO HttpClient (para hacer la llamada) como
// APP_CONFIG (para saber la URL base). NO se suscribe — solo regresa el
// Observable, así cualquier componente lo puede consumir como necesite.
@Injectable({ providedIn: 'root' })
export class PokemonService {
  private http = inject(HttpClient);
  private config = inject(APP_CONFIG);

  getPokemon(nameOrId: string) {
    const normalized = nameOrId.trim().toLowerCase();
    return this.http.get<Pokemon>(`${this.config.pokeApiUrl}/pokemon/${normalized}`);
  }
}
