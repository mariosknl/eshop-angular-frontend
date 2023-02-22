import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>('http://localhost:3000/api/v1/categories/');
  }

  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>('http://localhost:3000/api/v1/categories/', category);
  }
}
