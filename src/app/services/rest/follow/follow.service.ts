import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../../../app.config';
import { StorageService } from '../../storage/storage.service';
import { Observable } from 'rxjs/Observable';
import { LoginCallback, User } from '../models';

@Injectable()
export class FollowService {

  constructor(
    private http: HttpClient,
    @Inject(APP_CONFIG) private config: AppConfig,
    private storageService: StorageService) {}

    follow(displayName: string): Observable<any> {
      return new Observable(observer => {
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        const storageData: LoginCallback = this.storageService.fetch('user');
        const token = storageData.session_token;
        headers.append('Authorization', 'Bearer ' + token);
        const body = {
          'user_id': storageData.id
        };

        this.http.put(this.config.apiEndpoint + '/1.0/friendships/create.json', body, {headers: headers})
        .subscribe(resp => {
          observer.next(resp);
        }, (err: HttpErrorResponse) => {
          observer.error(err.error);
        });
      });
    }

    unfollow(displayName: string): Observable<any> {
      return new Observable(observer => {
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        const storageData: LoginCallback = this.storageService.fetch('user');
        const token = storageData.session_token;
        headers.append('Authorization', 'Bearer ' + token);
        const body = {
          'user_id': storageData.id
        };

        this.http.put(this.config.apiEndpoint + '/1.0/friendships/destroy.json', body, {headers: headers})
        .subscribe(resp => {
          observer.next(resp);
        }, (err: HttpErrorResponse) => {
          observer.error(err.error);
        });
      });
    }

    checkFollowing(to: string): Observable<boolean> {
      return new Observable(observer => {
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        const storageData: LoginCallback = this.storageService.fetch('user');
        const token = storageData.session_token;
        const id = storageData.id;
        const displayName = storageData.screen_name;
        this.http.get<User[]>(this.config.apiEndpoint + '/1.0/friends/list.json?token=' + token + '&screen_name=' + to)
        .subscribe((resp: User[]) => {

          if (resp.length === 0) {
            observer.next(false);
          } else {
            resp.map(user => {
              if (user.screen_name === to) {
                observer.next(true);
                return;
              }
              observer.next(false);
            });
          }
        }, (err: HttpErrorResponse) => {
          observer.error(err.error);
        });
      });
    }

    checkFollowup(displayName: string): Observable<boolean> {
      return new Observable(observer => {
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        const storageData: LoginCallback = this.storageService.fetch('user');
        const myId = storageData.id;
        const token = storageData.session_token;

        this.http.get<User[]>(this.config.apiEndpoint + '/1.0/followers/list.json?token=' + token + '&screen_name=' + displayName)
        .subscribe((resp: User[]) => {
          if (resp.length === 0) {
            observer.next(false);
          } else {
            resp.map(user => {
              if (user.id === myId) {
                observer.next(true);
                return;
              }
              observer.next(false);
            });
          }
        }, (err: HttpErrorResponse) => {
          observer.error(err.error);
        });
      });
    }
}
