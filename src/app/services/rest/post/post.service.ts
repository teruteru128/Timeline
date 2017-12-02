import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {Post, LoginCallback, User} from '../models';
import { APP_CONFIG, AppConfig } from '../../../app.config';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { StorageService } from '../../storage/storage.service';
import { SocketIOService } from '../../socketio/socket-io.service';
import {observable} from 'rxjs/symbol/observable';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class PostService extends SocketIOService {

  private authenticated = false;

  constructor(
    private http: HttpClient,
    private sio: SocketIOService,
    @Inject(APP_CONFIG) private config: AppConfig,
    private storageService: StorageService) {
      super();
    }

    connect(): Observable<boolean> {
      return new Observable<boolean>(observer => {
        this.sio.connect(this.config.apiEndpoint);
        const storageData: LoginCallback = this.storageService.fetch('user');
        const token = storageData.session_token;
        this.sio.emit('authenticate', token);
        this.sio.on('authenticated').subscribe(() => {
          console.log('Streaming API connected');
          this.authenticated = true;
          observer.next(true);
        });
        this.sio.on('unauthorized').subscribe((err) => {
          console.error('Socket unauthorized: ' + JSON.stringify(err));
          if (err === 'invalid jwt token' || err === 'not found') {
            // 利用資格がないため認可情報を消去
            this.storageService.delete('user');
          }
          observer.error(err);
        });
      });

    }

    listen(): Observable<any> {
      return new Observable<Post>(observer => {
        const storageData: LoginCallback = this.storageService.fetch('user');
        const id = storageData.id;

        if (!this.authenticated) {
          this.connect().subscribe(flag => {
            if (!flag) {
              observer.error();
            }
          });
        }

        this.sio.on('home').subscribe((dat: string) => {
          const post = JSON.parse(dat);
          post.user.profile_image_url = '/assets/img/logo.png';
          observer.next(post);
        });
      });
    }
    listenUnion(): Observable<Post> {
      return new Observable<Post>(observer => {
        this.sio.connect(this.config.apiEndpoint);
        const storageData: LoginCallback = this.storageService.fetch('user');
        const token = storageData.session_token;
        this.sio.emit('authenticate', token);
        this.sio.on('authenticated').subscribe(() => {
          console.log('UNION Streaming API connected');
          this.sio.on('union').subscribe((dat: string) => {
            const post = JSON.parse(dat);
            post.user.profile_image_url = '/assets/img/logo.png';
            observer.next(post);
          });
        });
        this.sio.on('unauthorized').subscribe((err) => {
          console.error('Socket unauthorized: ' + JSON.stringify(err));
          if (err === 'invalid jwt token' || err === 'not found') {
            // 利用資格がないため認可情報を消去
            this.storageService.delete('user');
          }
          observer.error(err);
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
            post.user.profile_image_url = '/assets/img/logo.png';
            return post;
          }).reverse();
          observer.next(posts);
        }, (err: HttpErrorResponse) => {
          observer.error(err);
        });
    });
  }
}
