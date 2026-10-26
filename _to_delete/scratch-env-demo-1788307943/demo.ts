import { InjectionToken, ApplicationConfig } from '@angular/core';

interface AppConfig { apiUrl: string; environment: 'development' | 'production'; }
const APP_CONFIG = new InjectionToken<AppConfig>('APP_CONFIG');

// Option A — runtime detection: check WHERE the app is running right now,
// no separate build needed.
function resolveConfig(hostname: string): AppConfig {
  const isDev = hostname === 'localhost' || hostname === '127.0.0.1';
  return {
    environment: isDev ? 'development' : 'production',
    apiUrl: isDev ? 'http://localhost:3000/api' : 'https://api.example.com',
  };
}

const appConfig: ApplicationConfig = {
  providers: [
    { provide: APP_CONFIG, useValue: resolveConfig(window.location.hostname) },
  ],
};

void appConfig;
