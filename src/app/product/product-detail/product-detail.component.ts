import { Component, OnInit } from '@angular/core';
import { IProduct } from '../product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ProductsApiService } from '../../services/products-api.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent implements OnInit {
  public product?: IProduct;

  constructor(
    private productService: ProductService,
    private productApiService: ProductsApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  public ngOnInit(): void {
    const id: string | null = this.activatedRoute.snapshot.paramMap.get('id');
    this.productApiService
      .getProductById(Number(id))
      .subscribe((product: IProduct) => {
        console.log(product);
        this.product = product;
      });
  }
  public deleteProduct(id: number | undefined): void {
    this.productApiService.deleteProductBy(id).subscribe();
    this.router.navigate(['']);
  }

  editProduct(id: number | undefined): void {
    this.router.navigate(['/product-create', id]);
  }
  public goBack(): void {
    this.router.navigate(['']);
  }
}
