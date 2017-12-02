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
    private storageService: StorageService) { }

  getUserById(userId: string): Observable<User> {
    return new Observable(obs => {
      const storageData: LoginCallback = this.storageService.fetch('user');
      this.http.get<User>(this.config.apiEndpoint + '/1.0/users/show.json?token=' + storageData.session_token + '&screen_name=' + userId)
        .subscribe(resp => {
          if (resp.profile_image_url === '') {
            resp.profile_image_url = '/assets/img/logo.png';
          }
          obs.next(resp);
        }, (err: HttpErrorResponse) => {
          obs.error(err.error);
        });
    });
  }

  login(userId: string, password: string): Observable<LoginCallback> {
    const claim = { id: userId, password: password };
    return new Observable<LoginCallback>(obs => {
      this.http.post<LoginCallback>(this.config.apiEndpoint + '/1.0/account/login.json', claim)
        .subscribe((resp: LoginCallback) => {
          if (resp.id === undefined && resp.session_token === undefined) {
            obs.error();
            return;
          }

          this.storageService.store('user', resp);
          obs.next(resp);
        }, (err: HttpErrorResponse) => {
          obs.error(err.error);
        });
    });
  }

  signup(userId: string, email: string, password: string): Observable<MessageResponse> {
    const claim = { id: userId, email: email, password: password };
    return new Observable<MessageResponse>(obs => {
      this.http.post<MessageResponse>(this.config.apiEndpoint + '/1.0/account/create.json', claim)
        .subscribe((resp: MessageResponse) => {
          obs.next(resp);
        }, (err: HttpErrorResponse) => {
          obs.error(err.error);
        });
    });
  }

  searchUser(query): Observable<User[]> {
    return new Observable<User[]>(obs => {
      const storageData: LoginCallback = this.storageService.fetch('user');
      const url = this.config.apiEndpoint + '/1.0/search/user.json?token=' + storageData.session_token + '&query=' + query;
      this.http.get<User[]>(url)
      .subscribe((resp: User[]) => {
          if (resp.length !== 0) {
            resp = resp.map(user => {
              if (user.profile_image_url === '') {
                user.profile_image_url = '/assets/img/logo.png';
                return user;
              }
            });
            obs.next(resp);
          }
        }, (err: HttpErrorResponse) => {
          obs.error(err);
        });
    });
  }

  logout() {
    this.storageService.delete('user');
  }

}
