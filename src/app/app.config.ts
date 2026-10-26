import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors, withFetch } from '@angular/common/http';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { APP_CONFIG } from './core/app-config';
import { pokeApiErrorInterceptor } from './core/pokeapi-error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes), provideClientHydration(withEventReplay()),
    // Real value for the APP_CONFIG token — the ONLY place the actual PokeAPI URL is written.
    // Valor real para el token APP_CONFIG — el ÚNICO lugar donde se escribe la URL real de PokeAPI.
    { provide: APP_CONFIG, useValue: { pokeApiUrl: 'https://pokeapi.co/api/v2' } },
    provideHttpClient(withFetch(), withInterceptors([pokeApiErrorInterceptor])),
  ]
};
