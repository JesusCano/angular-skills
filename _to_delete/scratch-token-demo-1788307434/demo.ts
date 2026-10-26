import { Component, InjectionToken, inject, Provider } from '@angular/core';

interface AppConfig { apiUrl: string; featureFlagX: boolean; }

// The token is a runtime OBJECT that acts as the "lookup key" the injector uses.
// The <AppConfig> generic is compile-time only — it tells TypeScript what type
// comes back when you call inject(APP_CONFIG), but it does NOT exist at runtime.
export const APP_CONFIG = new InjectionToken<AppConfig>('APP_CONFIG');

// You provide a real value for that key wherever you configure providers
// (e.g. in bootstrapApplication's providers array, in main.ts).
const appConfigProvider: Provider = {
  provide: APP_CONFIG,
  useValue: { apiUrl: 'https://api.example.com', featureFlagX: true } satisfies AppConfig,
};

@Component({ selector: 'app-widget', template: '<p>widget</p>' })
class WidgetComponent {
  // inject(APP_CONFIG) returns a real, typed AppConfig object at runtime.
  private config = inject(APP_CONFIG);

  logUrl() {
    console.log(this.config.apiUrl);
  }
}
