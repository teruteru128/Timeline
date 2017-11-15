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

  private url(): string {
    return this.config.apiEndpoint + '/v1/posts/sample_stream';
  }

  constructor(
    private http: HttpClient,
    private sio: SocketIOService,
    @Inject(APP_CONFIG) private config: AppConfig,
    private storageService: StorageService) {}

  listenSampleStream(): Observable<Post> {
    return new Observable(observer => {
      this.sio.connect(this.url());
      const token = this.storageService.fetch('user')['token'];
      this.sio.emit('authenticate', token);
      this.sio.on('authenticated').subscribe(() => {
        this.sio.on('connect').subscribe(evt => console.log('Streaming API connected'));
        this.sio.on('sample').subscribe((evt: Post) => observer.next(evt));
      });
      this.sio.on('unauthorized').subscribe((err) => {
        console.error('Socket unauthorized: ' + JSON.stringify(err['data']));
        throw new Error(err['data']['type']);
      });
    });
  }

  getPosts() {

  }

}
