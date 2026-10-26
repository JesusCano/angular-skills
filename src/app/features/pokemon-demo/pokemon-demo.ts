import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PokemonService, type Pokemon } from './pokemon.service';

// This page is a "playground" example, not tied to a specific roadmap phase
// — it exists to show DI (InjectionToken), an HTTP interceptor, and a
// service/component split, all working together against a real API.

// Esta página es un ejemplo de "playground", no está ligada a una fase
// específica del roadmap — existe para mostrar DI (InjectionToken), un
// interceptor HTTP, y la separación servicio/componente, todo funcionando
// junto contra un API real.
@Component({
  selector: 'app-pokemon-demo',
  imports: [RouterLink],
  templateUrl: './pokemon-demo.html',
  styleUrl: './pokemon-demo.scss',
})
export class PokemonDemo implements OnInit {
  private pokemonService = inject(PokemonService);

  protected readonly query = signal('ditto');
  protected readonly loading = signal(false);
  protected readonly errorMessage = signal<string | null>(null);
  protected readonly pokemon = signal<Pokemon | null>(null);

  ngOnInit(): void {
    // Load a default Pokémon on entry, so the page isn't empty on first visit.
    // Carga un Pokémon por defecto al entrar, para que la página no esté vacía la primera vez.
    this.search();
  }

  search(): void {
    const name = this.query();
    if (!name.trim()) {
      return;
    }

    this.loading.set(true);
    this.errorMessage.set(null);

    // The component is the one that subscribes — the service never does.
    // El componente es quien se suscribe — el servicio nunca lo hace.
    this.pokemonService.getPokemon(name).subscribe({
      next: (result) => {
        this.pokemon.set(result);
        this.loading.set(false);
      },
      error: (err: Error) => {
        this.errorMessage.set(err.message);
        this.pokemon.set(null);
        this.loading.set(false);
      },
    });
  }

  protected spriteUrl(p: Pokemon): string | null {
    return p.sprites.other['official-artwork'].front_default ?? p.sprites.front_default;
  }
}
