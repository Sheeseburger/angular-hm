import { Component, OnInit } from '@angular/core';
import { ITag, Tag } from '../tag.model';
import { ActivatedRoute, Router } from '@angular/router';
import { TagsApiService } from '../../services/tags-api.service';

@Component({
  selector: 'app-tag-form',
  templateUrl: './tag-form.component.html',
  styleUrl: './tag-form.component.scss',
})
export class TagFormComponent implements OnInit {
  public newTag: ITag = new Tag('', '');

  public ngOnInit(): void {
    const id: string | null = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.tagApiService.getTagById(Number(id)).subscribe(
        (tag: ITag) => {
          this.newTag = tag;
        },
        (error: any) => {
          this.router.navigate(['']);
        }
      );
    }
  }

  constructor(
    private tagApiService: TagsApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  public addTag(): void {
    if (!this.newTag.name) {
      throw new Error('Cant create empty tag');
    }
    if (this.newTag.id && this.newTag.id !== 0) {
      this.tagApiService.updateTag(this.newTag).subscribe();
    } else {
      this.tagApiService.addTag(this.newTag).subscribe();
    }
    this.goBack();
  }

  public goBack(): void {
    this.router.navigate(['']);
  }

  // updateTags(tagId: number | undefined): void {
  //   if( this.choosenTags.filter(tag => tag.id === tagId).length !== 0){
  //     this.choosenTags = this.choosenTags.filter(tag => tag.id !== tagId);
  //   } else {
  //     this.tagApiService.getTagById(tagId).subscribe(tag =>{
  //       this.choosenTags.push(tag);
  //     });
  //   }
  //   this.newProduct.tags = this.choosenTags;
  // }
}
