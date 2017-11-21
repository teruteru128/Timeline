import { TestBed, inject } from '@angular/core/testing';

import { PostService } from './post.service';
import { Server } from 'mock-socket';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SocketIOService } from '../../socketio/socket-io.service';
import { APP_CONFIG, APP_TEST_DI_CONFIG } from '../../../app.config';
import { StorageService } from '../../storage/storage.service';
import { User, Post, LoginCallback } from '../models';

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
        { provide: StorageService, useClass: StorageServiceMock }
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
            const user: User = {
              id: '1',
              userId: 'testuser',
              displayName: 'Test User',
              postsCount: 0,
              location: '',
              following: [],
              followers: [],
              websiteUrl: '',
              avatarUrl: '/assets/img/logo.png',
              official: false
            };
            const post: Post = {
              userId: 'Test User',
              postId: '1',
              text: 'Text',
              createdDate: new Date('2017/01/01 00:00:00'),
              user: user
            };
            expect(resp).toBe(post);
          });
        }));
  });
  describe('Posting', () => {
    it('post',
      inject([PostService, HttpTestingController],
        (service: PostService, httpMock: HttpTestingController) => {
          const okResp = { 'message': 'posted' };
          const mockUser = 'kitten';
          service.post('HELLO')
            .subscribe(postResp => {
              expect(postResp).toBe(okResp);
            }, err => {
              expect(err).toBeUndefined();
            });

          const req = httpMock.expectOne('/1.0/posts');

          req.flush(okResp);

          httpMock.verify();
        }));
  });

});

class StorageServiceMock extends StorageService {
  dummyResp: LoginCallback = {
    id: '0',
    userId: '0',
    createdDate: new Date(),
    updatedDate: new Date(),
    sessionToken: 'TOKEN'
  };

  fetch(user: string): any {
    return this.dummyResp;
  }
}
