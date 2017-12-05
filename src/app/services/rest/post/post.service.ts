import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {Post, LoginCallback, User} from '../models';
import { APP_CONFIG, AppConfig } from '../../../app.config';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { StorageService } from '../../storage/storage.service';
import {observable} from 'rxjs/symbol/observable';
import {Subject} from 'rxjs/Subject';
import { WebSocketService } from '../../websocket/web-socket.service';

@Injectable()
export class PostService {

  private authenticated = false;

  constructor(
    private http: HttpClient,
    @Inject(APP_CONFIG) private config: AppConfig,
    private storageService: StorageService,
    private wsService: WebSocketService) {
    }

    private url(endpoint: string): string {
      const storageData: LoginCallback = this.storageService.fetch('user');
      const token = storageData.session_token;
    return this.config.wsEndpoint + '/statuses/' + endpoint + '.json' + '?token=' + token;
    }

    listen(): Observable<any> {
      return new Observable<Post>(observer => {
        this.wsService.connect(this.url('realtime'))
        .subscribe((response: MessageEvent) => {
          const post = JSON.parse(response.data) as Post;
          if (post.user.profile_image_url === '') {
            post.user.profile_image_url = '/assets/img/logo.png';
          }
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
          observer.next(post);
      });
    });
  }

  post(text: string): Observable<any> {
    return new Observable(obs => {
      const storageData: LoginCallback = this.storageService.fetch('user');
      const header = new HttpHeaders().set('Authorization', 'Bearer ' + storageData.session_token);
      const body = {'status': text};
      this.http.post(this.config.apiEndpoint + '/1.0/statuses/update.json', body, {headers: header})
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
      this.http.get<Post[]>(this.config.apiEndpoint +
          '/1.0/statuses/list.json?token=' + storageData.session_token +
          '&screen_name=' + storageData.id)
        .subscribe((posts: Post[]) => {
          posts = posts.map(post => {
            if (post.user.profile_image_url === '') {
              post.user.profile_image_url = '/assets/img/logo.png';
            }
            return post;
          }).reverse();
          observer.next(posts);
        }, (err: HttpErrorResponse) => {
          observer.error(err);
        });
    });
  }
}
