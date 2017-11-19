import { Injectable, Inject } from '@angular/core';
import * as io from 'socket.io-client';
import { APP_CONFIG, AppConfig } from '../../app.config';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SocketIOService {

  private socket;

  constructor(@Inject(APP_CONFIG) private config: AppConfig) { }

  connect(url: string) {
    this.socket = io(url);
  }

  emit(event: string, data?) {
    this.socket.emit(event, data);
  }

  on(event: string) {
    const observable = new Observable(observer => {
      this.socket.on(event, (data) => {
        observer.next(data);
      });

      return () => { this.socket.disconnect(); };
    });
    return observable;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
