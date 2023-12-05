import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IProduct } from '../product/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly _products$: BehaviorSubject<IProduct[]> = new BehaviorSubject<IProduct[]>([]);
  public readonly products$ = this._products$.asObservable()

  get products(): IProduct[]{
    return this._products$.getValue();
  }
  private set products(products: IProduct[]){
    this._products$.next(products)
  }
  public setProducts(products: IProduct[]): void{
    this.products = products;
  }

  public addProduct(newProduct: IProduct): void{
    this.products = [...this.products, newProduct]
  }

  public getProductById(id: number): IProduct | undefined{
    return this.products.find(p => p.id === id);
  }
  public deleteProductBy(id: number | undefined): void {
    const updatedProducts = this.products.filter(p => p.id !== id);
    this.products = updatedProducts;
  }
}
