import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';
import { map, Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  apiUrlProducts = `${environment.apiURL}/products`;

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrlProducts);
  }

  getProduct(productId: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrlProducts}/${productId}`);
  }

  createProduct(product: FormData): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrlProducts}/`, product);
  }

  updateProduct(product: FormData, productId: string): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrlProducts}/${productId}`, product);
  }

  delete(productId: string): Observable<object> {
    return this.http.delete<object>(`${this.apiUrlProducts}/${productId}`);
  }

  getProductsCount(): Observable<number> {
    return this.http
      .get<number>(`${this.apiUrlProducts}/get/count`)
      .pipe(map((objectValue: any) => objectValue.productCount));
  }
}
