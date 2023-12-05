import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { ITag } from '../tag/tag.model';
import { ProductsApiService } from './products-api.service';
@Injectable({
  providedIn: 'root',
})
export class TagsApiService {
  private readonly tagURL = 'http://localhost:3000/tags';
  constructor(private http: HttpClient) {}

  public getTags(): Observable<ITag[]> {
    return this.http.get<ITag[]>(this.tagURL);
  }
  public getTagById(id: number | undefined): Observable<ITag> {
    return this.http.get<ITag>(this.tagURL + `/${id}`);
  }
  public updateTag(tag: ITag): Observable<ITag> {
    return this.http.patch<ITag>(this.tagURL + `/${tag.id}`, tag).pipe();
  }
  public addTag(tag: ITag): Observable<ITag> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<ITag>(this.tagURL, tag, { headers }).pipe();
  }
  public deleteTagById(id: number | undefined): Observable<ITag> {
    return this.http.delete<ITag>(this.tagURL + `/${id}`);
  }
}
