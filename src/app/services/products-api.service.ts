import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../product/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsApiService {
  private readonly productURL = 'http://localhost:3000/products';
  constructor(private http: HttpClient) {}

  public getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.productURL);
  }
  public getProductById(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(this.productURL + `/${id}`);
  }

  public addProduct(product: IProduct): Observable<IProduct> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http
      .post<IProduct>(this.productURL, product, { headers })
      .pipe();
  }

  public deleteProductBy(id: number | undefined): Observable<IProduct> {
    console.log(this.productURL + `/${id}`);
    return this.http.delete<IProduct>(this.productURL + `/${id}`).pipe();
  }
  public updateProduct(
    id: number | undefined,
    product: IProduct
  ): Observable<IProduct> {
    return this.http
      .patch<IProduct>(this.productURL + `/${id}`, product)
      .pipe();
  }
}
