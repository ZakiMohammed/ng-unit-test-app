import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private url: string = environment.apiUrl + 'posts/';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Post[]>(this.url + '?userId=1');
  }

  get(id: number) {
    return this.http.get<Post>(this.url + id);
  }
}
