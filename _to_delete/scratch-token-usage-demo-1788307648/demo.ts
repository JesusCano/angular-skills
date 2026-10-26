import { Component, InjectionToken, inject, ApplicationConfig } from '@angular/core';

interface AppConfig { apiUrl: string; featureFlagX: boolean; }

export const APP_CONFIG = new InjectionToken<AppConfig>('APP_CONFIG');

// 1) main.ts — where you actually hand Angular the real value for the token.
// This is the ONLY place the real apiUrl/featureFlagX values get written.
const appConfig: ApplicationConfig = {
  providers: [
    { provide: APP_CONFIG, useValue: { apiUrl: 'https://api.example.com', featureFlagX: true } },
  ],
};

// 2) Any component (or service) just asks for it by the token — same as inject(HttpClient).
@Component({ selector: 'app-widget', template: '<p>{{ config.apiUrl }}</p>' })
class WidgetComponent {
  protected config = inject(APP_CONFIG);

  ngOnInit() {
    if (this.config.featureFlagX) {
      console.log('feature X is on, calling', this.config.apiUrl);
    }
  }
}

void appConfig;
