import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { StorageService } from '../../storage/storage.service';
import { User, LoginCallback } from '../models';
import { AppConfig, APP_CONFIG } from '../../../app.config';

@Injectable()
export class UserService {

  constructor(
    private http: HttpClient,
    @Inject(APP_CONFIG) private config: AppConfig,
    private storageService: StorageService) {}

  getUserByName(userName: string): Observable<User> {
    return new Observable(obs => {
      this.http.get<User>(this.config.apiEndpoint + '/v1/users/' + userName)
      .subscribe(resp => {
        obs.next(resp);
      }, (err: HttpErrorResponse) => {
        obs.error(err.error);
      });
    });
  }

  getUserById(permId: number): Observable<User> {
    return new Observable(obs => {
      this.http.get<User>(this.config.apiEndpoint + '/v1/users/' + permId)
      .subscribe(resp => {
        obs.next(resp);
      }, (err: HttpErrorResponse) => {
        obs.error(err.error);
      });
    });
  }

  login(userName: string, password: string): Observable<LoginCallback> {
    const claim = {name: userName, password: password};
    return new Observable<LoginCallback>(obs => {
      this.http.post<LoginCallback>(this.config.apiEndpoint + '/v1/auth', claim)
        .subscribe((resp: LoginCallback) => {
          this.storageService.store('token', resp.sessionToken);
          obs.next(resp);
        }, (err: HttpErrorResponse) => {
          obs.error(err.error);
        });
    });
  }

  logout() {
    this.storageService.clear('token');
  }

}
