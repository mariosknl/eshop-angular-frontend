import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  apiUrlCategories = `${environment.apiURL}/categories`;

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrlCategories);
  }

  getCategory(categoryId: string): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrlCategories}/${categoryId}`);
  }

  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(`${this.apiUrlCategories}/`, category);
  }

  updateCategory(category: Category, categoryId: string): Observable<Category> {
    return this.http.put<Category>(`${this.apiUrlCategories}/${categoryId}`, category);
  }

  delete(categoryId: string): Observable<object> {
    return this.http.delete<object>(`${this.apiUrlCategories}/${categoryId}`);
  }
}
