import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class Product {
  private http = inject(HttpClient);
  private productUrl = environment.apiUrl + '/products';

  get() { 
    return this.http.get<Product[]>(this.productUrl);
  }

  getById(id: number) { 
    return this.http.get<Product>(`${this.productUrl}/${id}`);
  }

  create(p: Product) {
    return this.http.post(this.productUrl, p);
  }

  update(id: number, p: Product) {
    return this.http.put(`${this.productUrl}/${id}`, p);
  }

  delete(id: number) {
    return this.http.delete(`${this.productUrl}/${id}`);
  }

  getByCategory(categoryId: number) {
    return this.http.get<Product[]>(`${this.productUrl}/${categoryId}`);
  }
}
