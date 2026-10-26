import { Component, inject } from '@angular/core';

interface AppConfig { apiUrl: string; featureFlagX: boolean; }

@Component({ selector: 'app-widget-fail', template: '<p>widget</p>' })
class WidgetComponentFail {
  // Trying to use the interface itself as the injection key — this is what
  // people instinctively try first, and it fails, which is exactly why InjectionToken exists.
  private config = inject(AppConfig);
}
