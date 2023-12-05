import { Component, OnInit } from '@angular/core';
import { IProduct, Product } from '../product.model';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsApiService } from '../../services/products-api.service';
import { ITag } from '../../tag/tag.model';
import { TagsApiService } from '../../services/tags-api.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
})
export class ProductFormComponent implements OnInit {
  public newProduct: IProduct = new Product(0, '', '');
  public tags: ITag[] = [];
  public choosenTags: ITag[] = [];
  public ngOnInit(): void {
    const id: string | null = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.productApiService.getProductById(Number(id)).subscribe(
        (product: IProduct) => {
          this.newProduct = product;
        },
        (error: any) => {
          this.router.navigate(['']);
        }
      );
    }
    this.tagApiService.getTags().subscribe((tags: ITag[]) => {
      console.log(tags);
      this.tags = tags;
    });
  }

  constructor(
    private tagApiService: TagsApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private productApiService: ProductsApiService
  ) {}

  public addProduct(): void {
    if (
      this.newProduct.price === 0 ||
      !this.newProduct.description ||
      !this.newProduct.title
    )
      throw new Error('trying to create empty products');
    if (this.newProduct.price < 0) throw new Error('Price can`t be negative!');
    if (this.newProduct.stock < 0) throw new Error('Stock can`t be negative');

    if (this.newProduct.id && this.newProduct.id !== 0) {
      this.productApiService
        .updateProduct(this.newProduct.id, this.newProduct)
        .subscribe();
    } else {
      this.productApiService.addProduct(this.newProduct).subscribe();
    }
    this.goBack();
  }

  public goBack(): void {
    this.router.navigate(['']);
  }

  updateTags(tagId: number | undefined): void {
    if (this.choosenTags.filter((tag) => tag.id === tagId).length !== 0) {
      this.choosenTags = this.choosenTags.filter((tag) => tag.id !== tagId);
    } else {
      this.tagApiService.getTagById(tagId).subscribe((tag) => {
        this.choosenTags.push(tag);
      });
    }
    this.newProduct.tags = this.choosenTags;
  }
}
