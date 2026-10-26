import { Injectable, Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Each service is small and owns ONE slice of the API — not one giant file.
// Cada servicio es pequeño y es dueño de UNA porción del API — no un archivo gigante.

interface User { id: number; name: string; }
interface Product { id: number; price: number; }

@Injectable({ providedIn: 'root' })
class UserService {
  private http = inject(HttpClient);

  getAll() {
    return this.http.get<User[]>('/api/users');
  }

  getOne(id: number) {
    return this.http.get<User>(`/api/users/${id}`);
  }
}

@Injectable({ providedIn: 'root' })
class ProductService {
  private http = inject(HttpClient);

  getAll() {
    return this.http.get<Product[]>('/api/products');
  }
}

// A component just injects whichever services it actually needs.
// Un componente simplemente inyecta los servicios que realmente necesita.

@Component({
  selector: 'app-dashboard',
  template: '<p>dashboard</p>',
})
class DashboardComponent {
  private users = inject(UserService);
  private products = inject(ProductService);

  loadEverything() {
    this.users.getAll().subscribe();
    this.products.getAll().subscribe();
  }
}
