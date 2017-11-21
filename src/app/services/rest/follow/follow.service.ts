import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../../../app.config';
import { StorageService } from '../../storage/storage.service';
import { Observable } from 'rxjs/Observable';
import { UsersResponse, LoginCallback } from '../models';

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
        const token = storageData.sessionToken;
        headers.append('Authorization', 'Bearer ' + token);

        this.http.put(this.config.apiEndpoint + '/1.0/friendships/create.json', null, {headers: headers})
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
        const token = storageData.sessionToken;
        headers.append('Authorization', 'Bearer ' + token);

        this.http.put(this.config.apiEndpoint + '/1.0/unfollow/' + displayName, null, {headers: headers})
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
        const token = storageData.sessionToken;
        const id = storageData.id;
        const displayName = storageData.userId;
        this.http.get<UsersResponse>(this.config.apiEndpoint + '/1.0/following/' + displayName + '?token=' + token)
        .subscribe((resp: UsersResponse) => {

          if (resp.users === null) {
            observer.next(false);
          } else {
            resp.users.map(user => {
              if (user.displayName === to) {
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

    checFollowup(displayName: string): Observable<boolean> {
      return new Observable(observer => {
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        const storageData: LoginCallback = this.storageService.fetch('user');
        const id = storageData.id;
        const token = storageData.sessionToken;
        
        this.http.get<UsersResponse>(this.config.apiEndpoint + '/1.0/follower/' + displayName + '?token=' + token)
        .subscribe(resp => {
          if (resp.users === null) {
            observer.next(false);
          } else {
            resp.users.map(user => {
              if (user.id === id) {
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
