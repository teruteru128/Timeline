import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Post } from '../models';
import { APP_CONFIG, AppConfig } from '../../../app.config';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { StorageService } from '../../storage/storage.service';
import { SocketIOService } from '../../socketio/socket-io.service';

@Injectable()
export class PostService {

  private authenticated = false;

  constructor(
    private http: HttpClient,
    private sio: SocketIOService,
    @Inject(APP_CONFIG) private config: AppConfig,
    private storageService: StorageService) {}

  listen(): Observable<any> {
    return new Observable(observer => {
      this.sio.connect(this.config.apiEndpoint);
      const token = this.storageService.fetch('user')['sessionToken'];
      const id = this.storageService.fetch('user')['id'];
      this.sio.emit('authenticate', token);
      this.sio.on('authenticated').subscribe(() => {
        console.log('Streaming API connected');
        this.sio.on(id).subscribe((dat: string) => observer.next(JSON.parse(dat)));
      });
      this.sio.on('unauthorized').subscribe((err) => {
        console.error('Socket unauthorized: ' + JSON.stringify(err));
        if (err === 'invalid jwt token' || err === 'not found') {
          // 利用資格がないため認可情報を消去
          this.storageService.clear('user');
        }
        observer.error(err);
      });
    });
  }

  post(text: string): Observable<any> {
    return new Observable(obs => {
      const token = this.storageService.fetch('user')['sessionToken'];
      const header = new HttpHeaders().set('Authorization', 'Bearer ' + token);
      const body = {'text': text};
      this.http.post(this.config.apiEndpoint + '/v1/posts', body, {headers: header})
      .subscribe(resp => {
        obs.next(resp);
      }, (err: HttpErrorResponse) => {
        obs.error(err.error);
      });
    });
  }
}
