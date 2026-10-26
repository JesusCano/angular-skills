import { Injectable, Component, inject } from '@angular/core';
import { HttpClient, HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

interface User { id: number; name: string; }

// The interceptor runs for EVERY request, before it reaches any service.
// It can transform the error here — e.g. attach a friendly message — before anyone downstream sees it.

// El interceptor corre para CADA request, antes de llegar a cualquier servicio.
// Puede transformar el error aquí — p. ej. agregar un mensaje amigable — antes de que alguien más lo vea.
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      const friendly = err.status === 404 ? 'Resource not found' : 'Unexpected server error';
      return throwError(() => new Error(friendly));
    })
  );
};

// The service does NOT subscribe. It just returns the Observable as-is —
// whatever the interceptor produced (clean data, or the transformed error) passes straight through.

// El servicio NO se suscribe. Solo regresa el Observable tal cual —
// lo que haya producido el interceptor (data limpia, o el error ya transformado) pasa directo.
@Injectable({ providedIn: 'root' })
class UserService {
  private http = inject(HttpClient);

  getAll() {
    return this.http.get<User[]>('/api/users');
  }
}

// The component is the one that subscribes, and receives either the data
// or the already-friendly error message from the interceptor.

// El componente es quien se suscribe, y recibe la data
// o el mensaje de error ya amigable que vino del interceptor.
@Component({ selector: 'app-user-list', template: '<p>users</p>' })
class UserListComponent {
  private userService = inject(UserService);
  errorMessage = '';
  users: User[] = [];

  ngOnInit() {
    this.userService.getAll().subscribe({
      next: (users) => (this.users = users),
      error: (err: Error) => (this.errorMessage = err.message),
    });
  }
}
