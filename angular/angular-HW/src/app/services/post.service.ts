import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Post} from '../models/post';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private url = 'https://jsonplaceholder.typicode.com/posts';
  private singlePost = new BehaviorSubject<Post>(null);

  constructor(private httpClient: HttpClient) {

  }

  getPosts(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(this.url);
  }

  getCurrentPost(): Observable<Post> {
    return this.singlePost;
  }

  setNewPost(post): void {
    this.singlePost.next(post);
  }
}
