import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { StorageService } from '../../storage/storage.service';
import { User, LoginCallback, MessageResponse } from '../models';
import { AppConfig, APP_CONFIG } from '../../../app.config';

@Injectable()
export class UserService {

  constructor(
    private http: HttpClient,
    @Inject(APP_CONFIG) private config: AppConfig,
    private storageService: StorageService) {}

  getUserById(userId: string): Observable<User> {
    return new Observable(obs => {
      this.http.get<User>(this.config.apiEndpoint + '/v1/users/' + userId)
      .subscribe(resp => {
        obs.next(resp);
      }, (err: HttpErrorResponse) => {
        obs.error(err.error);
      });
    });
  }

  login(userId: string, password: string): Observable<LoginCallback> {
    const claim = {id: userId, password: password};
    return new Observable<LoginCallback>(obs => {
      this.http.post<LoginCallback>(this.config.apiEndpoint + '/v1/login', claim)
        .subscribe((resp: LoginCallback) => {
          if (resp.id === undefined && resp.sessionToken === undefined) {
            obs.error();
            return;
          }

          const user = {
            id: resp.id,
            token: resp.sessionToken
          };
          this.storageService.store('user', [JSON.stringify(user)]);
          obs.next(resp);
        }, (err: HttpErrorResponse) => {
          obs.error(err.error);
        });
    });
  }

  signup(userId: string, email: string, password: string): Observable<MessageResponse> {
    const claim = {id: userId, email: email, password: password};
    return new Observable<MessageResponse>(obs => {
      this.http.post<MessageResponse>(this.config.apiEndpoint + '/v1/signup', claim)
        .subscribe((resp: MessageResponse) => {
          obs.next(resp);
        }, (err: HttpErrorResponse) => {
          obs.error(err.error);
        });
    });
  }

  logout() {
    this.storageService.clear('user');
  }

}
