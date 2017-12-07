import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {Post, LoginCallback, User} from '../models';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { StorageService } from '../../storage/storage.service';
import {observable} from 'rxjs/symbol/observable';
import {Subject} from 'rxjs/Subject';
import { WebSocketService } from '../../websocket/web-socket.service';
import { LikeService } from '../like/like.service';
import { environment } from '../../../../environments/environment';

@Injectable()
export class PostService extends WebSocketService {

  private authenticated = false;

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    private wsService: WebSocketService,
    private likeService: LikeService) {
      super();
    }

    private url(endpoint: string): string {
      const storageData: LoginCallback = this.storageService.fetch('user');
      const token = storageData.session_token;
      return environment.wsEndpoint + '/statuses/' + endpoint + '.json' + '?token=' + token;
    }

    private demoUrl(endpoint: string): string {
      return environment.wsEndpoint + '/demo/' + endpoint + '.json';
    }

    listen(): Observable<any> {
      return new Observable<Post>(observer => {
        this.wsService.connect(this.url('realtime'))
        .subscribe((response: MessageEvent) => {
          const post = JSON.parse(response.data) as Post;
          if (post.user.profile_image_url === '') {
            post.user.profile_image_url = '/assets/img/logo.png';
          }

          post.favorited = this.likeService.isLiked(post);

          observer.next(post);
        });
      });
    }
    listenUnion(): Observable<Post> {
      return new Observable<Post>(observer => {
        this.wsService.connect(this.url('union'))
        .subscribe((response: MessageEvent) => {
          const post = JSON.parse(response.data) as Post;
          if (post.user.profile_image_url === '') {
            post.user.profile_image_url = '/assets/img/logo.png';
          }

          post.favorited = this.likeService.isLiked(post);

          observer.next(post);
      });
    });
  }
  listenSample(): Observable<Post> {
    return new Observable<Post>(observer => {
      this.wsService.connect(this.demoUrl('stream'))
      .subscribe((response: MessageEvent) => {
        const post = JSON.parse(response.data) as Post;
        if (post.user.profile_image_url === '') {
          post.user.profile_image_url = '/assets/img/sample.svg';
        }

        observer.next(post);
    });
  });
}

  post(text: string): Observable<any> {
    return new Observable(obs => {
      const storageData: LoginCallback = this.storageService.fetch('user');
      const header = new HttpHeaders().set('Authorization', 'Bearer ' + storageData.session_token);
      const body = {'status': text};
      this.http.post(environment.apiEndpoint + '/statuses/update.json', body, {headers: header})
      .subscribe((resp: Post) => {
        obs.next(resp);
      }, (err: HttpErrorResponse) => {
        obs.error(err.error);
      });
    });
  }

  getPosts(screenName: string): Observable<Post[]> {
    return new Observable<Post[]>(observer => {
      const storageData: LoginCallback = this.storageService.fetch('user');
      this.http.get<Post[]>(environment.apiEndpoint +
          '/statuses/list.json?token=' + storageData.session_token +
          '&screen_name=' + screenName)
        .subscribe((posts: Post[]) => {
          if (posts !== null) {
            posts = posts.map(post => {
              if (post.user.profile_image_url === '') {
                post.user.profile_image_url = '/assets/img/logo.png';
              }

              post.favorited = this.likeService.isLiked(post);

              return post;
            }).reverse();
          }
          observer.next(posts);
        }, (err: HttpErrorResponse) => {
          observer.error(err);
        });
    });
  }

  getHomePosts(): Observable<Post[]> {
    return new Observable<Post[]>(observer => {
      const storageData: LoginCallback = this.storageService.fetch('user');
      this.http.get<Post[]>(environment.apiEndpoint +
          '/statuses/home.json?token=' + storageData.session_token)
        .subscribe((posts: Post[]) => {
          if (posts !== null) {
            posts = posts.map(post => {
              if (post.user.profile_image_url === '') {
                post.user.profile_image_url = '/assets/img/logo.png';
              }

              post.favorited = this.likeService.isLiked(post);

              return post;
            });
          }
          observer.next(posts);
        }, (err: HttpErrorResponse) => {
          observer.error(err);
        });
    });
  }
}
