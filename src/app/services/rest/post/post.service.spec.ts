import { TestBed, inject } from '@angular/core/testing';

import { PostService } from './post.service';
import { Server } from 'mock-socket';

describe('PostService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostService]
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
