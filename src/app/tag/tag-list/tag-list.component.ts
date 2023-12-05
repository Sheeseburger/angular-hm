import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ProductsApiService } from '../../services/products-api.service';
import { ITag } from '../tag.model';
import { TagsApiService } from '../../services/tags-api.service';

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrl: './tag-list.component.scss',
})
export class TagListComponent implements OnInit {
  public tags$: Observable<ITag[]> = this.tagApiService.getTags();
  public tags: ITag[] | undefined;

  constructor(
    private tagApiService: TagsApiService,
    private router: Router,
    private productApiService: ProductsApiService
  ) {}

  public ngOnInit(): void {
    this.tagApiService.getTags().subscribe((tags) => (this.tags = tags));
  }

  public deleteTag(id: number | undefined): void {
    this.tagApiService.deleteTagById(id).subscribe();
    window.location.reload();
  }
  public navigateToProducts(): void {
    this.router.navigate(['']);
  }
  public navigateToCreateTag(): void {
    this.router.navigate(['tag-create']);
  }
  public navigateToEditTag(id: number | undefined): void {
    this.router.navigate(['tag-create', id]);
  }
}
