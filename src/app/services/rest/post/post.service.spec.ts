import { TestBed, inject } from '@angular/core/testing';

import { PostService } from './post.service';
import { Server } from 'mock-socket';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SocketIOService } from '../../socketio/socket-io.service';
import { APP_CONFIG, APP_DI_CONFIG } from '../../../app.config';
import { StorageService } from '../../storage/storage.service';

describe('PostService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        {provide: APP_CONFIG, useValue: APP_DI_CONFIG},
        PostService,
        SocketIOService,
        StorageService
      ]
    });
  });

  it('should be created', inject([PostService], (service: PostService) => {
    expect(service).toBeTruthy();
    /*
    const mockServer = new Server('ws://localhost:8080');
    mockServer.on('connection', server => {
      mockServer.send('test message 1');
      mockServer.send('test message 2');
    });
    */
  }));
});
