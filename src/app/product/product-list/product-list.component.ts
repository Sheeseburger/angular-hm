import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IProduct, Product } from '../product.model';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ProductsApiService } from '../../services/products-api.service';
import { TagsApiService } from '../../services/tags-api.service';
import { ITag } from '../../tag/tag.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent implements OnInit {
  public products$: Observable<IProduct[]> = this.productService.products$;
  public tags!: ITag[];
  public selectedProduct: IProduct | undefined;
  public filterTags: ITag[] = [];
  constructor(
    private productService: ProductService,
    private router: Router,
    private productApiService: ProductsApiService,
    private tagApiService: TagsApiService
  ) {
    this.tagApiService.getTags().subscribe((tags: ITag[]) => {
      this.tags = tags;
    });
  }

  public ngOnInit(): void {
    this.productApiService
      .getProducts()
      .subscribe((products) => this.productService.setProducts(products));
  }

  public deleteProduct(id: number | undefined): void {
    this.productApiService.deleteProductBy(id).subscribe();
    window.location.reload();
  }
  public navigateToCreate(): void {
    this.router.navigate(['product-create']);
  }
  public navigateToCreateTag(): void {
    this.router.navigate(['tag-create']);
  }
  public navigateToListTage(): void {
    this.router.navigate(['tags']);
  }

  public navigateToProduct(id: number | undefined): void {
    this.router.navigate(['/product', id]);
  }

  public applyTagFilter(tag?: ITag): void {
    const index: number = this.filterTags.findIndex(
      (filterTag) => filterTag.id === tag?.id
    );

    if (index !== -1) this.filterTags.splice(index, 1);
    else {
      if (tag) this.filterTags.push(tag);
    }

    this.products$ = this.productService.products$.pipe(
      map((products) =>
        products.filter((product) =>
          this.filterTags.every((filterTag) =>
            product.tags?.some((t) => t.id === filterTag.id)
          )
        )
      )
    );
  }
  public isTagFiltered(tag: ITag): boolean {
    return this.filterTags.some((filterTag) => filterTag.id === tag.id);
  }
  public freeFilters() {
    this.filterTags = [];
    this.applyTagFilter();
  }
}
