import { Injectable, InjectionToken, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface AppConfig { apiUrl: string; environment: 'development' | 'production'; }
const APP_CONFIG = new InjectionToken<AppConfig>('APP_CONFIG');

interface User { id: number; name: string; }

// The service injects BOTH HttpClient (to make the call) and APP_CONFIG
// (to know the base URL) — it never hardcodes a URL itself.
@Injectable({ providedIn: 'root' })
class UserService {
  private http = inject(HttpClient);
  private config = inject(APP_CONFIG);

  getAllUsers() {
    // Builds the final URL by combining the injected base with the specific path.
    // In development: http://localhost:3000/api/users
    // In production:  https://api.example.com/users
    return this.http.get<User[]>(`${this.config.apiUrl}/users`);
  }
}
