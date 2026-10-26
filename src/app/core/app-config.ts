import { InjectionToken } from '@angular/core';

// Small, app-wide config values that are NOT secrets — safe to ship inside
// the compiled bundle. See CLAUDE.md / Phase 00 (DI fundamentals) for why
// this uses InjectionToken instead of the AppConfig interface directly.

// Valores de configuración pequeños y globales de la app que NO son secretos
// — seguros de incluir dentro del bundle compilado. Ver CLAUDE.md / Phase 00
// (fundamentos de DI) para entender por qué se usa InjectionToken en vez de
// la interfaz AppConfig directamente.
export interface AppConfig {
  pokeApiUrl: string;
}

export const APP_CONFIG = new InjectionToken<AppConfig>('APP_CONFIG');
