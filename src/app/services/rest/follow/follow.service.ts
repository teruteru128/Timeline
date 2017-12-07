import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { StorageService } from '../../storage/storage.service';
import { Observable } from 'rxjs/Observable';
import { LoginCallback, User, Post } from '../models';
import { environment } from '../../../../environments/environment';

@Injectable()
export class FollowService {

  constructor(
    private http: HttpClient,
    private storageService: StorageService) {}

    follow(displayName: string): Observable<Post> {
      return new Observable(observer => {
        const storageData: LoginCallback = this.storageService.fetch('user');
        const header = new HttpHeaders().set('Authorization', 'Bearer ' + storageData.session_token);
        const body = {
          'screen_name': displayName
        };

        this.http.post(environment.apiEndpoint + '/friendships/create.json', body, {headers: header})
        .subscribe((resp: Post) => {
          observer.next(resp);
        }, (err: HttpErrorResponse) => {
          observer.error(err.error);
        });
      });
    }

    unfollow(displayName: string): Observable<Post> {
      return new Observable(observer => {
        const storageData: LoginCallback = this.storageService.fetch('user');
        const header = new HttpHeaders().set('Authorization', 'Bearer ' + storageData.session_token);
        const body = {
          'screen_name': displayName
        };

        this.http.post(environment.apiEndpoint + '/friendships/destroy.json', body, {headers: header})
        .subscribe((resp: Post) => {
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
        this.http.get<User[]>(environment.apiEndpoint + '/friends/list.json?token=' + token + '&screen_name=' + storageData.screen_name)
        .subscribe((resp: User[]) => {
          if (resp === null) {
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

    checkFollowers(displayName: string): Observable<boolean> {
      return new Observable(observer => {
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        const storageData: LoginCallback = this.storageService.fetch('user');
        const myId = storageData.id;
        const token = storageData.session_token;

        this.http.get<User[]>(environment.apiEndpoint + '/followers/list.json?token=' + token + '&screen_name=' + displayName)
        .subscribe((resp: User[]) => {
          if (resp === null) {
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
