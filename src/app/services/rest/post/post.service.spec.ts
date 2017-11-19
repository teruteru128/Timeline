import { TestBed, inject } from '@angular/core/testing';

import { PostService } from './post.service';
import { Server } from 'mock-socket';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SocketIOService } from '../../socketio/socket-io.service';
import { APP_CONFIG, APP_TEST_DI_CONFIG } from '../../../app.config';
import { StorageService } from '../../storage/storage.service';

describe('PostService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        { provide: APP_CONFIG, useValue: APP_TEST_DI_CONFIG },
        PostService,
        SocketIOService,
        StorageService
      ]
    });
  });

  it('should be created', inject([PostService], (service: PostService) => {
    expect(service).toBeTruthy();
  }));
  describe('Socket.io Listen', () => {
    it('listen',
      inject([PostService, HttpTestingController],
        (service: PostService, httpMock: HttpTestingController) => {
          const mockServer = new Server('http://localhost:3000');
          mockServer.on('connection', server => {
            mockServer.on('authenticate', token => {
              expect(token).toBeDefined();
              token.emit('authenticated');
            });
            mockServer.on('0', channel => {
              expect(channel).toBeDefined();
              const sample = { 'message': 'sample' };
              channel.emit(JSON.stringify(sample));
            });
          });

          service.listen().subscribe(resp => {
            const sample = { 'message': 'sample' };
            expect(resp).toBe(JSON.stringify(sample));
          });
        }));
  });
  describe('Posting', () => {
    it('post',
      inject([PostService, HttpTestingController],
        (service: PostService, httpMock: HttpTestingController) => {
          const okResp = {'message': 'posted'};
          const mockUser = 'kitten';
          service.post('HELLO')
            .subscribe(postResp => {
              expect(postResp).toBe(okResp);
            }, err => {
              expect(err).toBeUndefined();
            });

          const req = httpMock.expectOne('/v1/posts');

          req.flush(okResp);

          httpMock.verify();
      }));
  });

});

class StorageServiceMock extends StorageService {
  dummyResp = {
    'id': '0',
    'sessionToken': 'TOKEN'
  };

  fetch(user: string): Object[] {
    const dummyJson = JSON.stringify(this.dummyResp);
    return JSON.parse(dummyJson) || [];
  }
}
