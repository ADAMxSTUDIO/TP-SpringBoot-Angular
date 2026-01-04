import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Category as CategoryModel } from '../model/category.type';

@Injectable({
  providedIn: 'root',
})
export class Category {
  private http = inject(HttpClient);
  private categoryUrl = environment.apiUrl + '/categories';
  
  get() {
    return this.http.get<CategoryModel[]>(this.categoryUrl);
  }

  getById(id: number) { 
    return this.http.get<CategoryModel>(`${this.categoryUrl}/${id}`);
  }

  create(c: CategoryModel) {
    return this.http.post(this.categoryUrl, c);
  }

  update(id: number, c: CategoryModel) { 
    return this.http.put(`${this.categoryUrl}/${id}`, c); 
  }

  delete(id: number) { 
    return this.http.delete(`${this.categoryUrl}/${id}`); 
  }
}
