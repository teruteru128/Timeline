import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Post, LoginCallback } from '../models';
import { StorageService } from '../../storage/storage.service';
import { HttpHeaders, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../../../app.config';

@Injectable()
export class LikeService {

  constructor(
    private storageService: StorageService,
    private http: HttpClient,
    @Inject(APP_CONFIG) private config: AppConfig
  ) { }

  like(postID: string): Observable<Post> {
    return new Observable(observer => {
      const storageData: LoginCallback = this.storageService.fetch('user');
      const header = new HttpHeaders().set('Authorization', 'Bearer ' + storageData.session_token);
      const body = {
        'id': postID
      };

      this.http.post(this.config.apiEndpoint + '/1.0/like/create.json', body, {headers: header})
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

      this.http.post(this.config.apiEndpoint + '/1.0/like/destroy.json', body, {headers: header})
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
    post.favorited_ids.map((id: string) => {
      if (storageData.id === id) {
        favorited = true;
      }
    });

    return favorited;
  }

}
