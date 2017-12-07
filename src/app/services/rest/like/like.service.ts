import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Post, LoginCallback } from '../models';
import { StorageService } from '../../storage/storage.service';
import { HttpHeaders, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable()
export class LikeService {

  constructor(
    private storageService: StorageService,
    private http: HttpClient
  ) { }

  like(postID: string): Observable<Post> {
    return new Observable(observer => {
      const storageData: LoginCallback = this.storageService.fetch('user');
      const header = new HttpHeaders().set('Authorization', 'Bearer ' + storageData.session_token);
      const body = {
        'id': postID
      };

      this.http.post(environment.apiEndpoint + '/like/create.json', body, {headers: header})
      .subscribe((resp: Post) => {
        observer.next(resp);
      }, (err: HttpErrorResponse) => {
        observer.error(err.error);
      });
    });
  }

  dislike(postID: string): Observable<Post> {
    return new Observable(observer => {
      const storageData: LoginCallback = this.storageService.fetch('user');
      const header = new HttpHeaders().set('Authorization', 'Bearer ' + storageData.session_token);
      const body = {
        'id': postID
      };

      this.http.post(environment.apiEndpoint + '/like/destroy.json', body, {headers: header})
      .subscribe((resp: Post) => {
        observer.next(resp);
      }, (err: HttpErrorResponse) => {
        observer.error(err.error);
      });
    });
  }

  isLiked(post: Post): boolean {
    const storageData: LoginCallback = this.storageService.fetch('user');
    let favorited = false;
    if (post.favorited_ids !== null) {
      post.favorited_ids.map((id: string) => {
        if (storageData.id === id) {
          favorited = true;
        }
      });
      return favorited;
    }
    return false;
  }

}
