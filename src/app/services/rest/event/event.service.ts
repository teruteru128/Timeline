import { Injectable } from '@angular/core';
import { APIEvent, LoginCallback } from '../models';
import { Observable } from 'rxjs/Observable';
import { StorageService } from '../../storage/storage.service';
import { HttpHeaders, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable()
export class EventService {

  constructor(
    private storageService: StorageService,
    private http: HttpClient
  ) { }

  getEvents(): Observable<APIEvent[]> {
    return new Observable(observer => {
      const storageData: LoginCallback = this.storageService.fetch('user');
      const header = new HttpHeaders().set('Authorization', 'Bearer ' + storageData.session_token);

      this.http.get(environment.apiEndpoint + '/event/list.json', {headers: header})
      .subscribe((resp: APIEvent[]) => {
        observer.next(resp);
      }, (err: HttpErrorResponse) => {
        observer.error(err.error);
      });
    });
  }
}
