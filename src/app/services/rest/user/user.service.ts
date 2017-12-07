import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { StorageService } from '../../storage/storage.service';
import { User, LoginCallback, MessageResponse, EditableProfile } from '../models';
import { environment } from '../../../../environments/environment';

@Injectable()
export class UserService {

  constructor(
    private http: HttpClient,
    private storageService: StorageService) { }

  getUserById(userId: string): Observable<User> {
    return new Observable(obs => {
      const storageData: LoginCallback = this.storageService.fetch('user');
      this.http.get<User>(environment.apiEndpoint + '/users/show.json?token=' + storageData.session_token + '&screen_name=' + userId)
        .subscribe(resp => {
          if (resp.profile_image_url === '') {
            resp.profile_image_url = '/assets/img/logo.png';
          }
          obs.next(resp);
        }, (err: HttpErrorResponse) => {
          obs.error(err);
        });
    });
  }

  login(userId: string, password: string): Observable<LoginCallback> {
    const claim = { id: userId, password: password };
    return new Observable<LoginCallback>(obs => {
      this.http.post<LoginCallback>(environment.apiEndpoint + '/account/login.json', claim)
        .subscribe((resp: LoginCallback) => {
          if (resp.id === undefined && resp.session_token === undefined) {
            obs.error();
            return;
          }

          this.storageService.store('user', resp);
          obs.next(resp);
        }, (err: HttpErrorResponse) => {
          obs.error(err);
        });
    });
  }

  signup(userId: string, email: string, password: string): Observable<MessageResponse> {
    const claim = { id: userId, email: email, password: password };
    return new Observable<MessageResponse>(obs => {
      this.http.post<MessageResponse>(environment.apiEndpoint + '/account/create.json', claim)
        .subscribe((resp: MessageResponse) => {
          obs.next(resp);
        }, (err: HttpErrorResponse) => {
          obs.error(err);
        });
    });
  }

  searchUser(query): Observable<User[]> {
    return new Observable<User[]>(obs => {
      const storageData: LoginCallback = this.storageService.fetch('user');
      const url = environment.apiEndpoint + '/search/user.json?token=' + storageData.session_token + '&query=' + query;
      this.http.get<User[]>(url)
      .subscribe((resp: User[]) => {
          if (resp.length !== 0) {
            resp = resp.map(user => {
              if (user.profile_image_url === '') {
                user.profile_image_url = '/assets/img/logo.png';
                return user;
              }
              return user;
            });
          }
          obs.next(resp);
        }, (err: HttpErrorResponse) => {
          obs.error(err);
        });
    });
  }

  updateProfile(newProfile: EditableProfile): Observable<User> {
    return new Observable<User>(obs => {
      const storageData: LoginCallback = this.storageService.fetch('user');
      const header = new HttpHeaders().set('Authorization', 'Bearer ' + storageData.session_token);
      this.http.post<User>(environment.apiEndpoint + '/account/settings.json', newProfile, {headers: header})
        .subscribe((resp: User) => {
          obs.next(resp);
        }, (err: HttpErrorResponse) => {
          obs.error(err);
        });
    });
  }

  updateProfileImage(image: string): Observable<User> {
    const body = {
      image: image
    };
    return new Observable<User>(obs => {
      const storageData: LoginCallback = this.storageService.fetch('user');
      const header = new HttpHeaders().set('Authorization', 'Bearer ' + storageData.session_token);
      this.http.post<User>(environment.apiEndpoint + '/account/update_profile_image.json', body, {headers: header})
        .subscribe((resp: User) => {
          obs.next(resp);
        }, (err: HttpErrorResponse) => {
          obs.error(err);
        });
    });
  }

  logout() {
    this.storageService.delete('user');
  }

}
